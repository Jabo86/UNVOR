# Privacy and security

[Home](../README.md) · [Report a vulnerability](../SECURITY.md)

Privacy by design means limiting data collection and documenting actual data flows, not promising perfect secrecy. Android permissions, app sandboxing and platform hardening remain the responsibility of the operating system.

| Area | Design goal | Evidence required |
| --- | --- | --- |
| Messaging | Confidentiality and authenticated communication | Protocol review, key lifecycle and end-to-end tests |
| Relays | Data minimization | Inspect runtime storage, logs, backups and routing metadata |
| Device | Local data protection | Test permissions, storage, backup and recovery behavior |
| Dependencies | Reduced mandatory Google-service reliance | Review manifests, dependency graph and runtime network behavior |
| Releases | Authentic distribution | Trusted signing certificate, checksum and source commit |
| Web | No unnecessary tracking | Inspect requests, storage behavior and deployed configuration |

No independent audit, absolute anonymity, zero metadata retention or invulnerability is asserted. A compromised device, malicious participant, network observer or flawed dependency can affect security. Report weaknesses privately, use authorized test environments and avoid exposing real user data.
