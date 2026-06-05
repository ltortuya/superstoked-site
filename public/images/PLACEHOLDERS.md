# Image Placeholders

Every `<ImagePlaceholder>` in the site uses a `label` prop that describes the
intended subject of the photo. When real photography arrives, swap placeholders
for `<Image>` / `<img>` components pointing at files dropped into this folder.

## How to replace a placeholder

1. Drop the real image into `public/images/` — keep reasonable file sizes (aim
   for <400KB per image; use tools like Squoosh or TinyPNG to compress).
2. In the component where the placeholder lives, replace:
   ```tsx
   <ImagePlaceholder label="REPLACE: ..." aspect="4/3" tone="ocean" />
   ```
   with:
   ```tsx
   <img
     src="/images/alimanguan-library-opening.jpg"
     alt="Kids reading on opening day at the Alimanguan library"
     className="w-full aspect-[4/3] object-cover rounded-2xl"
     loading="lazy"
   />
   ```
   Or — if you want image optimization — use Next's `<Image>`. Note: because the
   site is built as a static export (`output: 'export'`), `next/image` is
   configured with `unoptimized: true`. Either works.

## Placeholders by page

### Home
- **Featured Project image** — `src/components/home/FeaturedProject.tsx`
  Suggested: wide photo of the Alimanguan elementary school, library-in-progress,
  or students holding donated books.

### About
- **Origin story image** — `src/app/about/page.tsx`
  Suggested: first trip / founding moment photo.
- **Why We Started image** — `src/app/about/page.tsx`
  Suggested: portrait-oriented photo of a youth, classroom, or community scene.

### Programs
- **One image per program** (5 total) — `src/app/programs/page.tsx`
  Library, youth surf, mentorship, community outreach, equipment donations.

### Impact
- **Before/After images** (2) — `src/app/impact/page.tsx`
- **Gallery grid** (6) — `src/app/impact/page.tsx`
  A mix of program moments, volunteers, events, partnerships.

### News
- **Hero image per post** — `src/app/news/page.tsx`
  Currently shows placeholder articles. Replace whole article objects in the
  `posts` array with real content when stories are ready.

## Brand assets still needed

- **Favicon** — currently the default Next.js favicon at `src/app/favicon.ico`.
  Replace with a 32×32 (or multi-size ICO) of the Superstoked mark.
- **OG image** — referenced at `/og-image.jpg` in `src/app/layout.tsx`. Create a
  1200×630 PNG/JPG showing the Superstoked wordmark over ocean imagery.
- **Logo SVG** — currently rendered procedurally in `src/components/layout/Logo.tsx`.
  When a final logo exists, drop the SVG into `public/images/logo.svg` and swap
  the SVG rendering in `Logo.tsx`.
- **Partner logos** — `src/components/home/PartnersSection.tsx` renders text
  initials as placeholders. Drop SVGs/PNGs into `public/images/partners/` and
  update the partner entries in `src/lib/content.ts` with a `logoUrl` field,
  then update the component to render `<img>`.

## Photography sourcing tips

- Prefer landscape-oriented shots for featured / before-after slots (4:3 or 16:9).
- Prefer portrait-oriented shots for full-bleed About page and impact portraits.
- Always get consent for photos of minors. If in doubt, use wide shots showing
  context rather than identifiable faces.
- Use natural light whenever possible — it reads as authentic and avoids the
  stock-photo feel.
