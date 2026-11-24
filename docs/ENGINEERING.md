# UNVOR engineering standards

[Home](../README.md) · [Test matrix](TEST-MATRIX.md)

## Product boundaries

UNVOR Launcher owns the Android home experience, local tools and application navigation. UNVOR Chat owns its communication and identity features. UNVOR Network owns the intended relay and federation behavior. Android and GrapheneOS remain responsible for OS-level sandboxing, permissions and platform security. Avoid duplicate protections and unnecessary privileges.

## Engineering controls

- **Identity and updates:** preserve package and signing compatibility until an explicit migration is reviewed. Never publish keys or production credentials.
- **Dependency management:** use locked dependencies where supported; record versions, origins, hashes and license obligations. Review exceptions.
- **Data minimization:** specify purpose, storage location, retention, permissions and failure behavior for each data flow. Validate logging and backup behavior.
- **Network independence:** document every required service and test deployments without optional centralized dependencies; distinguish intended behavior from measured results.
- **Quality:** test normal behavior, failures, retries, upgrade and recovery in an authorized environment. Record reproducible evidence.
- **Publication:** distinguish experimental and stable releases, identify exact source and artifact, and review legal rights before redistribution.
- **Transparency:** disclose limitations and unresolved findings. Do not equate public source, cryptographic primitives or a passing build with a security guarantee.

Changes affecting trust boundaries should include an [architecture decision](decisions/README.md). Release gates are defined in [release process](RELEASE-PROCESS.md).
