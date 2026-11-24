"""Verify a local APK against independently trusted digests; never sign or upload."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess

def digest(value):
    normalized = value.replace(":", "").strip().lower()
    if not re.fullmatch(r"[0-9a-f]{64}", normalized):
        raise argparse.ArgumentTypeError("expected a 64-character SHA-256 digest")
    return normalized

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apk", type=Path, required=True)
    parser.add_argument("--apksigner", type=Path, required=True)
    parser.add_argument("--sha256", type=digest, required=True)
    parser.add_argument("--certificate-sha256", type=digest, required=True)
    args = parser.parse_args()
    if not args.apk.is_file() or not args.apksigner.is_file():
        parser.error("APK and apksigner must exist")
    with args.apk.open("rb") as stream:
        h = hashlib.sha256()
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(chunk)
    if h.hexdigest() != args.sha256:
        raise SystemExit("FAIL: APK SHA-256 mismatch")
    result = subprocess.run(
        [str(args.apksigner.resolve()), "verify", "--verbose", "--print-certs", str(args.apk.resolve())],
        capture_output=True, text=True, timeout=180, check=False
    )
    if result.returncode:
        raise SystemExit("FAIL: APK signature verification failed\n" + result.stderr)
    signers = re.findall(r"Signer #\d+ certificate SHA-256 digest:\s*([0-9a-fA-F:]+)", result.stdout)
    if len(signers) != 1 or digest(signers[0]) != args.certificate_sha256:
        raise SystemExit("FAIL: unexpected signer count or certificate fingerprint")
    print(json.dumps({"file":args.apk.name,"sha256":h.hexdigest(),"certificate_sha256":args.certificate_sha256,"signature_verified":True,"limitations":"No source, license, compatibility or security assurance."}, indent=2))

if __name__ == "__main__":
    main()
