# NABATI ORIGINALS — Luxury Perfume Brand Website

A high-end, cinematic sample website for the niche fragrance house **NABATI ORIGINALS**.

## Quick start

Open `index.html` in a browser (double-click or use a local server).

## Logo

The site tries to load the logo from `../perfume.pdf`. Many browsers cannot display a PDF as an image, so a styled text logo (“NABATI ORIGINALS”) is shown as a fallback.

**To use your own logo image:**  
Export the logo from your PDF as a PNG (e.g. `logo.png`), place it in this folder, and in `index.html` change:

```html
<img src="../perfume.pdf" ... />
```

to:

```html
<img src="logo.png" alt="NABATI ORIGINALS" class="logo-img" />
```

(You can remove the `onerror` and the fallback div if you no longer need them.)

## Image (single sourced asset)

One luxury perfume bottle image is used across the site (sourced, minimal, studio-lit, dark background). It appears at most in two places, each with a **different crop and context** so it is never shown the same way twice. Layout, typography, and rhythm lead; the image supports the design. The site remains complete and luxurious if the image is removed or fails to load.

## Structure

- **index.html** — Editorial homepage: opening, philosophy, one optional visual reference, horizontal type-only scroll, contact
- **collection.html** — Type-led fragrance list (no product imagery)
- **product.html** — Hero (type + space), story, notes, reserve CTA
- **checkout.html** — Minimal form
- **styles.css** — Palette, typography, editorial layout, one image variable
- **script.js** — Reveals, product CTA bar

## Tech

- No build step; plain HTML, CSS, and JavaScript
- Responsive, desktop-first
- Respects `prefers-reduced-motion` for animations
