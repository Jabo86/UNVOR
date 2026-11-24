# UNVOR — Engineering status

[Home](../README.md) · [Release catalog](../releases/catalog.json)

Snapshot: 24 November 2026. This is a manually maintained evidence register, not live telemetry.

| Area | Observed evidence | Outstanding gate |
| --- | --- | --- |
| Documentation hub | Public repository, multilingual overviews, supplied brand assets | Maintainer review of technical claims |
| Chat | Pilot 366 exists upstream; [maintainer-reported matching SHA-256, valid APK signature and 14/14 matching certificate files](../releases/evidence/chat-pilot-366.json); [parser CI passed](https://github.com/Jabo86/UNVOR/actions/runs/45506317311) | Independently trusted certificate reference, device tests, release rights |
| Launcher | Source branch and 112 interface preview | Exact build provenance, signed APK, physical-device upgrade tests |
| Network | Federation development branch | Peer identity, failure recovery, deployment and retention tests |
| Web | [Published portal](https://jabo86.github.io/UNVOR/) · [Successful Pages deployment](https://github.com/Jabo86/UNVOR/actions/runs/45504438234) | Regression tests for subsequent updates |
| Open source | Existing license is source-available | Ownership, third-party obligations and approved licenses |
| Security assurance | Security documentation and acceptance criteria | Release-specific test evidence and independent review |

No stable product release, security certification, real-time network availability or universal compatibility is inferred from this register.

## Evidence policy

Record the component, exact commit, artifact digest, environment, date, test procedure, result and remaining limitations. A planned feature, design preview, passing static check and physical-device test are distinct evidence categories.
