#!/bin/bash

# Arabian Nights Quiz - Setup Script
# This script checks for Node.js and installs dependencies

set -e

echo "🌙 Arabian Nights Quiz Setup 🌙"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "  1. Visit https://nodejs.org/ and download Node.js LTS (v18 or v20)"
    echo "  2. Or use Homebrew: brew install node"
    echo "  3. Or use nvm: https://github.com/nvm-sh/nvm"
    echo ""
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v)
echo "✅ Node.js detected: $NODE_VERSION"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm detected: $NPM_VERSION"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 Ready to start!"
    echo ""
    echo "Run the development server:"
    echo "  npm run dev"
    echo ""
    echo "Then open http://localhost:3000 in your browser"
    echo ""
    echo "Other commands:"
    echo "  npm run build  - Build for production"
    echo "  npm start      - Run production server"
    echo "  npm run seed   - Seed demo data"
    echo ""
else
    echo ""
    echo "❌ Installation failed!"
    exit 1
fi
