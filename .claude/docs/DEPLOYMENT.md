# TASA Website - Deployment Guide

## Overview

This document covers deployment strategies for the TASA website across different environments and hosting providers.

## Recommended Hosting: Vercel

Vercel is the official Next.js hosting platform and recommended for this project.

### Vercel Deployment Steps

#### 1. Prerequisites
- Repository on GitHub
- Vercel account (free)
- GitHub account with repo access

#### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select GitHub and authorize
4. Import the `mytasa/web` repository
5. Vercel auto-detects Next.js framework

#### 3. Configure Environment Variables

In Vercel Dashboard:
```
1. Go to Project Settings → Environment Variables
2. Add variables from .env.example
3. Critical variables:
   - NEXT_PUBLIC_SITE_URL = https://yourdomain.com
   - DATABASE_URL = PostgreSQL connection string
   - JWT_SECRET = 32+ character random string
   - All API keys (Stripe, SendGrid, etc.)
```

#### 4. Deploy

```bash
# Automatic deployment
git push origin main  # Triggers Vercel auto-deploy

# Manual deployment
vercel --prod
```

### Custom Domain Setup

1. **Update Domain DNS**:
   ```
   Type: CNAME
   Name: @ or www
   Value: cname.vercel.sh
   ```

2. **Vercel Dashboard**:
   - Settings → Domains
   - Add your domain
   - Verify DNS configuration

3. **SSL Certificate**:
   - Automatic (free Let's Encrypt)
   - Applied within 24-48 hours

---

## Alternative Hosting Options

### Docker (Self-Hosted)

#### Create Dockerfile

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Docker Configuration

```dockerfile
# .dockerignore
.git
.next
node_modules
npm-debug.log
.env
.env.local
public/uploads
```

#### Build and Run

```bash
# Build image
docker build -t tasa-web:1.0.0 .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e NEXT_PUBLIC_SITE_URL=https://mytasa.org \
  tasa-web:1.0.0

# Using docker-compose
docker-compose up
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.9'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://user:pass@postgres:5432/tasa_db
      NEXT_PUBLIC_SITE_URL: https://mytasa.org
    depends_on:
      - postgres

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: tasa_user
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: tasa_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### AWS Deployment (Amplify / ECS)

#### AWS Amplify

1. **Connect Repository**:
   ```bash
   amplify init
   amplify hosting add
   ```

2. **Build Settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Deploy**:
   ```bash
   amplify publish
   ```

---

## Database Deployment

### PostgreSQL Setup

#### Vercel Postgres (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Create Postgres database
vercel postgres create

# Get connection string
vercel env pull
```

#### Self-Hosted PostgreSQL

```bash
# Using Docker
docker run -d \
  --name postgres \
  -e POSTGRES_USER=tasa_user \
  -e POSTGRES_PASSWORD=secure_pass \
  -e POSTGRES_DB=tasa_db \
  -p 5432:5432 \
  postgres:15-alpine

# Using managed service (AWS RDS, DigitalOcean, etc.)
# Follow provider's instructions
```

### Database Migrations

```bash
# Using Prisma
npx prisma migrate deploy

# Using TypeORM
npm run typeorm migration:run

# Using Raw SQL
psql -U user -d database -f migrations/001_initial.sql
```

---

## Redis Caching (Optional)

#### Vercel Redis

```bash
vercel redis create
```

#### Docker Redis

```yaml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data
```

#### Configuration

```typescript
// lib/redis.ts
import { Redis } from '@vercel/redis';

const redis = new Redis({
  url: process.env.REDIS_URL,
});

export default redis;
```

---

## CDN & Static Assets

### Cloudflare CDN

1. **Update Nameservers**:
   - Point domain DNS to Cloudflare
   - This provides:
     - Global CDN
     - DDoS protection
     - Free SSL

2. **Cloudflare Settings**:
   ```
   - Auto Minify: CSS, JS, HTML
   - Brotli Compression
   - Cache Level: Cache Everything
   - Browser Cache TTL: 1 year
   ```

### AWS CloudFront

```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name app.vercel.sh \
  --region us-east-1
```

---

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs

# Initialize in app layout
```

### LogRocket (Session Replay)

```bash
npm install logrocket

# Initialize in browser
```

### Vercel Analytics

Built-in:
```
Vercel Dashboard → Analytics
- Web Vitals
- Page Performance
- Real User Monitoring
```

---

## Continuous Deployment (CI/CD)

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Automatic Preview Deployments

Vercel automatically creates preview deployments for:
- Pull Requests
- Feature branches
- Commits to non-main branches

---

## Backup & Disaster Recovery

### Database Backups

```bash
# Daily PostgreSQL dumps
0 2 * * * pg_dump -h localhost -U user -d tasa_db | gzip > /backups/tasa_$(date +\%Y\%m\%d).sql.gz

# Upload to S3
aws s3 cp /backups/tasa_*.sql.gz s3://tasa-backups/
```

### Storage Backups

- **S3 Versioning**: Enable for object storage
- **Lifecycle Policies**: Archive old backups to Glacier
- **Cross-region Replication**: For disaster recovery

---

## Security Checklist

Before Production:

```
[ ] SSL/TLS enabled (HTTPS)
[ ] Environment variables secured
[ ] Database credentials protected
[ ] API keys rotated
[ ] CORS properly configured
[ ] Rate limiting enabled
[ ] Input validation active
[ ] SQL injection prevention
[ ] XSS protection enabled
[ ] CSRF tokens implemented
[ ] Security headers set:
    - X-Frame-Options
    - X-Content-Type-Options
    - Strict-Transport-Security
[ ] Regular security audits
[ ] Dependency updates current
[ ] Backup system tested
[ ] Error logging configured
[ ] WAF (Web Application Firewall) enabled
```

---

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build --analyze

# Next.js built-in optimizations
- Code splitting per route
- Image optimization
- CSS minification
- Tree shaking
```

### Runtime Optimization

```typescript
// next.config.ts
export default {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};
```

---

## Scaling Strategy

### Vertical Scaling
1. Increase server size
2. More memory/CPU
3. Database performance upgrades

### Horizontal Scaling
1. Load balancer
2. Multiple server instances
3. Database read replicas
4. CDN for static content

### Database Optimization
1. Connection pooling
2. Query optimization
3. Indexing strategy
4. Caching layer (Redis)

---

## Post-Deployment Checklist

After going live:

```
[ ] Monitor error tracking (Sentry)
[ ] Check Core Web Vitals
[ ] Verify database backups running
[ ] Test critical user flows
[ ] Monitor server resources
[ ] Check SSL certificate validity
[ ] Verify CDN working
[ ] Test email notifications
[ ] Validate payment processing
[ ] Check all external integrations
[ ] Monitor error logs
[ ] Performance benchmarking
```

---

## Rollback Procedure

```bash
# Vercel automatic rollback
# Dashboard → Deployments → Click previous → Select → Rollback

# Manual rollback
git revert HEAD
git push origin main
```

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Node.js Docs**: https://nodejs.org/docs
- **PostgreSQL**: https://www.postgresql.org/docs
- **Docker**: https://docs.docker.com

---

**Last Updated**: April 2, 2026  
**Status**: Ready for Implementation  
**Version**: 1.0
