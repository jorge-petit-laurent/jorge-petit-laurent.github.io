# Jorge Petit-Laurent — personal site

Static site, no build step: this repository *is* the deployed site ([pinkypetit.github.io](https://pinkypetit.github.io)). Spanish by default, English toggle. Light and dark themes (follows the system, remembers the choice).

## Design in one paragraph

The hero is a live topographic field: iso-lines of a slow noise terrain, tinted by an illustrative "temperature" that rises under the pointer and as you scroll (a nod to the heat-wave research). The palette is lichen paper, spruce ink and one warm accent, copihue red. Type is Newsreader (display) + Instrument Sans (text) + Geist Mono (dates, DOIs). Photos use leaf-shaped corners. Hierarchy comes from size and treatment, not from identical cards: Sherpas, research and degrees get full sections; papers and talks are a ledger; everything else lives in a filterable archive that opens a detail drawer.

## Structure

- `index.html` — all static sections in Spanish (readable with no JS), the inline icon `<symbol>` sprite, and the modal skeleton. Every translatable node has a `data-i18n` key.
- `css/styles.css` — tokens (`:root` and `html.theme-dark`), layout, components, responsive rules.
- `js/data.js` — `CARD_DATA` (bilingual content for the modal + the archive index, incl. LinkedIn embeds), `ARCHIVE_ORDER`, and `I18N_EN` (English for every `data-i18n` key). To add an archive item, add an entry to `CARD_DATA` and its id to `ARCHIVE_ORDER`.
- `js/terrain.js` — the WebGL2 contour shader (one fragment shader, pauses off-screen, static frame with `prefers-reduced-motion`, CSS fallback without WebGL2).
- `js/main.js` — i18n, theme, archive filters, the "Ruta" elevation timeline (`TRAIL` array), modal + carousel, Lenis smooth scroll and GSAP ScrollTrigger wiring.
- `assets/vendor/` — GSAP 3.13, ScrollTrigger, Lenis 1.3 (self-hosted, minified).
- `assets/fonts/` — variable WOFF2, self-hosted.
- `assets/images/` — photos as WebP.

## Editing content

- Career/CV facts live in `index.html` (Spanish) and `I18N_EN` in `js/data.js` (English). Keep the keys in sync.
- The route on the "Ruta" section is the `TRAIL` array at the top of the timeline block in `js/main.js`.
- The LinkedIn activity cards link to the profile's activity page; swap in specific post URLs when you have them.

## Running locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
