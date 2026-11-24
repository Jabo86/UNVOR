# Development & release engineering

[Home](../README.md)

The documentation hub does not contain application source or private build configuration. Follow the canonical development resources:

- [Chat source and build workflows](https://github.com/Jabo86/ultron-android/tree/main)
- [Launcher source and dependency notes](https://github.com/Jabo86/ultron-android/tree/fix/unvor-launcher/unvor-launcher)
- [Federation development](https://github.com/Jabo86/ultron-android/tree/feature/global-node-federation)

The existing Chat build workflow declares Node 22, Java 21, Android API 36, build-tools 36.0.0 and NDK 27.1.12297006. Consult the specific source commit for authoritative requirements. Launcher source documents offline voice-model and native dependency requirements; some external binaries are not duplicated in its source branch.

## Release gates

1. Review code, dependency terms and notices; record the exact source revision.
2. Build and run automated checks on a clean environment.
3. Test on supported devices, including upgrade and data preservation.
4. Verify the final APK package, signature and trusted certificate fingerprint.
5. Calculate the final artifact digest and publish release notes with limitations.
6. Review reproducibility separately; a successful build is not proof of reproducibility.
7. Publish in the intended channel and verify the download catalog.

Signing secrets remain in controlled build environments. Never add private keys, credentials, personal data or production configuration to public repositories.
