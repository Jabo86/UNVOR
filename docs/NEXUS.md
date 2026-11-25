# UNVOR NEXUS — prototype 0.1

[Portal](../index.html) · [Playable prototype](../nexus/index.html)

## Experience

A browser-native WebGL hangar, original procedural guardian model, orbit controls, local cosmetic editor and five progressively unlocked logic missions. An accessible HTML interface remains usable without WebGL. The public portal is not gated by registration. The prototype is Italian-language; translations are planned.

## Identity boundary

The local profile is not a user account, a verified UNVOR ID or a proof of achievement. Optional local storage remembers the profile. The versioned appearance-only JSON export includes alias, armor, helmet, color and emblem. No imported script, external URLs, chat keys, tokens, messages or game progress. The current Launcher and Chat do not yet consume this format. A separate consent-based account-linking protocol must be designed and reviewed before implementation; no Chat key transfer.

## Campaign plan

001–020: awakening and training; 021–040: alliance and coordination; 041–060: exploration and puzzles; 061–080: restoration; 081–099: final portal; 100: global cooperative finale. Only missions 001–005 are implemented in this prototype. NULL ZERO is a fictional antagonist; the campaign uses abstract restoration puzzles rather than real-world combat. Cosmetics are optional and never gate security or application functions.

## Multiplayer roadmap

Local play first, then isolated game backend, validated progress, account linking, opt-in private squads with moderation, and scalable asynchronous participation. A future final mission would require one million unique eligible contributors, verified server-side with deduplication and privacy-preserving controls; no simultaneous login requirement. No live counter, real account creation, global progress, squad service or claim of scale exists in this prototype. No paid boosts, streak penalties or mandatory play sessions.

## Engineering

The static source runs without external libraries, analytics or network requests to a game server. WebGL is a simplified original model, not the cinematic concept render. Browser/device testing and performance tuning are required. Run `node --test tests/nexus.test.mjs` for local rules tests. Serve the repository over HTTP for ES modules.
