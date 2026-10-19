---
version: alpha
name: Field Notes
description: Warm, editorial portfolio for S M Nafim Niloy. Paper, ink and terracotta, typeset like a printed research notebook. Typography taken from Bound (weare-bound.com, Typewolf Site of the Day, Dec 2016).
colors:
  primary: "#1F1B16"
  on-primary: "#F4EFE6"
  secondary: "#5E6B3A"
  on-secondary: "#FBF8F2"
  tertiary: "#A84A28"
  on-tertiary: "#FBF8F2"
  tertiary-soft: "#F8ECE4"
  neutral: "#F4EFE6"
  surface: "#FBF8F2"
  surface-sunk: "#EAE2D3"
  on-surface: "#1F1B16"
  muted: "#5C5347"
  outline: "#D6CCBA"
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 4.5rem
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.02em
  headline:
    fontFamily: Playfair Display
    fontSize: 2.75rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  title:
    fontFamily: Playfair Display
    fontSize: 1.375rem
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontFamily: Lato
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Lato
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: Space Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.04em
  label-caps:
    fontFamily: Space Mono
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: 0.12em
rounded:
  none: 0px
  sm: 4px
  md: 10px
  lg: 18px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  section: 120px
  gutter: 16px
  container: 1120px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 12px 22px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
  button-outline:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 11px 21px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-meta:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  chip:
    backgroundColor: "{colors.surface-sunk}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  chip-accent:
    backgroundColor: "{colors.tertiary-soft}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  status-badge:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
  divider:
    backgroundColor: "{colors.outline}"
    height: 1px
  marquee:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
---

## Overview

**Field Notes** treats the portfolio like a researcher's printed notebook: warm
uncoated paper, dense black ink, and one earthy terracotta used sparingly for
emphasis. It should feel calm, human and handmade, closer to a small editorial
publication than a tech landing page.

The typographic voice comes from Bound (weare-bound.com), whose stylesheet
pairs **Space Mono**, **Playfair Display** and **Lato**. We keep that trio:
Playfair carries the editorial headlines, Space Mono handles the "lab notebook"
metadata (labels, dates, tags, navigation), and Lato keeps long text readable.

There is one theme only, light paper. No dark mode and no theme toggle.

## Colors

The palette is drawn from natural materials: paper, ink, clay and moss.

