"""Check documentation references, assets and catalog consistency. No network calls."""
import json
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
errors = []
for path in sorted(ROOT.rglob("*.md")):
    if ".git" in path.parts:
        continue
    raw = path.read_text(encoding="utf-8")
    refs = re.findall(r'\]\(([^\s)]+)\)', raw)
    refs += re.findall(r'(?:src|href)="([^"]+)"', raw)
    for ref in refs:
        parsed = urlsplit(ref)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        target = (path.parent / unquote(parsed.path)).resolve()
        if not target.is_relative_to(ROOT) or not target.exists():
            errors.append(f"{path.relative_to(ROOT)}: missing or external local reference {ref}")

catalog = json.loads((ROOT / "releases/catalog.json").read_text(encoding="utf-8"))
if catalog.get("schema_version") != 1 or catalog.get("project") != "UNVOR":
    errors.append("Unexpected catalog schema or project")
components = catalog.get("components", [])
if sorted(x.get("id", "") for x in components) != ["chat", "launcher", "network", "web"]:
    errors.append("Unexpected component inventory")
for component in components:
    asset = component.get("asset")
    if asset:
        if not re.fullmatch(r"[0-9a-f]{64}", asset.get("sha256", "")):
            errors.append(f"{component['id']}: invalid digest format")
        if asset.get("signature_verified") and not re.fullmatch(r"[0-9a-f]{64}", asset.get("certificate_sha256") or ""):
            errors.append(f"{component['id']}: missing verified certificate fingerprint")
for name in ("banner.png", "launcher-112.png", "logo-unvor.png"):
    p = ROOT / "assets" / name
    if not p.is_file() or p.read_bytes()[:8] != b"\x89PNG\r\n\x1a\n":
        errors.append(f"Missing or invalid PNG: {name}")
if errors:
    raise SystemExit("\n".join(errors))
print("PASS: local documentation references, PNG headers and catalog structure")
print("External links, APK signatures, security and runtime behavior are not verified.")
