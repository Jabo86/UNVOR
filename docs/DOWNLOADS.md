# Download & verification

[Home](../README.md)

## UNVOR Chat — Pilot 366

- Channel: experimental prerelease, separate test accounts.
- Published: 24 November 2026, according to GitHub release metadata.
- [Release page](https://github.com/Jabo86/ultron-android/releases/tag/ratchet-pilot-66)
- [APK asset](https://github.com/Jabo86/ultron-android/releases/download/ratchet-pilot-66/UNVOR-Chat-Pilota-366.apk)
- Release target: `964bf363818f045ce8406d795adbf6771ae1491f` (GitHub metadata; not an independently reproduced build).

GitHub reports the following SHA-256 digest for the APK:

```text
e6349776a8a2c4500c6ef600e3aa214a970ebf3d2eee48aee27a26d370907520
```

Compute the digest of a downloaded file on macOS using `shasum -a 256 FILE.apk` or on Linux using `sha256sum FILE.apk`. Compare the full value. The digest was not independently computed from the binary for this documentation. A hash match is not proof of application security or publisher identity; verify the APK signing certificate against a trusted reference as well. A trusted reference fingerprint has not yet been established here.

Do not uninstall an existing app merely to bypass a signature mismatch. This may cause loss of local data. Confirm upgrade compatibility and recovery options first.

## UNVOR Launcher

[Source in development](https://github.com/Jabo86/ultron-android/tree/fix/unvor-launcher/unvor-launcher). A separately signed public APK and trusted signing fingerprint have not yet been verified. Do not use unofficial mirrors as substitutes.

## Release policy

Stable releases should identify the precise source commit, change summary, known limitations, supported devices, test results, SHA-256 and signing fingerprint. Experimental builds must be distinguished from stable updates.

## UNVOR distribution hub

The [new repository release page](https://github.com/Jabo86/UNVOR/releases) is reserved for future verified UNVOR publications. At the time of this snapshot, it has no releases. The [machine-readable catalog](../releases/catalog.json) identifies the currently published pilot in its existing upstream repository. It does not mirror binaries, certify signatures or confer redistribution rights.

See the [release process](RELEASE-PROCESS.md) and [status dashboard](STATUS.md) before promoting any build.

## Maintainer publication

Use the [APK verification and draft-release guide](PUBLISHING.md). The verification helper is local and never uploads or signs an APK. Distribution authorization and release-specific evidence remain required.
