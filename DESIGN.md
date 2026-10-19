---
version: alpha
name: Press Kit
description: Monochrome typographic portfolio for S M Nafim Niloy. Black ink on white, oversized grotesque headlines, bracketed monospace captions, sparkle dividers and one sheet of crumpled paper. Adapted from a press-kit style reference (refero.design) using only free fonts.
colors:
  primary: "#121212"
  on-primary: "#FFFFFF"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  newsprint: "#F1F1F1"
  foil: "#E1E1E1"
  mute: "#C5C5C5"
typography:
  display:
    fontFamily: Inter
    fontSize: 13rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.04em
  heading:
    fontFamily: Inter
    fontSize: 4.7rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  heading-sm:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  nav:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.15
  caption:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Space Mono
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
  annotation:
    fontFamily: Rock Salt
    fontSize: 0.42em
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.02em
rounded:
  tag: 20px
  card: 20px
  nav-item: 28px
  nav: 40px
  image: 288px
spacing:
  xs: 10px
  sm: 17px
  md: 20px
  lg: 30px
  xl: 40px
  2xl: 50px
  section: 72px
  container: 1200px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  paper-zone:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.primary}"
  nav-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.nav}"
    rounded: "{rounded.nav}"
    padding: 5px
  nav-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.nav-item}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.nav}"
    rounded: "{rounded.nav-item}"
    padding: 12px 22px
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.nav}"
    rounded: "{rounded.nav-item}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.card}"
    padding: "{spacing.xl}"
  tag:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.tag}"
    padding: 3px 12px
  status-done:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.tag}"
  divider:
    backgroundColor: "{colors.foil}"
    height: 1px
  disabled:
    backgroundColor: "{colors.mute}"
    textColor: "{colors.primary}"
  marquee:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
---

## Overview

**Press Kit** treats the portfolio like a printed press kit laid out on raw
paper. There is no chromatic colour: black ink, white space, hairline rules
and one crumpled-paper texture carry the whole atmosphere. Typography is the
product. Display headlines reach ~13rem in Inter 700 with tight tracking, so
text is the dominant visual mass on every screen.

Three voices: **Inter** (the workhorse, standing in for Helvetica Neue) for
95% of the content including all headlines, **Space Mono** for bracketed
print captions like `[01 — EXPERIENCE]`, and **Rock Salt** for a single
handwritten annotation per page. All three are free (SIL OFL / Apache 2.0)
and self-hosted.

Single light theme. No dark mode, no theme toggle.

## Colors

Five neutrals only. Zero chroma is the brand.

