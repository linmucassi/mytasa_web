# TASA - Twelve Apostles' Students Association Website

This is a modern Next.js application for the TASA website, built with:
- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS**

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page with all sections
│   ├── globals.css      # Global styles
│   └── favicon.ico      # Site icon
├── public/              # Static assets (images, etc.)
│   └── assets/          # Custom assets folder
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Getting Started

### Installation
```bash
npm install
```

### Development
Start the development server:
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
Build for production:
```bash
npm run build
npm start
```

## Features

✨ **Complete TASA Website** with sections:
- Hero Banner with Call-to-Action buttons
- About & History
- Vision, Mission, Motto
- CHRIST Core Values
- Developmental Focus Areas
- Emblem Meaning
- Why Join TASA
- Weekly Activities Schedule
- Organizational Structure
- Social Media Links
- Responsive Navigation

🎨 **Styling**: Tailwind CSS with custom color scheme:
- Primary: Red (#9C1C1C)
- Accent: Gold (#D4AF37)
- Dark: #1A2A44
- Light: #F8F5F0

📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop

⚡ **Performance**:
- Static page generation for fast loads
- Image optimization via Next.js
- CSS minification via Tailwind

## Adding Custom Assets

Place your images and files in the `public/` directory:
- `public/assets/` - Your custom images and files
- Reference them in components as `/assets/filename`

Example:
```tsx
<img src="/assets/my-image.jpg" alt="Description" />
```

## Customization

### Colors
Edit the Tailwind color references in [app/page.tsx](app/page.tsx) to change:
- Red text: `text-red-700`
- Gold text: `text-yellow-500`
- Dark background: `bg-gray-900`

### Sections
All website sections are in [app/page.tsx](app/page.tsx) as React components. Edit HTML/JSX directly.

### Fonts
Fonts are configured in [app/layout.tsx](app/layout.tsx). Currently using system fonts via Tailwind.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Environment Variables

No environment variables needed for basic functionality.

## Deployment

### Vercel (Recommended)
Deploy directly from GitHub:
1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Vercel automatically builds and deploys on push

### Other Platforms

**Docker**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Traditional Server**: Build and run with `npm run build && npm start`

## Technologies

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

## License

© 2026 TASA. All rights reserved.

---

**For more help**: Visit the [Next.js documentation](https://nextjs.org/docs) or create an issue in your repository.