- **Primary / Ink (#1F1B16):** Warm near-black for headings, body text,
  primary buttons and the looping marquee strip.
- **Neutral / Paper (#F4EFE6):** The page background. Never use pure white
  for the page.
- **Surface (#FBF8F2):** Cards sit slightly lighter than the paper, like a
  fresh sheet laid on a desk.
- **Surface sunk (#EAE2D3):** Chips, code blocks and inset areas.
- **Tertiary / Terracotta (#A84A28):** The single accent. Links on hover,
  the primary button hover state, italic emphasis in headlines, the rotating
  badge. If more than one terracotta element competes in a viewport, remove one.
- **Tertiary soft (#F8ECE4):** Background for accent chips and highlights.
- **Secondary / Moss (#5E6B3A):** Status badges (Published, Presented,
  Under Review) and the availability dot.
- **Muted (#5C5347):** Secondary text: captions, dates, metadata.
- **Outline (#D6CCBA):** 1px rules and card borders.

## Typography

- **Display / Headline / Title:** Playfair Display 700. Use the italic for one
  emphasised word per headline (rendered in terracotta), e.g. "Let's talk
  *research*".
- **Body:** Lato 400 at 1rem–1.125rem with generous 1.65–1.7 line height.
  Paragraphs max out at ~68ch.
- **Label / Label caps:** Space Mono. Every piece of metadata (section
  numbers like `01 / Education`, dates, tags, nav links, buttons, stats) uses
  Space Mono. Caps labels get 0.12em tracking.

Display size scales fluidly: `clamp(2.75rem, 7vw, 4.5rem)`.

## Layout

- Single centred column, max width 1120px, 16px side gutter on phones and
  24px from tablet up.
- Sections are separated by 120px of vertical space (72px on phones) and a
  1px outline rule, with a mono section label above each title.
- Education is a vertical timeline (stage + period in a 160px mono column on
  desktop, stacked on phones). Grids: two columns for featured projects; three
  for the remaining projects and repositories; all collapse to one column under
  720px.
- Hero is asymmetric: copy on the left (~60%), a "notebook card" on the right
  containing location, email and count-up stats.

## Elevation & Depth

Depth is physical rather than digital. Cards use a 1px outline border and,
on hover, lift 3px with a soft warm shadow
`0 14px 30px -18px rgba(31, 27, 22, 0.35)`. No glassmorphism, no glows, no
gradients except a faint paper-grain noise overlay on the page background.

### Motion

All motion is slow and organic, and every looping animation stops under
`prefers-reduced-motion: reduce`.

- **Marquee strip** (loop, 40s linear): an ink band below the hero scrolls
  research interests endlessly. The content is duplicated and translated
  `-50%` so the loop is seamless. It pauses on hover.
- **Rotating badge** (loop, 22s linear): circular Space Mono text "open to
  research & job opportunities ✦" rotating around an italic Playfair "N"
  monogram on a terracotta disc in the hero card.
- **Organic blob** (loop, 18s ease-in-out alternate): a soft terracotta/moss
  blob behind the hero morphs its border radius and drifts.
- **Availability dot** (loop, 2.4s): moss dot with a breathing ring. Also
  marks the thesis status line.
- **Headshot float** (loop, 6s ease-in-out): the avatar bobs 5px and tilts 2deg.
- **Timeline traveller** (loop, 6s ease-in-out): a terracotta dot travels
  down the education timeline and fades out at the bottom.
- **Reveal on scroll** (once): sections fade up 18px over 700ms.
- **Count-up** (once): hero stats count from 0.

## Shapes

Soft but not bubbly: 18px radius for cards, 10px for images and inputs,
fully rounded pills for buttons and chips. Decorative shapes (blob, badge) are
the only round-organic forms.

## Components

- **Buttons:** pill-shaped, Space Mono label. Primary is ink with paper text
  and turns terracotta on hover. Outline uses a 1px ink border on paper.
- **Cards:** surface background, 1px outline border, 18px radius, 24px padding.
  The card head row is Space Mono metadata in muted ink.
- **Chips / tags:** sunk-paper pill in Space Mono. Accent chips use
  terracotta on tertiary-soft.
- **Status badge:** caps Space Mono pill. Solid moss for finished states
  (Published, Accepted, Presented); moss outline for work in progress
  (Under Review, Submitted, In Preparation).
- **Publication lists:** two ruled lists, "Papers" (journal Accepted/Published,
  conference Presented/Published) and "In progress" (everything else), each
  with a mono count beside the heading.
- **Experience card:** full-width card; role as title, organisation in Space
  Mono (linked when a URL exists) with a moss pulsing "Current" marker.
- **Timeline:** dashed outline line, 13px ring markers (the newest filled ink),
  caps terracotta stage label, card per stop.
- **Headshot:** illustrated avatar shown whole (`object-fit: contain`) on a
  136px sunk-paper disc, never cropped to a circle.
- **Marquee:** full-bleed ink band, caps Space Mono, terracotta `✦` separators.
- **Icons:** Phosphor Icons, **Light** weight, 18–20px, coloured
  `currentColor`. The thin line style matches Bound's light line icons. Do not
  mix in filled or duotone icons.

## Do's and Don'ts

- **Do** keep terracotta rare. It is a highlight, not a fill colour.
- **Do** use Space Mono for anything that is data or metadata.
- **Do** give every loop a reduced-motion fallback.
- **Do** keep the background warm paper. Never use `#FFFFFF` for the page.
- **Don't** add a dark mode, theme toggle or neon gradient text.
- **Don't** use emoji as icons in UI chrome. Use Phosphor Light instead.
- **Don't** set long paragraphs in Space Mono. Body copy is Lato.
- **Don't** add drop shadows to text or heavy shadows to cards.
