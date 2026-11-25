# UNVOR web portal

[Home](../README.md) · [Public website](https://jabo86.github.io/UNVOR/)

The original HUD V3 portal is now hosted on GitHub Pages. The deployment of commit `0bd07c2c4031721962cc52138583e0d65367b18f` completed successfully: [deployment evidence](https://github.com/Jabo86/UNVOR/actions/runs/45504438234).

## Source architecture

| File | Responsibility |
| --- | --- |
| [index.html](../index.html) | Semantic page structure |
| [hud.css](../web/hud.css) | Cyan HUD, layout, motion and responsive design |
| [hud.js](../web/hud.js) | Local interactions, simulated network, Italian/English/Spanish translations and preferences |
| [Assets](../assets/) | Local project branding and launcher preview |
| [Catalog](../releases/catalog.json) | Distribution inventory |

The portal has no live network telemetry and no advertising or analytics scripts. Hosting may process request information under its own terms. Language and consent preferences use local storage.

## Local preview

From the repository root, run `python3 -m http.server 8080 --bind 127.0.0.1` and open http://127.0.0.1:8080/ in a browser. The site requires no build step.

## Deployment

GitHub Pages is configured for this repository. The expected deployment source is main / root. Review the [Pages settings](https://github.com/Jabo86/UNVOR/settings/pages) and [Actions](https://github.com/Jabo86/UNVOR/actions) after a change. A successful deployment does not certify browser behavior.

## Verification

The repository check validates local references, translation coverage and catalog structure. Node checks JavaScript syntax. Desktop/mobile rendering, keyboard navigation, image zoom, privacy choices and all language paths still need browser regression tests.

## Nexus Ecosystem primary portal

The approved Ecosystem Edition replaces the root landing page. Its Italian HTML content and locally hosted WebP artwork are served from [index.html](../index.html), [nexus-ecosystem.css](../web/nexus-ecosystem.css) and [assets/nexus](../assets/nexus/). The previous multilingual HUD remains available at [portal-legacy.html](../portal-legacy.html). The playable experimental prototype remains under [nexus/](../nexus/). The primary portal is a static 2D website, not a rendered 3D scene. No application binary or release has been modified. Deployment success and browser runtime checks are tracked separately.
