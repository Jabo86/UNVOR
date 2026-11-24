# UNVOR release readiness

[Home](../README.md) · [Publishing](PUBLISHING.md) · [Catalog](../releases/catalog.json)

## Current publication blockers

| Artifact | Available evidence | Required evidence |
| --- | --- | --- |
| Chat pilot 366 | Existing public upstream asset, SHA-256 in GitHub metadata and source target | Actual binary hash and signature, independently trusted signer, verified package/version, release-specific tests, rights and notices |
| Launcher | Source branch and supplied UI preview | Exact signed local APK, build source and version, digest and trusted signer, upgrade and device tests, rights and notices |
| Network | Federation development branch | Approved source and dependency licenses, design and integration evidence, reviewed deployment guide |
| Web | GitHub Pages deployment and static checks | Browser regression tests; license for original documentation and visuals |

## Migration

Keep existing package IDs and signing identity unchanged until a compatible migration has been designed and tested. Retain historical copyright and required notices. Avoid copying private build configuration, signing material, credentials or device data to the public hub. A new repository does not replace existing software licenses.

## Community

Use [Discussions](https://github.com/Jabo86/UNVOR/discussions) for ideas and questions and [Issues](https://github.com/Jabo86/UNVOR/issues) for ordinary bugs. Follow [private reporting guidance](../SECURITY.md) for vulnerabilities.
