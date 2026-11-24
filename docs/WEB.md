# UNVOR web portal

[Home](../README.md) · [Website source](../index.html)

The original HUD V3 static portal is integrated into the repository. It uses local assets, Italian/English/Spanish translations, language preference controls and an illustrative network simulation. No live network status is represented. The site code does not include advertising or analytics scripts. Hosting may process network request information under its own terms.

## Activate GitHub Pages

1. Open [repository Pages settings](https://github.com/Jabo86/UNVOR/settings/pages).
2. Under Build and deployment, choose **Deploy from a branch**.
3. Select **main** and **/(root)**, then save.
4. Check the Pages deployment in GitHub Actions and use the address reported by GitHub. The expected project address is `https://jabo86.github.io/UNVOR/`; it is not considered live until verified.

The `.nojekyll` file permits serving the static source directly. No third-party fonts, analytics or external script dependencies are required by the portal. Never commit credentials or signing keys.

## Verification

Check desktop and mobile rendering, language switching, consent preferences, keyboard navigation, the launcher image zoom, and download destinations. The existing repository documentation workflow does not prove browser behavior or deployment success.
