# UNVOR Chat

[Home](../README.md) · [Pilot release](https://github.com/Jabo86/ultron-android/releases/tag/ratchet-pilot-66) · [Source](https://github.com/Jabo86/ultron-android/tree/main/src)

UNVOR Chat is an Android messaging client developed with React Native and native Android components. It is a distinct application from the Launcher.

## Intended experience

The product direction covers one-to-one communication, groups, calls and attachment handling. The internal contact model is intended to use UNVOR identifiers: both participants must have added each other before a conversation is enabled. Actual enforcement must be tested on both client and server for each release.

Attachments should be selected and confirmed before sending, including multiple documents. Chat input, keyboard behavior, message ordering and delivery indicators should remain consistent during sending and receiving.

## Security and delivery

Cryptographic primitives, authentication, key lifecycle, group behavior and protection against replay require protocol review and integration tests. Delivery should be tested when apps are in the foreground, background and temporarily offline, including retries, duplicate handling and notifications. A successful notification alone does not prove message delivery.

## Current distribution

Pilot 366 is an experimental prerelease for test accounts. It is not an audited or stable release. The [download guide](DOWNLOADS.md) explains verification and compatibility caveats.
