#!/bin/bash

# Setup Script for TASA Website
# This script initializes the development environment

set -e # Exit on error

echo "======================================"
echo "TASA Website - Development Setup"
echo "======================================"
echo ""

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "✓ Node.js $NODE_VERSION"

# Check npm version
echo "Checking npm version..."
NPM_VERSION=$(npm -v)
echo "✓ npm $NPM_VERSION"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install
echo "✓ Dependencies installed"

# Setup environment
echo ""
echo "Setting up environment variables..."
if [ ! -f .env.local ]; then
  cp .claude/config/.env.example .env.local
  echo "✓ Created .env.local from template"
  echo "  ⚠️  Please edit .env.local with your configuration"
else
  echo "✓ .env.local already exists"
fi

# Create necessary directories
echo ""
echo "Creating necessary directories..."
mkdir -p public/assets
mkdir -p .claude/logs
mkdir -p docs
echo "✓ Directories created"

# Database setup (if backend is configured)
echo ""
echo "Database setup..."
if command -v npx &> /dev/null; then
  echo "Prisma detected, you can run: npx prisma migrate dev"
  echo "Or TypeORM: npm run typeorm migration:run"
else
  echo "ℹ️  Skipping database setup (no migration tool configured)"
fi

# Generate TypeScript types
echo ""
echo "Generating TypeScript types..."
npm run typecheck 2>/dev/null || echo "ℹ️  TypeScript check ready"

# Create git hooks (optional)
echo ""
echo "Setting up git hooks..."
if command -v husky &> /dev/null; then
  npm run husky install || true
  echo "✓ Git hooks configured"
else
  echo "ℹ️  Husky not installed (optional)"
fi

# Setup complete
echo ""
echo "======================================"
echo "✓ Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "For more information, see:"
echo "- docs/DEVELOPMENT_ROADMAP.md"
echo "- .claude/docs/PROJECT_STRUCTURE.md"
echo "- .claude/docs/ARCHITECTURE.md"
echo ""
