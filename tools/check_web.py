"""Verify the static portal's local assets and translation coverage."""
import json
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
errors = []

class Portal(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.refs = []
        self.keys = set()

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if attrs.get("id"):
            if attrs["id"] in self.ids:
                errors.append("duplicate id: " + attrs["id"])
            self.ids.add(attrs["id"])
        for key in ("data-i18n", "data-alt-key", "data-aria-label-key"):
            if key in attrs:
                self.keys.add(attrs[key])
        for key in ("href", "src"):
            value = attrs.get(key)
            if value:
                self.refs.append(value)

portal = Portal()
portal.feed((ROOT / "index.html").read_text(encoding="utf-8"))
for ref in portal.refs:
    parsed = urlsplit(ref)
    if parsed.scheme or parsed.netloc:
        continue
    if parsed.path:
        path = (ROOT / unquote(parsed.path)).resolve()
        if not path.is_relative_to(ROOT) or not path.exists():
            errors.append("missing local reference: " + ref)
    elif parsed.fragment and parsed.fragment not in portal.ids:
        errors.append("missing anchor: " + ref)

script = (ROOT / "web/hud.js").read_text(encoding="utf-8")
match = re.search(r"const translations=(\{.*?\});", script, re.S)
if not match:
    errors.append("missing translation object")
else:
    translations = json.loads(match.group(1))
    for key in sorted(portal.keys):
        values = translations.get(key)
        if not isinstance(values, list) or len(values) != 3 or not all(isinstance(v, str) and v.strip() for v in values):
            errors.append("incomplete translation: " + key)

if errors:
    raise SystemExit("\n".join(errors))
print("PASS: static HTML references and three-language translation coverage")
print("Browser runtime and remote links require separate verification.")
