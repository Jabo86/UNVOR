# ADR-001 — Component boundaries

Status: design direction.

Context: Android and GrapheneOS already provide operating-system security and permissions. UNVOR adds product-specific features.

Decision: keep launcher navigation and local tools separate from messaging and relay logic. Respect OS permission and isolation mechanisms rather than duplicating them.

Consequences: component interfaces and permission use must be documented. Compatibility needs device-specific validation. This record does not claim platform endorsement or security equivalence.
