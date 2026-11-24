"""Collect local APK integrity and signer evidence; never install, sign or publish."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

try:
    from .apk_signer import single_signer_sha256
except ImportError:
    from apk_signer import single_signer_sha256

ROOT = Path(__file__).resolve().parents[1]

def run(args):
    return subprocess.run(args, check=True, capture_output=True, text=True, timeout=300).stdout

def sdk_tool(explicit):
    if explicit:
        path = explicit.expanduser().resolve()
        if not path.is_file() or not os.access(path, os.X_OK):
            raise SystemExit("Invalid apksigner executable")
        return path
    roots = [Path.home() / "Library/Android/sdk", Path.home() / "Android/Sdk"]
    for key in ("ANDROID_HOME", "ANDROID_SDK_ROOT"):
        if os.environ.get(key):
            roots.append(Path(os.environ[key]).expanduser())
    candidates = [p for root in roots for p in (root / "build-tools").glob("*/apksigner") if p.is_file() and os.access(p, os.X_OK)]
    if not candidates:
        raise SystemExit("apksigner not found: supply --apksigner with the Android SDK build-tools executable")
    return max(candidates, key=lambda p: tuple(int(x) for x in re.findall(r"\d+", p.parent.name)))

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("component", choices=("chat", "launcher"))
    parser.add_argument("--apk", type=Path)
    parser.add_argument("--apksigner", type=Path)
    args = parser.parse_args()
    if args.component == "launcher" and args.apk is None:
        parser.error("Launcher requires an explicit --apk path")
    if args.component == "chat" and args.apk is not None:
        parser.error("Chat inspection downloads the exact catalogued pilot")
    signer = sdk_tool(args.apksigner)
    catalog = json.loads((ROOT / "releases/catalog.json").read_text(encoding="utf-8"))
    component = next(x for x in catalog["components"] if x["id"] == args.component)
    output = Path(tempfile.mkdtemp(prefix="UNVOR-release-review-", dir=str(Path.home())))
    if args.component == "chat":
        if not shutil.which("gh"):
            raise SystemExit("GitHub CLI (gh) is required for downloading the existing release")
        asset = component["asset"]
        # Fixed upstream release, independently compared with the catalog digest.
        run(["gh", "release", "download", "ratchet-pilot-66", "--repo", "Jabo86/ultron-android", "--pattern", asset["name"], "--dir", str(output)])
        apk = output / asset["name"]
    else:
        apk = args.apk.expanduser().resolve()
        if not apk.is_file() or apk.suffix.lower() != ".apk":
            raise SystemExit("Launcher APK not found")
    h = hashlib.sha256()
    with apk.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(block)
    sha256 = h.hexdigest()
    expected = component["asset"]["sha256"] if args.component == "chat" else None
    if expected and sha256 != expected:
        raise SystemExit("FAIL: artifact digest differs from catalog")
    details = run([str(signer), "verify", "--verbose", "--print-certs", str(apk)])
    try:
        fingerprint = single_signer_sha256(details)
    except ValueError as exc:
        raise SystemExit("FAIL: " + str(exc)) from exc
    report = {
        "component": args.component,
        "file": apk.name,
        "sha256": sha256,
        "matches_catalog": sha256 == expected if expected else None,
        "apk_signature_valid": True,
        "observed_certificate_sha256": fingerprint,
        "trusted_certificate_verified": False,
        "publication_approved": False,
        "limitations": "Identity, trusted signer, source/version, licensing and device tests remain separate checks."
    }
    (output / "evidence.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))
    print("Local evidence:", output / "evidence.json")

if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as e:
        raise SystemExit("Verification/download failed: " + (e.stderr or "").strip()) from e
