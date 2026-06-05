# Superstoked Foundation

Official website for Superstoked Foundation — a 501(c)(3) nonprofit empowering coastal youth through surf, education, and community.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Sanity CMS** for team-managed event photos. Deploys to **Vercel**.

---

## Quick start (local)

Requires Node.js 18.18+ (20 or 22 recommended) and npm.

```bash
npm install
cp .env.local.example .env.local   # fill in Sanity values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Embedded Sanity Studio (for team content management) is at
[http://localhost:3000/studio](http://localhost:3000/studio).

---

## Project structure

```
superstoked/
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root: html/body, fonts, global SEO
│   │   ├── globals.css              # Tailwind + theme variables
│   │   ├── (site)/                  # Route group — all public site pages
│   │   │   ├── layout.tsx           # Adds Nav + Footer + skip link
│   │   │   ├── page.tsx             # Home
│   │   │   ├── about/
│   │   │   ├── events/              # NEW — Sanity-powered events
│   │   │   │   ├── page.tsx         # Listing + filter
│   │   │   │   └── [slug]/page.tsx  # Event detail + lightbox gallery
│   │   │   ├── impact/
│   │   │   ├── donate/
│   │   │   ├── get-involved/
│   │   │   ├── programs/
│   │   │   ├── contact/
│   │   │   └── news/
│   │   ├── studio/[[...tool]]/      # Embedded Sanity Studio at /studio
│   │   └── api/revalidate/          # Sanity webhook → on-demand ISR
│   ├── components/
│   │   ├── layout/                  # Nav, Footer, Logo, NewsletterSignup
│   │   ├── home/                    # Home-page sections
│   │   ├── events/                  # EventCard, Gallery, Lightbox, Strip…
│   │   ├── donate/                  # DonateWidget
│   │   ├── forms/                   # Contact / Volunteer / Sponsor forms
│   │   └── shared/                  # Button, Card, Container, FAQ, etc.
│   ├── sanity/
│   │   ├── env.ts                   # Env var wiring
│   │   ├── client.ts                # Sanity client + sanityFetch wrapper
│   │   ├── queries.ts               # GROQ queries
│   │   ├── schemas/                 # Sanity content types (Event)
│   │   └── types.ts                 # TypeScript types for Sanity data
│   └── lib/
│       ├── site.ts                  # Nav, socials, site metadata
│       └── content.ts               # All static text/data (partners, FAQ, tiers…)
├── public/
│   └── images/                      # Local image placeholders
├── sanity.config.ts                 # Sanity Studio config
├── sanity.cli.ts                    # Sanity CLI config
├── next.config.ts                   # Next.js config
├── .env.local.example
└── package.json
```

---

## Setting up Sanity (one-time, ~10 minutes)

1. **Sign up for Sanity** at [sanity.io](https://www.sanity.io/).
   - Free tier covers 3 seats, 10GB bandwidth, 10k documents — plenty for a nonprofit-scale site.

2. **Create a new project**:
   - Log in to Sanity → **New project** → name it "Superstoked Foundation"
   - Accept the default "production" dataset
   - Copy the **Project ID** from the dashboard

3. **Paste values into `.env.local`**:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Whitelist your site URLs** in Sanity so Studio can authenticate:
   - Sanity dashboard → your project → **API** → **CORS origins** → Add:
     - `http://localhost:3000` (for local dev)
     - `https://your-production-domain.com` (after you deploy)
   - Check "Allow credentials" for both

