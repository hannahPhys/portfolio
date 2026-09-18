# Hannah Auckram — Portfolio

Personal portfolio site at [hannah.kiwi](https://hannah.kiwi), built with React 19 and Vite, featuring a scroll-driven parallax hero, a project showcase, a flipbook-style design section, a scroll dive-through photography gallery, and a contact section.

## Tech stack

- **React 19** + **Vite 7**
- **Framer Motion** for scroll-linked animation (parallax layers, dive-through photography effect)
- Plain CSS (no framework) — each section/component has its own `.css` file colocated with it

## Project structure

```
src/
  App.jsx / App.css       Hero: starfield, parallax sky/aurora/mountains, floating icon nav
  components/
    Starfield.jsx/css     Twinkling stars + random meteors (Canvas-free, DOM-based)
    Zine.jsx/css          "design" section — flipbook-style page viewer
    BrowserWindow.jsx     Mock browser chrome used to preview project screenshots
    ProjectCard.jsx       Project title/description/tags/links card
  sections/
    Projects.jsx/css      "websites" section — project showcase
    Photography.jsx/css   "photography" section — scroll dive-through gallery
    Contact.jsx/css       "contact" section — email/GitHub/Instagram
public/
  optimized/               WebP background images (desktop + mobile variants, see below)
  icons/, zine/, photography/, screenshots/, videos/
```

Each hero floating icon links to its matching section by anchor (`#design`, `#websites`, `#contact`) where a section has an unambiguous match; icons without an obvious destination are left as plain decoration.

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # eslint
```

## Deployment

Deployed on **Vercel**, linked to the `hannahauckram` account, deploy-on-push is not connected (deploys are manual via CLI):

```bash
vercel --prod
```

The custom domain `hannah.kiwi` (and `www.hannah.kiwi`) is configured in the Vercel project with DNS A records pointing at Vercel's edge network.
