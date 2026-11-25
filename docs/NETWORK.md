# UNVOR Network — relay laboratory

[Home](../README.md) · [Exact source](https://github.com/Jabo86/ultron-android/tree/e5646e0c304081e02a0e136620e0d27b56523e84/relay-node-lab)

The inspected branch contains a two-server forwarding lab, with Ed25519 node authentication, HTTPS using configured certificates, signed receipts and a transient in-memory replay cache. The process has no application database or offline queue in the lab implementation. The receiving node acknowledges opaque probe packets, not delivery to a Chat device. It is not integrated with the Chat client. The pilot uses its existing gateway. No real user traffic, active node count, global availability, offline delivery or zero infrastructure-log retention is asserted.

See the [original laboratory instructions](https://github.com/Jabo86/ultron-android/blob/e5646e0c304081e02a0e136620e0d27b56523e84/relay-node-lab/README.md) for scope and limitations. Production integration, retention, failover, authorization and delivery require separate validation. [Source review](CONTENT-EVIDENCE.md).
