# UNVOR Chat

[Home](../README.md) · [Pilot release](https://github.com/Jabo86/ultron-android/releases/tag/ratchet-pilot-66) · [Source](https://github.com/Jabo86/ultron-android/tree/main/src)

UNVOR Chat is an Android messaging client developed with React Native and native Android components. It is a distinct application from the Launcher.

## Intended experience

The product direction covers one-to-one communication, group modules, individual voice calls and attachment handling. The inspected pilot direct-send path checks mutual contacts, blocking and signed contact keys. A previously pinned fingerprint is checked if present; mandatory out-of-band QR verification for every path is not established. Actual enforcement must be tested on both client and server for each release.

The inspected Pilot 366 ChatScreen includes multiple-document selection and direct-poll components. Confirm the full attachment selection, confirmation, cancellation and delivery path on the device. The direct-call screen explicitly disables video. Group availability depends on gateway support. Chat input, keyboard behavior, message ordering and delivery indicators should remain consistent during sending and receiving.

## Security and delivery

Cryptographic primitives, authentication, key lifecycle, group behavior and protection against replay require protocol review and integration tests. Delivery should be tested when apps are in the foreground, background and temporarily offline, including retries, duplicate handling and notifications. A successful notification alone does not prove message delivery.

## Current distribution

Pilot 366 is an experimental prerelease for test accounts. It is not an audited or stable release. The [download guide](DOWNLOADS.md) explains verification and compatibility caveats.

[Exact source review and limitations](CONTENT-EVIDENCE.md).
