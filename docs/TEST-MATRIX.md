# UNVOR verification matrix

[Home](../README.md)

This matrix defines tests to run; it is not a test-results report. All tests remain unverified here unless release-specific evidence is attached. Use only authorized test devices, accounts and nodes.

| ID | Component | Acceptance test |
| --- | --- | --- |
| L01 | Launcher | Install and upgrade using matching signing identity; verify existing local data |
| L02 | Launcher | Verify home, app drawer, shortcuts, back navigation and settings |
| L03 | Launcher | Verify local agenda, alarms, voice and permitted device integrations |
| L04 | Launcher | Test screen sizes, orientation where supported, accessibility and permission denial |
| C01 | Chat | Two test accounts: verify reciprocal-contact behavior including rejection |
| C02 | Chat | Measure message delivery in foreground, background and temporary disconnection |
| C03 | Chat | Verify multiple attachment selection, explicit confirmation, cancellation and delivery |
| C04 | Chat | Verify keyboard stability, ordering, retry and duplicate handling |
| C05 | Chat | Verify calls, groups and polls only where the release implements them |
| C06 | Chat | Review key lifecycle, authentication and protocol failure cases with qualified reviewers |
| N01 | Network | Verify authenticated peers and authorized node configuration |
| N02 | Network | Verify failover, reconnect and recovery with controlled test nodes |
| N03 | Network | Inspect temporary storage, logging and retention against the documented policy |
| N04 | Network | Document required services and observed metadata at each boundary |
| R01 | Release | Verify exact source revision, artifact SHA-256 and approved certificate |
| R02 | Release | Verify component license and third-party notices, release notes and channel |
| R03 | Release | Test installation and upgrade on supported devices; record known limitations |
| W01 | Web | Verify languages, navigation, privacy choices, accessibility and release links |

For every execution record ID, version, source commit, environment, tester role, date, expected behavior, actual behavior, pass/fail/blocked, and sanitized evidence. A failing or blocked test is not a pass.
