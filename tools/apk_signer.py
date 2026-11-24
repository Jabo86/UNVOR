"""Parse verified Android apksigner output, including SDK 37 format."""
import re

def single_signer_sha256(output):
    counts = re.findall(r"^Number of signers:\s*(\d+)\s*$", output, re.M)
    if counts != ["1"]:
        raise ValueError("expected exactly one reported APK signer")
    rows = re.findall(
        r"^(?:Signer #\d+|V\d+(?:\.\d+)* Signer(?: #\d+)?:?)\s+certificate SHA-256 digest:\s*([0-9a-fA-F:]+)\s*$",
        output, re.M,
    )
    fingerprints = {row.replace(":", "").lower() for row in rows}
    if not rows or len(fingerprints) != 1 or not all(re.fullmatch(r"[0-9a-f]{64}", x) for x in fingerprints):
        raise ValueError("missing, invalid or conflicting signer certificate SHA-256")
    return fingerprints.pop()
