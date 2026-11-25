# UNVOR web portal

[Home](../README.md) · [Public website](https://jabo86.github.io/UNVOR/)

The primary website is the static Italian ecosystem portal ([HTML](../index.html), [CSS](../web/nexus-ecosystem.css), [artwork](../assets/nexus/)). The illustrations are decorative, not an interactive world or product functionality. The [multilingual portal](../portal-legacy.html) uses local [CSS](../web/hud.css) and [JS](../web/hud.js). It no longer contains simulated conversations or node activity. No public game is hosted in the current site. The previous route redirects to the official home. Historical versions remain in Git.

The primary page has no scripts, analytics, cookies or remote fonts. The multilingual page uses local storage for preferences. Hosting and linked sites have their own privacy policies.

Run `python3 -m http.server 8080 --bind 127.0.0.1` at the repository root for preview. GitHub Pages deploys the main branch. [Actions](https://github.com/Jabo86/UNVOR/actions) checks local references, CSS assets, translations and the publication guard; browser and deployment verification remain separate. Follow the [factual publication policy](CONTENT-EVIDENCE.md).
