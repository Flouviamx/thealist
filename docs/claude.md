# The A List — Project Documentation

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP 3 (ScrollTrigger)
- **3D / WebGL:** Three.js, React Three Fiber, Drei
- **Icons:** Lucide React
- **Fonts:** Fraunces (serif/display) + DM Sans (body)

## Color Palette
Defined in `src/app/globals.css` via `@theme`:
| Token | Hex | Use |
|---|---|---|
| `--background` | `#080407` | Page background |
| `--color-brand` | `#42223A` | Plum accent, intro curtain |
| `--color-brand-light` | `#5A3150` | Decorative icons only |
| `--color-brand-dark` | `#2A1525` | Unused (reserved) |

## Text Color System (Unified)
- `text-white` — Headings, labels
- `text-white/60` — Body paragraphs
- `text-white/50` — Subheadings, metadata
- `text-white/30` — Footer copyright, fine print
- `text-brand-light` — **Icons only** (check, bullet dot, star)

## Typography
- **Fraunces** (`font-serif`) — All headings (h1–h6). Editorial, variable, great italic.
- **DM Sans** (`font-sans`) — Body text. Applied via `font-sans` on `<body>` in `layout.tsx`.
- Loaded via `next/font/google` as CSS variables `--font-fraunces` and `--font-dm-sans`.

## Component Architecture
All in `src/components/`:

| Component | Description |
|---|---|
| `IntroOverlay.tsx` | Cinematic plum curtain that splits left/right on page load |
| `Navbar.tsx` | Fixed nav, GSAP scroll → glassmorphic plum bg on scroll |
| `Hero.tsx` | "where cool / people meet" + CTA. Text animates in during intro |
| `AnimatedButton.tsx` | GSAP magnetic button with fill + text swap animation |
| `AboutSection.tsx` | Welcome copy + event tags + Invitation3D WebGL |
| `Invitation3D.tsx` | Custom GLSL shader — silk physics, luminance masking |
| `ServicesSection.tsx` | Community vs Business split layout |
| `CareersSection.tsx` | Job cards → Tally forms |
| `Footer.tsx` | 4-column grid, newsletter, links |

## Page Flow
`page.tsx` composes everything:
```
IntroOverlay → Navbar → Hero → AboutSection → ServicesSection → CareersSection → Footer
```

## External Links
- Community application: `https://tally.so/r/7RrpqL`
- CDMX jobs: `https://tally.so/r/814g7P`
- Remote jobs: `https://tally.so/r/GxOJy2`
- Instagram: `@thealist.mexicocity`
- Email: `thealist.mexicocity@gmail.com`

## Public Assets
- `logo.png` — Original logo with plum background
- `logo-transparent.png` — Logo with background removed (generated)
- `invitation.jpg` — Vintage lace card for WebGL shader

## Rules
- Tailwind v4: config lives in `@theme` inside `globals.css`, NOT in `tailwind.config.js`
- No multi-color text in headings — italic Fraunces provides visual contrast
- GSAP: global `.fade-up` scroll triggers live in `page.tsx`, component-specific animations are self-contained
