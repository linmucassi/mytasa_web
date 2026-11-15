# TASA Website Development Roadmap

## Overview
This document tracks the planned features and development phases for the TASA website. Features are organized by priority and phase of development.

---

## 📌 Outstanding Work (consolidated — 15 Nov 2026)

Everything still open after the UI revamp, grouped by workstream. Items marked 🔴 are blockers for launch.

### 1. Sign-in & backend for logged-in activity 🔴
The UI and API routes exist, but nothing runs end-to-end yet.
- [ ] 🔴 Provision PostgreSQL (Supabase recommended), fill `.env.local`, run `prisma migrate dev` + `prisma generate` — until then every API route fails (`@/app/generated/prisma` is missing)
- [ ] 🔴 Build `/profile` — login and register already redirect there after success, so users currently land on a **404**
- [ ] 🔴 Build `/forgot-password` + `/reset-password` (+ `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`) — the "Forgot password?" link on `/login` currently **404s**
- [ ] Email verification on registration (token → verify route → `emailVerified`)
- [ ] Session handling: expiry, auto-logout, "remember me", show signed-in state in the Nav (avatar / logout instead of Login + Join)
- [ ] Member dashboard (`/profile`): edit details, change password, my branch, my RSVPs, my donations
- [ ] Link members to a branch (`User.branchId`) — register form should pick from the branch list instead of free text
- [ ] Roles & permissions: member / branch officer / provincial / national admin / superadmin
- [ ] Admin dashboard (`/admin`): events CRUD, branches + officers CRUD, contact inbox, newsletter subscribers, members
- [ ] Rate limiting + brute-force protection on `/api/auth/*`
- [ ] Rename `middleware.ts` → `proxy.ts` (Next.js 16 deprecation; dev server warns on every start)
- [ ] Audit log for admin actions