- **Press Ink (#121212):** all text, hairlines, borders, icons, the marquee
  band and every solid fill (primary buttons, active nav item, finished status).
- **Paper White (#FFFFFF):** the page canvas above the fold, cards, the nav pill.
- **Newsprint (#F1F1F1):** tags, and the paper zone below the hero that carries
  the crumpled texture.
- **Foil Gray (#E1E1E1):** light borders and dividers (header underline, tag
  outlines, stat separators).
- **Mute Gray (#C5C5C5):** disabled states and decorative lines only. Never
  use it for readable text; secondary text stays ink and is distinguished by
  size or the mono face instead.

## Typography

- **Display:** Inter 700, `clamp(3.4rem, 13.4vw, 13rem)`, line-height 1.0,
  tracking -0.04em, ALL CAPS. Used for the name in the hero (last name on its
  own line), the contact headline, the blog title and the 404.
- **Heading:** Inter 700, `clamp(2.5rem, 6.4vw, 4.7rem)`, line-height 1.05,
  ALL CAPS, for section titles.
- **Heading small:** Inter 700, 22px, mixed case, for card titles and paper
  titles (20px).
- **Body:** Inter 400, 17px, line-height 1.6, measure ≤ 720px.
- **Nav / buttons:** Inter 500, 15px, uppercase.
- **Caption / label:** Space Mono 400, 13–16px, uppercase, usually wrapped
  in square brackets: `[01 — EXPERIENCE]`, `[CONFERENCE]`, `[UNIVERSITY]`.
- **Annotation:** Rock Salt, about 0.42em of the surrounding headline,
  circled with a hand-drawn ink loop. Exactly once per page (the last word of
  the contact headline).

Emphasised words in headlines (`<em>`) are plain ink: no colour, no italics.

## Layout

- Centered container, max 1200px, 16px side gutter on phones and 40px from
  tablet up.
- Sections are 72px apart, introduced by a centered row of five sparkles
  (72px gaps), then a bracketed mono label and an all-caps heading. 50px
  between the heading and the content.
- Hero: bracketed availability caption → oversized two-line name → a grid
  with the subtitle, bio and buttons on the left and the info card (avatar,
  location, email, stats, rotating badge) on the right.
- An ink marquee band separates the hero from the paper zone; everything after
  it sits on newsprint with the crumpled texture.
- Footer: one strip with an ink hairline on top; wordmark left, mono tag
  centre, copyright and social icons right.

## Elevation & Depth

No shadows anywhere. Structure comes from 1px ink hairlines (cards, nav pill,
publication rules, skill rows) and generous whitespace. Depth comes only from
the crumpled-paper texture: an SVG noise sheet lit with `feDiffuseLighting`,
2560px wide so it never shows a seam, applied to the page below the hero.
Never apply the texture to cards or components.

### Motion

Cards never move or lift: the aesthetic is static print. Loops are slow, all
monochrome, and every one stops under `prefers-reduced-motion: reduce`.

- **Marquee** (loop, 40s linear): research interests on the ink band,
  separated by sparkles; pauses on hover.
- **Rotating badge** (loop, 22s): mono caption text circling a still avatar
  (`profile.badgeAvatar`) in the corner of the hero card; falls back to an
  ink "N" disc when there is no avatar.
- **Headshot breathe** (loop, 8s): the round photo zooms gently to 105% and back.
- **Timeline traveller** (loop, 6s): an ink dot travels down the education line.
- **Availability dot** (loop, 2.4s): ink dot with a breathing ring.
- **Reveal** (once): sections fade up 18px; the hero lines rise in a stagger.

## Shapes

- Cards and tags: 20px radius. Nav pill 40px, nav items and buttons 28px.
- Large images: up to 288px radius for truly full-bleed photos; the 760px
  blog post cover uses 140px so it stays a softened rectangle, not an oval.
  Blog-list thumbnails 14px.
- Circles only for the avatar, badge, icon discs and social buttons.

## Components

- **Header name:** just the short name ("NAFIM"), Inter 24px/700 caps; clicking
  it returns to the top of the home page.
- **Wordmark (footer):** text only. Full name, then each part of the
  subtitle, stacked on three lines, Inter 15px/500.
- **Nav pill:** white, 1px ink border, 40px radius, uppercase items; the
  active item is filled ink. On phones it becomes a full-width dropdown.
- **Buttons:** 28px radius, uppercase Inter 15px/500. Primary is ink with
  white text; outline is white with an ink border. Hover simply inverts.
- **Cards:** white, 1px ink border, 20px radius, 40px padding (20px on
  phones), mono uppercase meta row.
- **Tags:** newsprint pill-ish chip (20px radius), Space Mono 13px.
- **Status badge:** mono caps. Finished work (Published / Accepted /
  Presented) is solid ink; work in progress is an ink outline.
- **Sparkle divider:** five four-pointed sparkles, 20px, 72px apart.
- **Annotation:** Rock Salt word inside a hand-drawn ink ellipse (SVG path).
- **Icons:** Phosphor Light, `currentColor` ink.

## Do's and Don'ts

- **Do** let type size carry the page: display and section headings in caps.
- **Do** wrap meta labels in square brackets in Space Mono.
- **Do** keep every colour within the five neutrals.
- **Do** keep body text at 17px with a measure of at most ~720px.
- **Don't** add box-shadows, gradients, glows or hover-lift effects.
- **Don't** introduce any chromatic accent, including language colour dots.
- **Don't** use mixed case in display headlines; only the Rock Salt
  annotation is mixed case, and only once per page.
- **Don't** put the paper texture on cards, or tile it with visible seams.
- **Don't** use serif typefaces anywhere.
- **Don't** add a dark mode.
