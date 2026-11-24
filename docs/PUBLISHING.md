# APK verification and draft releases

[Download catalog](DOWNLOADS.md) · [Release governance](RELEASE-PROCESS.md)

UNVOR's distribution repository has no independently verified product releases yet. Do not re-sign an existing APK merely to rename it. Do not publish a binary or source until distribution rights, notices and applicable licenses have been reviewed.

## Local verification

Use a locally available signed APK, Android SDK build-tools `apksigner`, and independently established expected file and signing-certificate SHA-256 values. Do not establish trust by copying a certificate fingerprint from an untrusted APK.

```sh
python3 tools/verify_apk.py --apk /path/to/signed.apk \
  --apksigner /path/to/android-sdk/build-tools/36.0.0/apksigner \
  --sha256 EXPECTED_FILE_SHA256 \
  --certificate-sha256 TRUSTED_CERTIFICATE_SHA256
```

For Chat Pilot 366 the upstream metadata digest is `e6349776a8a2c4500c6ef600e3aa214a970ebf3d2eee48aee27a26d370907520`. A trusted signing certificate fingerprint has not yet been established here. The Launcher requires the actual signed APK, exact source revision and trusted reference certificate. An unsigned installer package is not a release.

The helper verifies file integrity and one signer; it does not determine whether the application is safe, correctly licensed or compatible. Record the results, verify package identity and version with Android build tools, and complete applicable product tests.

## Draft publication

Only after the above review, use GitHub CLI on the maintainer's Mac to create a **draft** prerelease, including release-specific notes and the verified binary. Example for Chat Pilot 366 (replace the two local file paths with verified files):

```sh
gh release create chat-pilot-366 /path/to/UNVOR-Chat-Pilota-366.apk \
  --repo Jabo86/UNVOR --draft --prerelease \
  --title "UNVOR Chat — Pilot 366" --notes-file /path/to/release-notes.md
```

Document that the tag in this documentation hub is not the application source revision; link to the exact upstream application commit. Include license notices, digest, signing fingerprint, test evidence, limitations, and upgrade guidance. Inspect the uploaded asset and approve the draft manually. Update the catalog only after verifying actual publication.

Do not publish a Launcher release until its own signed artifact and source evidence are available. The script does not create or modify any GitHub release.
