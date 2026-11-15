# TASA Website Development Roadmap

## Overview
This document tracks the planned features and development phases for the TASA website. Features are organized by priority and phase of development.

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
- [x] Branches placeholder (province grid)
- [x] Gallery placeholder (6 images)
- [x] Resources placeholder (3 categories)
- [x] Blog placeholder (3 article teasers)
- [x] Footer with social links (multi-column layout)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Shared Nav + Footer in root layout (`app/layout.tsx`)
- [x] Newsletter signup form component
- [x] `/events` — Events listing, upcoming/past tabs, category filters, RSVP modal → wired to API
- [x] `/contact` — Contact form with department routing + FAQ → wired to API
- [x] `/login` — Member login page → wired to `/api/auth/login`
- [x] `/register` — Two-step registration → wired to `/api/auth/register`

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
- [ ] National branch listing (replace placeholder grid)
- [ ] Provincial branch listings
- [ ] Individual branch portals with:
  - [ ] Contact information
  - [ ] Location/maps integration
  - [ ] Leadership team
  - [ ] Meeting schedules
  - [ ] Local events

### Gallery
- [ ] Photo gallery upload (admin)
- [ ] Album organisation (replace placeholder)
- [ ] Categories: Church services, Conferences, Outreach, Sports, Social, Leadership training
- [ ] Video integration (YouTube embeds)
- [ ] Image lightbox/viewer

---

## Phase 3: Information & Content

### Resources Library
- [ ] Devotionals & daily reflections (replace placeholder)
- [ ] Bible study guides, academic support, health awareness, financial literacy modules
- [ ] Resource categories & search, PDF downloads

### Blog & Articles
- [ ] Blog platform (replace placeholder)
- [ ] Categories: Faith, Academics, Leadership, Identity, Student life
- [ ] Author profiles, comments, social sharing

---

## Phase 4: Engagement & Support

### Contact & Support
- [x] Contact form with department routing (UI + API)
- [x] FAQ section
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
- [ ] Database provisioned and migrated
- [ ] Image upload & storage (Cloudinary / AWS S3)
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
- [ ] `/testimonials`, `/branches`, `/gallery`, `/resources`, `/blog`

### DevOps & Deployment
- [ ] Environment configuration (`.env.local` populated)
- [ ] Prisma migrations applied to production DB
- [ ] CI/CD pipeline setup
- [ ] Performance monitoring
- [ ] SEO optimisation (meta tags, OG images per page)
- [ ] Analytics integration

---

## Priority Matrix

### Immediate (Database + Config)
1. Provision PostgreSQL (Supabase recommended for quick start)
2. Fill `.env.local` from `.env.local.example`
3. Run `prisma migrate dev --name init` + `prisma generate`
4. Configure SMTP for emails

### High Priority (Next Sprint)
1. Email verification on registration
2. Password reset flow
3. `/profile` page
4. Load real events from DB (replace mock data)

### Medium Priority
1. `/events/[id]` detail page
2. Testimonials, branches, gallery (real content)
3. Admin dashboard (events CRUD)

### Low Priority
1. Blog platform
2. Resources library
3. Discussion forums, mentorship, job board

---

## Estimated Timeline

| Phase | Duration | Target Month |
|-------|----------|--------------|
| Phase 1 | 6–8 weeks | June 2026 |
| Phase 2 | 8–10 weeks | August 2026 |
| Phase 3 | 6–8 weeks | October 2026 |
| Phase 4 | 4–6 weeks | November 2026 |

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

**Last Updated:** April 6, 2026
**Next Review Date:** May 4, 2026
**Status:** Active Development — Phase 1 backend scaffold complete; database provisioning and email config next