5. **Run `npm run dev`** and visit [/studio](http://localhost:3000/studio).
   Log in with your Sanity account.

6. **Invite your team** from the Sanity dashboard → **Members** → Invite by email.
   Choose "Editor" role. They'll get an email, create a free Sanity account,
   and then use `/studio` on your live site.

---

## How the team adds events

1. Team member visits `https://your-domain.com/studio`.
2. Signs in with the Google account they were invited with.
3. Clicks **Event → New Event**.
4. Fills:
   - **Title** (required)
   - **Date** + optional "In progress" toggle for ongoing work
   - **Location** (e.g. "Alimanguan, Palawan")
   - **Program** (radio — matches the Programs page categories)
   - **Summary** (1-2 sentences shown on cards)
   - **Description** (optional longer write-up with formatting)
   - **Cover image** (required — add **alt text** describing the image)
   - **Gallery photos** (drag-and-drop multiple at once; add alt + caption)
   - **Featured on home page** — check this for 1-3 standout events
5. Clicks **Publish**.
6. Within ~60 seconds, the event appears on `/events`, on the Impact page
   gallery, and (if featured) on the home page.

### Where events show up automatically

- **`/events`** — grid of all events, filterable by program
- **`/events/[slug]`** — detail page with full gallery + lightbox
- **Home page "Recent Events" strip** — up to 3 featured events, falls back to
  the 3 most recent if nothing is featured
- **Impact page gallery** — the 6 most recent event cover photos

---

## Deployment (Vercel)

1. **Push to GitHub** (create a repo, `git push -u origin main`).

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the GitHub repo
   - Vercel auto-detects Next.js — accept defaults
   - Under **Environment Variables**, paste everything from your `.env.local`
   - Click **Deploy**

3. **Nonprofits**: apply for free Pro via Vercel's [nonprofit program](https://vercel.com/pricing) if you ever outgrow the free Hobby plan.

### Set up instant content revalidation (recommended)

By default, content refreshes every 60 seconds. For near-instant updates when
the team publishes in Studio, wire up the webhook:

1. **Generate a secret**:
   ```bash
   openssl rand -hex 32
   ```
2. Add it to Vercel Env Vars as `SANITY_WEBHOOK_SECRET` (redeploy after adding).
3. In **Sanity dashboard** → your project → **API** → **Webhooks** → **Create webhook**:
   - **Name**: Revalidate on publish
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Trigger**: Create, Update, Delete
   - **Filter**: `_type == "event"`
   - **Projection**: `{ "tag": "events" }`
   - **Secret**: paste the same secret you used in Vercel
   - **HTTP method**: POST
   - **API version**: `2025-01-01`
4. Save. Now publishing in Studio triggers an immediate revalidation of all
   event-related pages.

---

## Connecting your Network Solutions domain to Vercel

Your domain registration stays at Network Solutions; only the DNS records change.

1. In **Vercel** → your project → **Settings → Domains → Add Domain**. Enter
   your domain (e.g. `superstokedfoundation.org`).
2. Vercel will show you the required DNS records:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`
3. Log in to **Network Solutions → My Domain Names → Manage → Advanced DNS**:
   - Delete any existing `A` record on `@` that points elsewhere
   - **Add Record** → Type `A`, Host `@`, Value `76.76.21.21`
   - **Add Record** → Type `CNAME`, Host `www`, Value `cname.vercel-dns.com.`
4. Wait 5-60 minutes for DNS propagation. Vercel auto-issues a free SSL cert.

**Your Network Solutions hosting plan can stay active for email or become
redundant** — the website itself now serves entirely from Vercel.

---

## Editing static content (copy, tiers, FAQ, partners)

Not everything lives in Sanity — the more static content is in code so it's
version-controlled and instant. All text, stats, FAQ, partners, and donation
tiers live in [`src/lib/content.ts`](src/lib/content.ts). Edit, commit, push
— Vercel redeploys automatically.

Site-wide things (name, email, socials, nav) are in
[`src/lib/site.ts`](src/lib/site.ts).

**If you want these in Sanity too**, it's a one-hour follow-up — ask Claude
to duplicate the Event schema pattern for `Program`, `FAQItem`, `Partner`, etc.

---

## Configuring forms and donations

See `.env.local.example` for all env vars. Summary:

- **Formspree** — create forms at [formspree.io](https://formspree.io), paste the endpoint IDs
- **Donations** — any of Donorbox, Stripe Payment Link, or PayPal. Set the URLs; the Donate page renders a button per provider.

All are optional. Forms and donation buttons render clean fallbacks when blank.

---

## Accessibility & SEO

- Skip-to-content link, semantic HTML, focus rings, `prefers-reduced-motion`
- Per-page `<title>` + `<meta description>` + Open Graph tags
- Lightbox keyboard nav (arrow keys, Esc)
- Images served via Sanity's CDN with automatic WebP conversion
- All uploaded images require alt text in Studio (enforced by schema)

---

## Common tasks

| I want to…                  | Where to go                                       |
| --------------------------- | ------------------------------------------------- |
| Add a new event with photos | Studio at `/studio` → Event → New                 |
| Edit an FAQ                 | `src/lib/content.ts` → `faq` array                |
| Change a donation tier      | `src/lib/content.ts` → `donationTiers` array      |
| Update an impact stat       | `src/lib/content.ts` → `impactStats` array        |
| Add a new partner           | `src/lib/content.ts` → `partners` array           |
| Edit hero headline          | `src/components/home/Hero.tsx`                    |
| Change site colors          | `src/app/globals.css` → `@theme` block            |
| Invite team to Studio       | Sanity dashboard → your project → Members         |

---

## Getting help

- Website issues: open an issue in this repo, or ask Claude Code
- Foundation questions: hello@superstokedfoundation.org
- Sanity help: [sanity.io/docs](https://www.sanity.io/docs)

Built with care for coastal communities. 🌊
