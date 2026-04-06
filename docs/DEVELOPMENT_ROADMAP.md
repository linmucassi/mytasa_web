# TASA Website Development Roadmap

## Overview
This document tracks the planned features and development phases for the TASA website. Features are organized by priority and phase of development.

---

## Phase 1: Core Features (In Progress)

### ✅ Completed
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
- [x] Testimonials placeholder
- [x] Branches placeholder (province grid)
- [x] Gallery placeholder
- [x] Resources placeholder
- [x] Blog placeholder
- [x] Footer with social links (rich multi-column layout)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Shared Nav component extracted to layout (all pages)
- [x] Shared Footer component extracted to layout (all pages)
- [x] Newsletter signup form component
- [x] `/events` — Events listing page with category filters, upcoming/past tabs, RSVP modal
- [x] `/contact` — Contact form with department routing and FAQ section
- [x] `/login` — Member login page (UI complete; backend pending)
- [x] `/register` — Two-step member registration (UI complete; backend pending)

### 🚀 Upcoming Phase 1 Features

#### Authentication & User Management (Backend Required)
- [ ] Authentication backend (JWT / session-based)
- [ ] Email verification on registration
- [ ] Password reset flow (forgot password → email link → reset)
- [ ] User profile page (`/profile`)
- [ ] Protected route middleware

#### Events Module (Backend Required)
- [ ] Events stored in database (PostgreSQL / MongoDB)
- [ ] Admin: event creation & management dashboard
- [ ] RSVP persisted to database + confirmation email
- [ ] Event filtering by Province / Branch / Category / Date range
- [ ] Full calendar view integration
- [ ] Past events with gallery integration
- [ ] Individual event detail page (`/events/[id]`)

#### Newsletter & Communication (Backend Required)
- [ ] Newsletter signup connected to email service (SendGrid / Nodemailer)
- [ ] Email subscription management (unsubscribe flow)
- [ ] Newsletter template system
- [ ] Automated event reminder emails

#### Donations & Resource Mobilisation (Backend Required)
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
- [ ] Individual branch portals
- [ ] Branch profiles with:
  - [ ] Contact information
  - [ ] Location/maps integration
  - [ ] Leadership team
  - [ ] Meeting schedules
  - [ ] Local events
- [ ] Branch-specific directories

### Gallery
- [ ] Photo gallery upload (admin)
- [ ] Album organisation (replace placeholder)
- [ ] Categories:
  - [ ] Church services
  - [ ] Conferences
  - [ ] Outreach events
  - [ ] Sports activities
  - [ ] Social events
  - [ ] Leadership training
- [ ] Video integration (YouTube embeds)
- [ ] Image lightbox/viewer
- [ ] Download options for members

---

## Phase 3: Information & Content

### Resources Library
- [ ] Devotionals & daily reflections (replace placeholder)
- [ ] Bible study guides
- [ ] Academic support materials
- [ ] Health awareness resources
- [ ] Financial literacy modules
- [ ] Leadership development guides
- [ ] Member handbook
- [ ] Resource categories & search
- [ ] PDF downloads
- [ ] Print-friendly versions

### Blog & Articles
- [ ] Blog platform with:
  - [ ] Article creation & editing
  - [ ] Categories (replace placeholder):
    - [ ] Faith & spirituality
    - [ ] Academic excellence
    - [ ] Leadership development
    - [ ] Identity & cultural issues
    - [ ] Student life
  - [ ] Search functionality
  - [ ] Archive by date
- [ ] Author profiles
- [ ] Comments & engagement
- [ ] Social sharing buttons
- [ ] Featured articles section

---

## Phase 4: Engagement & Support

### Contact & Support
- [x] Contact form with department routing (UI complete)
- [x] FAQ section (initial set complete)
- [ ] Contact backend — route submissions to email / ticketing system
- [ ] Contact directory expanded by department
- [ ] Chatbot for common questions
- [ ] Full ticketing system for inquiries

### Additional Features
- [ ] Member directory (private, logged-in only)
- [ ] Discussion forums
- [ ] Mentorship matching
- [ ] Job board for student opportunities
- [ ] Academic partnership information
- [ ] Partner organisation listings

---

## Technical Requirements

### Backend (To Be Implemented)
- [ ] Database setup (PostgreSQL / MongoDB)
- [ ] API endpoints for all features
- [ ] Authentication system (JWT / session)
- [ ] Image upload & storage (Cloudinary / AWS S3)
- [ ] Email service (SendGrid / Nodemailer)
- [ ] Payment processing (Stripe / PayPal)
- [ ] Admin dashboard

### Frontend (Current Status)
- [x] `/` — Homepage (all sections)
- [x] `/events` — Events listing with filters and RSVP
- [x] `/contact` — Contact form
- [x] `/login` — Login page
- [x] `/register` — Two-step registration
- [ ] `/events/[id]` — Event detail page
- [ ] `/testimonials` — Testimonials display
- [ ] `/branches` — Branch directory
- [ ] `/gallery` — Photo/video gallery
- [ ] `/resources` — Resources library
- [ ] `/blog` — Blog listing
- [ ] `/blog/[slug]` — Article detail
- [ ] `/profile` — User dashboard
- [x] Shared Nav and Footer in root layout
- [x] Newsletter signup component
- [ ] Component library for common UI
- [x] Form validation (client-side, steps 1 & 2 of registration)
- [ ] Server-side form validation
- [ ] Error handling & user feedback (toast/notification system)

### DevOps & Deployment
- [ ] Environment configuration (`.env.local` + `.env.production`)
- [ ] CI/CD pipeline setup
- [ ] Database migrations
- [ ] Backup & disaster recovery
- [ ] Performance monitoring
- [ ] SEO optimisation (meta tags, OG images per page)
- [ ] Analytics integration

---

## Priority Matrix

### High Priority (Next)
1. Backend: Authentication system (JWT + email verification)
2. Backend: Database + Events API
3. Backend: Contact form email routing
4. Backend: Newsletter subscription (SendGrid)

### Medium Priority (Following)
1. `/events/[id]` — Event detail page
2. Testimonials section (real content + carousel)
3. Branches directory (full data)
4. Gallery module (albums)

### Low Priority (Later)
1. Blog platform
2. Resources library
3. Discussion forums
4. Advanced features (mentorship, job board)

---

## Estimated Timeline

| Phase | Duration | Target Month |
|-------|----------|--------------|
| Phase 1 | 6–8 weeks | June 2026 |
| Phase 2 | 8–10 weeks | August 2026 |
| Phase 3 | 6–8 weeks | October 2026 |
| Phase 4 | 4–6 weeks | November 2026 |

---

## Setup Instructions (For Developers)

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Create backend API (separate project or Next.js Route Handlers)
5. Configure environment variables (`.env.local`)
6. Set up database
7. Deploy to Vercel or your hosting provider

---

## Notes

- All dates are estimates and subject to change based on resource availability
- Community feedback from members may reprioritise features
- Security and data privacy are paramount for all features
- Mobile responsiveness required for all pages
- Accessibility (WCAG 2.1) must be maintained

---

**Last Updated:** April 6, 2026
**Next Review Date:** May 4, 2026
**Status:** Active Development — Phase 1 frontend scaffold complete; backend implementation next
