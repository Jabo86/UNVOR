# UNVOR — factual publication policy

Effective 25 November 2026, requested by the project maintainer.

The public portal describes only documented components and evidence-backed features. Distinguish (1) code exists, (2) a test was performed, (3) a service is deployed and usable. No simulated activity, invented user counts, unsupported functions, or security/availability guarantees. Roadmaps may be recorded separately as planned work, never as shipped features. Recheck the exact source revision and distribution metadata before publishing a new claim. Keep prior evidence and distinguish maintainer-reported checks from independent checks. The public game prototype is retired from the current site; prior commits remain in history.

## Source review (targeted, not exhaustive)

| Component | Exact source | Observations and limits |
| --- | --- | --- |
| Chat | [Pilot 366 source target](https://github.com/Jabo86/ultron-android/tree/964bf363818f045ce8406d795adbf6771ae1491f) | Repository tree enumerated (427 blobs). Targeted review of messaging, crypto, ratchet, MLS, contacts, poll, notifications, profile and call modules. Direct video explicitly disabled in CallScreen; auditEntries has older inconsistent audio/video and QR descriptions. Gateway enforcement and device behavior not independently tested. |
| Launcher | [Launcher revision](https://github.com/Jabo86/ultron-android/tree/561f3d8c6445efa13a00a18d5dc2fad747374378/unvor-launcher) | Manifest, MainActivity, AgendaStore, OfflineVoice and source instructions inspected. Home intent routing, encrypted local agenda, local Vosk. Some actions invoke Android screens; no independently verified public APK. |
| Network | [Relay lab revision](https://github.com/Jabo86/ultron-android/tree/e5646e0c304081e02a0e136620e0d27b56523e84/relay-node-lab) | README and server implementation inspected. Signed forwarding lab with configured peers and transient replay cache. Not a Chat transport or deployed global service. |
| Distribution | [Evidence](../releases/evidence/chat-pilot-366.json) | Maintainer-reported hash, signature, certificate continuity and manifest. GitHub draft asset digest checked; no final publication or independent device/security review. |

This review corrects public descriptions. It does not certify every source file, protocol path, dependency, backend, APK or live node. No application source, credentials, license or signed binary is changed. Retain original notices and terms. Further reviews require complete build inputs, gateway sources, configurations, controlled device and infrastructure tests.

## Specific findings

- [CallScreen.js](https://github.com/Jabo86/ultron-android/blob/964bf363818f045ce8406d795adbf6771ae1491f/src/screens/CallScreen.js): individual calls are voice-only; do not advertise video calling.
- [hostedRatchetChat.js](https://github.com/Jabo86/ultron-android/blob/964bf363818f045ce8406d795adbf6771ae1491f/src/lib/hostedRatchetChat.js): the direct send path checks mutual contacts and signed keys; a pinned fingerprint is checked if present. Do not claim mandatory out-of-band QR verification on all paths.
- [ChatScreen.js](https://github.com/Jabo86/ultron-android/blob/964bf363818f045ce8406d795adbf6771ae1491f/src/screens/ChatScreen.js): direct poll components and document multi-selection are wired into the UI. End-to-end confirmation/delivery remains unverified.
- [AgendaStore.java](https://github.com/Jabo86/ultron-android/blob/561f3d8c6445efa13a00a18d5dc2fad747374378/unvor-launcher/UNVORLauncher/app/src/main/java/com/ultron/launcher/AgendaStore.java): private AES-GCM file, Android Keystore and alarm scheduling checks.
- [OfflineVoice.java](https://github.com/Jabo86/ultron-android/blob/561f3d8c6445efa13a00a18d5dc2fad747374378/unvor-launcher/UNVORLauncher/app/src/main/java/com/ultron/launcher/OfflineVoice.java): local Vosk recognition with packaged dependencies.
- [Relay server](https://github.com/Jabo86/ultron-android/blob/e5646e0c304081e02a0e136620e0d27b56523e84/relay-node-lab/server.mjs): node-to-node probe, not client delivery.
