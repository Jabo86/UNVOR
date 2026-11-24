# Release governance

[Home](../README.md) · [Download guide](DOWNLOADS.md)

## Channels

- **Pilot:** experimental builds for test accounts or controlled validation; clearly marked prerelease.
- **Stable:** only after approved release criteria and documented results.
- **Development:** source and design previews, not a distributable production artifact.

## Maintainer checklist

- [ ] Confirm distribution rights and included licenses/notices.
- [ ] Identify source repository, exact commit, version and supported Android versions.
- [ ] Build in a documented environment; preserve existing signing identity for updates.
- [ ] Verify APK signature and compare certificate SHA-256 to a trusted publisher reference.
- [ ] Calculate SHA-256 from the final artifact and retain build provenance.
- [ ] Review test matrix and known limitations; record evidence.
- [ ] Prepare changelog, compatibility notes and upgrade/rollback limitations.
- [ ] Obtain maintainer approval before publication.
- [ ] Publish to correct channel and verify uploaded artifact.
- [ ] Update release catalog and documentation.

No automation should sign or publish a product release merely because documentation changes. Never share private keys or credentials. For a release with incomplete verification, leave it unpublished or mark it appropriately as experimental; do not claim it is stable.

## Release notes template

Component / version / channel; exact source commit; supported devices; changes; known issues; test evidence; signing-certificate fingerprint; SHA-256; licensing and attribution; upgrade guidance.
