# ellayee.dev — portfolio

Personal site for Ella Yee — Biomedical Engineering & Computer Science at Columbia.

Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, and framer-motion.
Deployed on Vercel.

## Running locally

```bash
npm install
npm run dev
```

## How it's organised

Content lives in typed data files, separate from the components that render it —
editing the site is usually a matter of editing one file under `app/data/`.

```
app/
  data/         content: profile, experience, education, awards, beyond, clusters
  lib/          embedding.ts — the seeded point-field generator
  components/   UI, including the hero embedding and the café map
  <route>/      page.tsx per route
```

### The embedding motif

The site is built around one idea: everything is points in a space, clustered by
meaning. `app/data/clusters.ts` defines five clusters, and their colours are
reused by the hero embedding, the project cards, the coursework pills, and the
section dividers. `app/lib/embedding.ts` generates the point field from a seed,
so the hero and the dividers are provably the same space.

Pressing `e` anywhere re-runs the embedding.

## Editing content

| I want to change… | Edit |
| --- | --- |
| Name, bio, skills, stats, links | `app/data/profile.ts` |
| Research, internships, projects | `app/data/experience.ts` |
| Courses by semester | `app/data/education.ts` |
| Publications and awards | `app/data/awards.ts` |
| Hobbies, involvement, cafés | `app/data/beyond.ts` |

Photos and PDFs go in `public/`. The headshot is `public/ella.jpg`.
