#!/bin/bash

# Validation script to check all project files are in place

echo "🔍 Validating Arabian Nights Quiz project structure..."
echo ""

errors=0

# Check required files
files=(
  "package.json"
  "next.config.js"
  "tailwind.config.js"
  "postcss.config.js"
  "data/questions.json"
  "data/attempts.json"
  "data/leaderboard.json"
  "pages/_app.js"
  "pages/index.js"
  "pages/quiz.js"
  "pages/review.js"
  "pages/leaderboard.js"
  "pages/profile.js"
  "pages/admin.js"
  "pages/api/questions.js"
  "pages/api/attempts.js"
  "pages/api/leaderboard.js"
  "pages/api/seed.js"
  "components/Header.js"
  "components/QuestionCard.js"
  "components/LeaderboardList.js"
  "components/Timer.js"
  "lib/supabaseClient.js"
  "styles/globals.css"
)

for file in "${files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing: $file"
    errors=$((errors + 1))
  fi
done

if [ $errors -eq 0 ]; then
  echo "✅ All required files present!"
  echo ""
  
  # Check if node_modules exists
  if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed yet"
    echo "   Run: npm install"
  else
    echo "✅ Dependencies installed"
  fi
  
  echo ""
  echo "📋 Project validation complete!"
  echo ""
  echo "Next steps:"
  echo "  1. Install Node.js if not installed"
  echo "  2. Run: npm install"
  echo "  3. Run: npm run dev"
  echo "  4. Open: http://localhost:3000"
else
  echo ""
  echo "❌ Found $errors missing files!"
  exit 1
fi
