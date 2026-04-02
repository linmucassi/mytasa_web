# TASA Website - Project Structure

## Overview
TASA (Twelve Apostles' Students Association) website built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Directory Layout

```
mytasa/web/
├── .claude/                     # AI/Claude development support
├── .next/                       # Next.js build output (git-ignored)
├── app/                         # Next.js App Router
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage component
│   ├── globals.css             # Global styles
│   ├── favicon.ico             # Site icon
│   └── (future routes)         # Additional pages
├── public/                      # Static assets
│   ├── assets/                 # Custom images/files
│   └── *.svg                   # SVG assets
├── docs/                       # Project documentation
│   └── DEVELOPMENT_ROADMAP.md  # Feature tracking
├── node_modules/               # Dependencies (git-ignored)
├── package.json                # Dependencies & scripts
├── package-lock.json           # Dependency lock
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
├── postcss.config.mjs          # PostCSS config
├── tailwind.config.ts          # Tailwind CSS config
├── eslint.config.mjs           # ESLint configuration
├── README.md                   # Project README
├── .gitignore                  # Git ignore rules
├── AGENTS.md                   # GitHub Copilot agents
├── CLAUDE.md                   # Claude instructions
└── .env.local                  # Local environment variables
```

## App Structure (app/)

### Current Structure
- **layout.tsx** - Root layout with HTML, metadata, fonts
- **page.tsx** - Homepage with all content sections
- **globals.css** - Global styles and Tailwind imports

### Future Structure (Planned)
```
app/
├── (auth)/                     # Authentication routes
│   ├── login/page.tsx         # Login page
│   ├── register/page.tsx      # Registration page
│   └── profile/page.tsx       # User profile
├── events/
│   ├── page.tsx               # Events listing
│   └── [id]/page.tsx          # Event detail
├── branches/
│   ├── page.tsx               # Branches directory
│   └── [slug]/page.tsx        # Branch detail
├── gallery/page.tsx           # Photo/video gallery
├── resources/page.tsx         # Resources library
├── blog/
│   ├── page.tsx               # Blog listing
│   └── [slug]/page.tsx        # Article detail
├── testimonials/page.tsx      # Testimonials
├── contact/page.tsx           # Contact form
└── api/                       # API routes
    ├── auth/
    ├── events/
    ├── branches/
    ├── gallery/
    └── contact/
```

## Key Technologies

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **Package Manager**: npm
- **Node Version**: 20+

## Color Scheme

```
Primary: Blue (#1e40af / #1d4ed8)
Accent: Yellow/Gold (#d4af37 / #eab308)
Dark: Gray (#1f2937 / #374151)
Light: White (#ffffff)
Background: White (#ffffff)
```

## Configuration Files

### tsconfig.json
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Path alias: `@/*` → `./`

### next.config.ts
- Image optimization
- ESLint on build
- React compiler (optional)

### tailwind.config.ts
- Standard Tailwind preset
- Extended colors (brand colors)
- Custom fonts

## Component Organization

### Layout Components
- Navigation (sticky header)
- Footer (with social links)
- Section wrappers

### Content Components
- Hero section
- Card components (vision, mission, etc.)
- Grid layouts
- Form elements

## Styling Approach

- **Tailwind Classes**: Primary styling method
- **CSS-in-JS**: Inline styles only when necessary
- **Global CSS**: Minimal, only essential globals
- **Responsive**: Mobile-first design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Build & Deploy

### Development
```bash
npm run dev
# Runs on http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Deployment
- Primary: Vercel (recommended for Next.js)
- Alternative: Docker, traditional servers

## File Naming Conventions

- **Pages**: `page.tsx` (Next.js standard)
- **Components**: `ComponentName.tsx` (PascalCase)
- **Utilities**: `utilityName.ts` (camelCase)
- **Styles**: Global CSS in `globals.css`

## SEO & Metadata

- Metadata defined in `layout.tsx`
- Title: "TASA | Evolution Through Christ"
- Description: Organization mission statement
- Open Graph tags (future enhancement)

## Performance

- Static generation for homepage
- Image optimization via Next.js
- CSS minification via Tailwind
- No external UI libraries (size conscious)

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Color contrast compliance
- Keyboard navigation support

## Git Workflow

- `main` - Production-ready code
- Feature branches: `feature/feature-name`
- Bug fixes: `bugfix/issue-name`
- Releases: `release/v1.0.0`

## Environment Variables

See `.claude/config/.env.example` for template.

```
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_API_URL=backend-url
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
```

## Next Steps

1. Review [ARCHITECTURE.md](ARCHITECTURE.md) for system design
2. Check [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for data models
3. Read [API_SPEC.md](API_SPEC.md) for backend plan
4. Reference [DEPLOYMENT.md](DEPLOYMENT.md) for hosting

---

**Last Updated**: April 2, 2026  
**Next.js Version**: 16.2.2  
**Node Version**: 20+
