# Happy Valley Arcade Bar — website

Live at https://happyvalleybeacon.com (hosted on Netlify).
The Wix site still runs the store, Mug Club, tickets and bookings at
https://shop.happyvalleybeacon.com — that is separate from this repo.

## Editing the site

Go to **https://happyvalleybeacon.com/admin** and sign in with GitHub.
Change what you need, click Save, and the site rebuilds and republishes
itself in about a minute.

What you can edit there:

| Section | What it covers |
|---|---|
| Menu | Every food and drink item, price, description and section |
| Games | Arcade cabinets, Neo Geo games, pinball machines |
| Photos | Both galleries: upload new pictures, captions, order, tile sizes |
| Hours & Details | Opening hours, address, phone, email, social links |

Uploaded photos are committed to `static/uploads/` and resized on the fly by
Netlify Image CDN, so a full-size phone photo is fine to drop in. The original
gallery shots still come from the Wix media library; both kinds work side by side.

Everything else (headlines, page copy, layout, design) lives in the
templates and needs a developer.

## How it is put together

- `src/_data/*.yaml` — the content the editor changes
- `src/*.njk` — one template per page
- `src/_includes/base.njk` — shared header, footer and mobile menu
- `src/_includes/styles/` — per-page CSS
- `src/admin/` — the editor (Sveltia CMS)
- Built with Eleventy. `npm install` then `npm run build`, output in `_site/`.

Page filenames are unchanged from the original hand-built site, so no
existing links break.
