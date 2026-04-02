#!/bin/bash

# Build Script for TASA Website
# This script builds the Next.js application for production

set -e

echo "======================================"
echo "Building TASA Website"
echo "======================================"
echo ""

# Clean previous build
echo "Cleaning previous build..."
rm -rf .next
echo "✓ Clean complete"

# Run type checking
echo ""
echo "Running TypeScript type checking..."
npm run typecheck || exit 1
echo "✓ Type check passed"

# Run linting
echo ""
echo "Running ESLint..."
npm run lint || echo "⚠️  Some lint warnings found (non-blocking)"

# Build production
echo ""
echo "Building Next.js application..."
npm run build
echo "✓ Build complete"

# Show build info
echo ""
echo "======================================"
echo "✓ Build Successful!"
echo "======================================"
echo ""
echo "Build output: .next/"
echo ""
echo "Next steps:"
echo "1. Run: npm start"
echo "2. Deploy: vercel --prod"
echo ""
