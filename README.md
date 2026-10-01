# Jorge Petit-Laurent — personal site

Static site, no build step: this repository *is* the deployed site ([jorge-petit-laurent.github.io](https://jorge-petit-laurent.github.io)). Spanish by default, English toggle.

## Two editions

- **`/` — botanical edition (default).** Page `index.html`, styles `css/styles.css` + `css/botanico.css`, scripts `js/data.js`, `js/flora.js`, `js/app.js`, plates in `assets/lam/`.
  - **Curtains.** The opening and closing curtains are lithograph plates with a double-rule frame. Claudio Gay's plants root at the frame and close the plate; on scroll they retract and splay toward the corners (`js/flora.js`), and they close again at the contact.
  - **Details.** Desktop gets idle sway, depth parallax and a plate-number caption on hover. Vine ornaments sit between sections, the route waypoints bloom, and a few sprigs cross the edge of the name card. The detail modal grows two plates at its sides.
  - **Plates.** `assets/lam/` holds each plate in two sizes (`-s` 480 px, `-l` 840 px) with the shadow baked in, so the page uses no CSS filters.
  - **Mobile.** Fewer plants and native scroll (no Lenis).
  - **Scroll positions.** ScrollTrigger positions are recomputed when section heights change.
- **`/clasico/` — topographic edition.** The earlier design, with the WebGL contour hero (`js/terrain.js`, `js/main.js`) and light and dark themes. It carries `noindex`.
- **`/botanico/`** redirects to `/`, so links shared earlier keep working.

Both editions share `css/styles.css`, `js/data.js`, the fonts and the photos. Photo paths in `js/data.js` are root-absolute (`/assets/images/…`), so they work from either page.

## Design in one paragraph (topographic edition)

The hero is a live topographic field: iso-lines of a slow noise terrain, tinted by an illustrative "temperature" that rises under the pointer and as you scroll (a nod to the heat-wave research). The palette is lichen paper, spruce ink and one warm accent, copihue red. Type is Newsreader (display) + Instrument Sans (text) + Geist Mono (dates, DOIs). Photos use leaf-shaped corners. Hierarchy comes from size and treatment, not from identical cards: Sherpas, research and degrees get full sections; papers and talks are a ledger; everything else lives in a filterable archive that opens a detail drawer.

## Structure

- `clasico/index.html` / `index.html` — all static sections in Spanish (readable with no JS), the inline icon `<symbol>` sprite, and the modal skeleton. Every translatable node has a `data-i18n` key.
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
