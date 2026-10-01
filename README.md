# Jorge Petit-Laurent — personal site

Static site, no build step: this repository *is* the deployed site ([jorge-petit-laurent.github.io](https://jorge-petit-laurent.github.io)). Spanish by default, English toggle.

## Structure

- Page `index.html`, styles `css/styles.css` + `css/botanico.css`, scripts `js/data.js`, `js/flora.js`, `js/app.js`, plates in `assets/lam/`.
  - **Curtains.** The opening and closing curtains are lithograph plates with a double-rule frame. Claudio Gay's plants root at the frame and close the plate; on scroll they retract and splay toward the corners (`js/flora.js`), and they close again at the contact.
  - **Details.** Desktop gets idle sway, depth parallax and a plate-number caption on hover. Vine ornaments sit between sections, the route waypoints bloom, and a few sprigs cross the edge of the name card. The detail modal grows two plates at its sides.
  - **Plates.** `assets/lam/` holds each plate in two sizes (`-s` 480 px, `-l` 840 px) with the shadow baked in, so the page uses no CSS filters.
  - **Mobile.** Fewer plants and native scroll (no Lenis).
  - **Scroll positions.** ScrollTrigger positions are recomputed when section heights change.
- **`/botanico/`** redirects to `/`, so links shared earlier keep working.

Unknown paths (e.g. the removed `/clasico/`) fall back to `404.html`, which redirects to `/`.

## Editing content

- Career/CV facts live in `index.html` (Spanish) and `I18N_EN` in `js/data.js` (English). Keep the keys in sync.
- The route on the "Ruta" section is the `TRAIL` array at the top of the timeline block in `js/main.js`.
- The LinkedIn activity cards link to the profile's activity page; swap in specific post URLs when you have them.

## Running locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
