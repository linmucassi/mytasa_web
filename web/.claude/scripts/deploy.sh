#!/bin/bash

# Deploy Script for TASA Website
# This script handles deployment to various platforms

set -e

echo "======================================"
echo "TASA Website - Deployment Script"
echo "======================================"
echo ""

# Check environment
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh <environment>"
  echo ""
  echo "Supported environments:"
  echo "  - development  (local/staging)"
  echo "  - production   (prod deployment)"
  echo "  - docker       (docker build & run)"
  echo ""
  exit 1
fi

ENVIRONMENT=$1

case $ENVIRONMENT in
  development)
    echo "🚀 Deploying to Development..."
    npm run dev
    ;;
  
  production)
    echo "🚀 Deploying to Production..."
    
    # Check if Vercel is configured
    if ! command -v vercel &> /dev/null; then
      echo "❌ Vercel CLI not found"
      echo "Install: npm install -g vercel"
      exit 1
    fi
    
    # Build
    echo "Building application..."
    npm run build
    
    # Deploy
    echo "Deploying to Vercel..."
    vercel --prod
    
    echo "✓ Production deployment complete"
    ;;
  
  docker)
    echo "🐳 Building Docker image..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
      echo "❌ Docker not found"
      echo "Install Docker: https://docs.docker.com/get-docker/"
      exit 1
    fi
    
    # Build image
    VERSION=$(grep '"version"' package.json | head -1 | awk -F'"' '{print $4}')
    IMAGE_NAME="tasa-web:${VERSION}"
    
    echo "Building image: $IMAGE_NAME"
    docker build -t "$IMAGE_NAME" .
    
    # Run container
    echo ""
    echo "Starting container..."
    docker run -p 3000:3000 \
      -e NODE_ENV=production \
      -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
      "$IMAGE_NAME"
    ;;
  
  *)
    echo "❌ Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

echo ""
echo "======================================"