### 2. Contact Us — full flow 🔴
Current state: form saves to `ContactMessage` and fires two emails (acknowledgement to sender, notification to a single `CONTACT_NOTIFICATION_EMAIL`).
- [ ] 🔴 Configure SMTP + `CONTACT_NOTIFICATION_EMAIL`, then test the round trip
- [ ] Route by department — each department (Membership, Events, Branch Support, Donations, Media, Prayer Requests…) gets its own inbox
- [ ] Replace browser `alert()` errors on `/contact` with inline error states; disable the button + show "Sending…" while submitting
- [ ] Server-side validation (email format, length limits) and spam protection (honeypot / Turnstile / reCAPTCHA) + rate limiting
- [ ] Admin contact inbox: list, read/unread (`read` field already in schema), reply, assign, close
- [ ] Option to contact a **specific branch** from its `/branches/[slug]` page (routes to that branch's Secretary / PRO)
- [ ] Prayer requests: private handling + optional prayer-team notification
- [ ] Publish real national office details (phone, physical/postal address, office hours) on `/contact`

### 3. Image hosting — get photos out of the codebase 🔴
`public/assets/gallery/people` holds **~770 MB of originals** (210 photos) and `public/assets/gallery/web` ~35 MB of WebP copies. Anything in `public/` is deployed with the site and bloats the git repo.
- [ ] 🔴 Do **not** commit `public/assets/gallery/people` — add it to `.gitignore` now
- [ ] Choose a host: Cloudinary / Supabase Storage / Vercel Blob / S3 + CDN
- [ ] Upload originals there; serve resized versions via the host's transforms (or `next/image` with `images.remotePatterns` in `next.config.ts`)
- [ ] Replace `lib/gallery-manifest.json` + `scripts/optimize-images.mjs` with an albums table (`Gallery`) in the database
- [ ] Admin photo upload: albums (per event / branch / year), captions + alt text, cover photo
- [ ] Keep only UI assets (logos, icons) in the repo

### 4. Branches & campuses
21 branches listed in `lib/branches.ts`; every officer is "To be confirmed".
- [ ] 🔴 Full contact details for every branch: Chairperson, Secretary, PRO — name, phone, email (**get each officer's consent before publishing**; prefer role-based emails like `chair.uwc@mytasa.org`)
- [ ] Confirm or remove the 6 `// sample` entries (UWC, CPUT, UJ, UNISA, UKZN Westville, UMP)
- [ ] Add campus towns for NWU, UFS, NMU, WSU, UL
- [ ] **More campuses**: complete register of universities, TVET colleges and **high-school branches** in every province (Northern Cape currently has none listed)
- [ ] Meeting day / time / venue per branch, branch email, social links
- [ ] Map (Google Maps / OpenStreetMap) on each branch page + "near me"
- [ ] Move branches to the database + let branch officers update their own details
- [ ] Provincial executive contacts (per province) and national executive page

### 5. Events — future events data
- [ ] 🔴 Load real **upcoming** events — all 8 sample events (Feb–Jun 2026) are in the past, so the Upcoming tab is empty
- [ ] Switch `/events` from the hard-coded array to `GET /api/events` (database)
- [ ] `/events/[id]` detail page (agenda, speakers, venue map, add-to-calendar `.ics`)
- [ ] Admin event create/edit; branch officers can post branch events
- [ ] Filter by province / branch; link events ↔ gallery albums after the event
- [ ] RSVP management: capacity, waitlist, reminders, attendee export

### 6. Blog 🆕
The homepage shows three placeholder article cards ("Full blog platform coming soon").
- [ ] Choose approach: headless CMS (Sanity / Contentful / Strapi) **or** MDX in repo **or** database + admin editor
- [ ] `/blog` listing (categories: Faith, Academics, Leadership, Identity, Student life) + `/blog/[slug]` article page
- [ ] Authors (members / branch PROs), drafts → review → publish workflow
- [ ] Cover images (from the image host), reading time, share buttons, related posts
- [ ] RSS feed + SEO metadata / OG images per article
- [ ] Optional: comments (moderated)

### 7. Guides & docs for members 🆕
- [ ] Member handbook: who TASA is, constitution, CHRIST values, code of conduct, uniform/identity guide
- [ ] How-to guides: join a branch, register on the site, RSVP, update your profile, start a new branch (incl. high schools)
- [ ] Branch officer guides: Chairperson / Secretary / PRO responsibilities, meeting minutes templates, reporting
- [ ] Resources library (`/resources`): devotionals, Bible study guides, academic support, bursary info (TACC Educational Fund), health & wellness — with categories, search and PDF downloads
- [ ] Decide which docs are public vs members-only (behind sign-in)

### 8. Content still to confirm
- [ ] Stats on the homepage: "30+ years", "9+ provinces & international branches", "Students nationwide"
- [ ] Testimonials: real quotes with consent (current photos are illustrative, not the people quoted)
- [ ] Remove unused starter files in `public/` (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`)

### 9. Housekeeping
- [ ] Nothing from the UI revamp is committed yet (`git rm app/favicon.ico` is staged) — commit in logical chunks
- [ ] `npm run build` once the database client is generated (build currently can't type-check the API routes without it)
- [ ] SEO: per-page metadata, OG images, sitemap, robots
- [ ] Analytics + error monitoring

---

## Phase 1: Core Features (In Progress)

### ✅ Completed

#### Frontend
- [x] Homepage with hero section
- [x] Navigation menu (sticky, responsive with mobile hamburger)
- [x] About/Who We Are section
- [x] Vision, Mission, Motto display
- [x] CHRIST Values section
- [x] Developmental Focus Areas
- [x] Emblem Meaning section
- [x] Why Join TASA section
- [x] Weekly Activities schedule
- [x] Organizational Structure
- [x] Testimonials placeholder (2 example quotes)
- [x] Branches: province drop-down → branch contact pages (see UI Revamp)
- [x] Gallery: 208-photo slideshow (see UI Revamp)
- [x] Resources placeholder (3 categories)
- [x] Blog placeholder (3 article teasers)
- [x] Footer with social links (multi-column layout)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Shared Nav + Footer in root layout (`app/layout.tsx`)
- [x] Newsletter signup form component
- [x] `/events` — Events listing, All/Upcoming/Past tabs, category filters, RSVP modal → wired to API
- [x] `/contact` — Contact form with department routing + FAQ → wired to API
- [x] `/login` — Member login page → wired to `/api/auth/login`
- [x] `/register` — Two-step registration → wired to `/api/auth/register`

#### UI Revamp (2026-11-15)
- [x] New design system in `app/globals.css`: royal blue / gold / ink / paper tokens; Tailwind `blue`, `yellow`, `gray` scales remapped to the brand
- [x] Typography: Bricolage Grotesque (display) + Geist (body) + Geist Mono (section labels)
- [x] Real National Conference photography replaces all picsum placeholders (`lib/gallery.ts`)
- [x] `scripts/optimize-images.mjs` — converts originals in `public/assets/gallery/people` (~770 MB) to web WebP in `public/assets/gallery/web` (~35 MB for 207 photos) + watermark-free hero crop; re-run after adding photos
- [x] Homepage rebuilt: inset photo hero, marquee, bento Vision/Mission/Motto, dark CHRIST values panel, photo pillar cards, weekly rhythm, pill photo mosaic, structure steps, photo testimonials, branches panel, gallery slideshow, partner logos (TACC, Educational Fund)
- [x] New shared components: `Logo`, `Arrow`, `Reveal` (scroll fade-in), `Marquee`, `PageHero`, `AuthShell`, `GallerySlider`, `ProvinceBranches`
- [x] Floating pill nav with full-screen mobile menu; dark footer with giant wordmark; photo newsletter CTA
- [x] `/events`, `/contact` — photo page heroes, ticket-style event cards, FAQ accordion
- [x] `/login`, `/register` — split-screen photo layout
- [x] Respects `prefers-reduced-motion`; `<noscript>` fallback for reveal animations
- [x] Official TASA emblem (`public/assets/logos/main-logo.v1.png`) used site-wide: nav/footer wordmark, emblem-meaning section, auth pages. Cleaned copy at `public/assets/logos/web/tasa-emblem.png` (black backdrop removed; regenerate with `node scripts/optimize-images.mjs emblem`)
- [x] Favicon + Apple touch icon generated from the emblem (`app/icon.png`, `app/apple-icon.png`); default `app/favicon.ico` removed
- [x] Partner strip: TACC (mother church) and TACC Educational Fund (run jointly by TACC & TASA)
- [x] Content pass: hero "Students nationwide" pill links to `/#gallery`; hero shows "Est. 1993" only; stat "9+ provinces"; group photo in CHRIST values; "Student-led, church-guided" badge no longer overlaps the photo
- [x] TASA in High Schools: mentioned in About + Branches (dedicated card); register form accepts "High School learner" and school as institution
- [x] Events: upcoming vs past is now computed from the event's (end) date instead of a hard-coded flag; past events show "RSVPs closed" and the RSVP handler refuses them (API already rejects past dates)
- [x] Branch directory: homepage province drop-down (`app/components/ProvinceBranches.tsx`) → `/branches/[slug]` contact page with Chairperson, Secretary and PRO (`app/branches/[slug]/page.tsx`), data in `lib/branches.ts`
  - [x] Branches added: UP, TUT (Soshanguve North & South, Pretoria Main, Arcadia), VUT · TUT eMalahleni & Mbombela · NWU · UFS · NMU, WSU · UL · Lesotho (21 branches total)
  - [ ] Confirm or remove the 6 earlier `// sample` entries (UWC, CPUT, UJ, UNISA, UKZN Westville, UMP); add campus towns for NWU, UFS, NMU, WSU, UL
  - [ ] **Fill officer names / phones / emails** in `lib/branches.ts` (all currently "To be confirmed")
  - [ ] Move branches to the database (`branches` table per `.claude/docs/DATABASE_SCHEMA.md`) + admin editing
- [x] Gallery is now a slideshow (`app/components/GallerySlider.tsx`): 208 photos (highlights first, then all conference photos), autoplay with pause, day filter, thumbnail strip, full screen. Photos come from `lib/gallery-manifest.json`, regenerated by `node scripts/optimize-images.mjs` (now incremental — only converts new photos)
- [x] Events tabs are now **All / Upcoming / Past** (default All: upcoming soonest-first, then past most-recent-first); category filters unchanged

#### Backend
- [x] Prisma 7 initialised with PostgreSQL provider (`prisma/schema.prisma`)
- [x] Database schema: `User`, `Event`, `EventRSVP`, `NewsletterSubscriber`, `ContactMessage`
- [x] `lib/db.ts` — Prisma client singleton (hot-reload safe)
- [x] `lib/auth.ts` — JWT sign/verify, HttpOnly cookie helpers (uses `jose`)
- [x] `lib/email.ts` — Nodemailer transporter + email templates (welcome, RSVP, contact, newsletter)
- [x] `lib/api.ts` — Shared Route Handler response helpers
- [x] `POST /api/auth/register` — register + set auth cookie
- [x] `POST /api/auth/login` — authenticate + set auth cookie
- [x] `POST /api/auth/logout` — clear auth cookie
- [x] `GET  /api/auth/me` — return current user from JWT
- [x] `GET  /api/events` — paginated event list with category/province/upcoming filters
- [x] `POST /api/events` — admin-only event creation
- [x] `GET  /api/events/[id]` — single event with RSVP count
- [x] `POST /api/events/[id]/rsvp` — create RSVP, fire confirmation email
- [x] `POST /api/contact` — save contact message, send acknowledgement + team notification
- [x] `POST /api/newsletter` — subscribe (with re-subscribe support)
- [x] `GET  /api/newsletter` — one-click unsubscribe via email link
- [x] `middleware.ts` — JWT-based route protection for `/profile`, `/admin`; redirect authenticated users away from `/login`, `/register`
- [x] `.env.local.example` — environment variable template with inline comments

### 🚀 Upcoming Phase 1 Features

#### Database Setup (Required to Run Backend)
- [ ] Provision a PostgreSQL database (Supabase / Railway / local Docker)
- [ ] Copy `.env.local.example` → `.env.local` and fill in `DATABASE_URL`
- [ ] Run `prisma migrate dev --name init` to apply schema
- [ ] Run `prisma generate` to generate the Prisma client

#### Authentication — Remaining
- [ ] Email verification on registration (send token → verify route)
- [ ] Password reset flow: `/forgot-password` page → `POST /api/auth/forgot-password` → email link → `/reset-password` page → `POST /api/auth/reset-password`
- [ ] User profile page (`/profile`) — view & edit account details
- [ ] Change password flow (from profile)
- [ ] Session expiry handling (auto-logout + redirect)

#### Events Module — Remaining
- [ ] Load events from database (replace mock data in `/events`)
- [ ] Individual event detail page (`/events/[id]`)
- [ ] Admin: event creation UI (form at `/admin/events/new`)
- [ ] Admin: event list & edit (`/admin/events`)
- [ ] Past events with gallery integration

#### Newsletter
- [ ] Configure SMTP credentials in `.env.local`
- [ ] Test welcome and confirmation emails end-to-end
- [ ] Unsubscribe link validation

#### Contact
- [ ] Configure `CONTACT_NOTIFICATION_EMAIL` in `.env.local`
- [ ] Test contact form email routing

#### Donations & Resource Mobilisation (Backend)
- [ ] Donation form integration
- [ ] Payment gateway (Stripe / PayPal)
- [ ] Donation tracking dashboard
- [ ] Resource mobilisation requests
- [ ] Fundraising campaigns

---

## Phase 2: Community Features

### Testimonials
- [ ] Testimonial submission form
- [ ] Admin approval workflow
- [ ] Testimonial display carousel (replace placeholder)
- [ ] Member showcase/spotlight
- [ ] Video testimonials support

### Branches Directory
- [x] National branch listing (province drop-down on homepage)
- [x] Provincial branch listings
- [x] Individual branch pages (`/branches/[slug]`) with:
  - [x] Contact information layout (Chairperson, Secretary, PRO) — **data still to be filled**, see Outstanding §4
  - [ ] Location/maps integration
  - [x] Leadership team (officer cards)
  - [ ] Meeting schedules
  - [ ] Local events

### Gallery
- [ ] Photo gallery upload (admin)
- [ ] Album organisation (per event / branch / year) — see Outstanding §3
- [ ] Categories: Church services, Conferences, Outreach, Sports, Social, Leadership training
- [ ] Video integration (YouTube embeds)
- [x] Slideshow with full-screen viewer, keyboard navigation, day filter (`app/components/GallerySlider.tsx`)
- [x] Homepage gallery uses all real conference photos (16 highlights + full set from `lib/gallery-manifest.json`)

---

## Phase 3: Information & Content

### Resources Library
- [ ] Devotionals & daily reflections (replace placeholder) — see Outstanding §7
- [ ] Bible study guides, academic support, health awareness, financial literacy modules
- [ ] Resource categories & search, PDF downloads

### Blog & Articles
- [ ] Blog platform (replace placeholder) — see Outstanding §6
- [ ] Categories: Faith, Academics, Leadership, Identity, Student life
- [ ] Author profiles, comments, social sharing

---

## Phase 4: Engagement & Support

### Contact & Support
- [x] Contact form with department routing (UI + API)
- [x] FAQ section
- [ ] Full contact flow (department routing, inbox, spam protection) — see Outstanding §2
- [ ] Full ticketing system
- [ ] Chatbot for common questions

### Additional Features
- [ ] Member directory (private, authenticated only)
- [ ] Discussion forums
- [ ] Mentorship matching
- [ ] Job board for student opportunities

---

## Technical Requirements

### Backend (Status)
- [x] Prisma 7 ORM + PostgreSQL schema
- [x] JWT authentication (`jose`)
- [x] Email service (`nodemailer`) — configured, SMTP creds needed
- [x] Route Handlers for all Phase 1 features
- [x] Middleware for auth-protected routes
- [ ] Rename `middleware.ts` → `proxy.ts` (Next.js 16 deprecated the "middleware" convention; dev server warns)
- [ ] Database provisioned and migrated
- [ ] Image hosting outside the repo + upload (Cloudinary / Supabase Storage / Vercel Blob / S3) — see Outstanding §3
- [ ] Payment processing (Stripe / PayPal)
- [ ] Admin dashboard

### Frontend (Status)
- [x] `/` — Full homepage
- [x] `/events` — Listing with filters and RSVP (API-wired)
- [x] `/contact` — Contact form (API-wired)
- [x] `/login` — Login (API-wired)
- [x] `/register` — Two-step registration (API-wired)
- [ ] `/events/[id]` — Event detail page
- [ ] `/profile` — User dashboard
- [ ] `/admin` — Admin dashboard
- [ ] `/forgot-password` — Password reset request
- [ ] `/reset-password` — Password reset form
- [x] `/branches/[slug]` — Branch contact page
- [ ] `/testimonials`, `/gallery` (albums), `/resources`, `/blog`, `/blog/[slug]`

### DevOps & Deployment
- [ ] Environment configuration (`.env.local` populated)
- [ ] Prisma migrations applied to production DB
- [ ] CI/CD pipeline setup
- [ ] Performance monitoring
- [ ] SEO optimisation (meta tags, OG images per page)
- [ ] Analytics integration

---

## Priority Matrix

### Immediate — launch blockers
1. Provision PostgreSQL, fill `.env.local`, migrate + generate (Outstanding §1)
2. `/profile`, `/forgot-password`, `/reset-password` — fixes the 404s after sign-in (§1)
3. Move gallery originals out of the repo / `.gitignore` them (§3)
4. Configure SMTP; finish the Contact Us flow (§2)
5. Real upcoming events + branch officer contact details (§4, §5)

### High Priority (next sprint)
1. Email verification, session handling, signed-in Nav state
2. Load events from the database; `/events/[id]`
3. Admin dashboard: events, branches/officers, contact inbox
4. Image hosting + admin photo upload

### Medium Priority
1. Blog platform (§6)
2. Member guides & resources library (§7)
3. More campuses incl. high schools; branch maps (§4)
4. Real testimonials

### Low Priority
1. Donations / payments
2. Discussion forums, mentorship, job board

---

## Estimated Timeline

| Phase | Duration | Target Month |
|-------|----------|--------------|
| Phase 1 | 6–8 weeks | June 2026 |
| Phase 2 | 8–10 weeks | August 2026 |
| Phase 3 | 6–8 weeks | October 2026 |
| Phase 4 | 4–6 weeks | November 2026 |

> ⚠️ These original targets have passed — re-baseline the timeline against the Outstanding Work list above.

---

## Developer Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill environment variables
cp .env.local.example .env.local
# Edit .env.local with your DATABASE_URL, JWT_SECRET, and SMTP credentials

# 3. Generate Prisma client (needed before first run)
npx prisma generate

# 4. Apply database schema
npx prisma migrate dev --name init

# 5. Start dev server
npm run dev
```

> **Note on npm on Windows:** If `npx` is not in your PATH, use the full path:
> `"C:\Program Files\nodejs\npx.cmd" prisma generate`

---

## Notes

- All dates are estimates and subject to change
- Security and data privacy are paramount — passwords hashed with bcrypt (12 rounds), JWTs stored in HttpOnly cookies
- Mobile responsiveness required for all pages
- Accessibility (WCAG 2.1) must be maintained

---

**Last Updated:** November 15, 2026
**Next Review Date:** December 1, 2026
**Status:** Active Development — UI revamp complete (design system, gallery, branches, events); next: database + sign-in backend, image hosting, contact flow, real content (see Outstanding Work)
