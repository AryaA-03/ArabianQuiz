# 🌙 Arabian Nights Quiz - Setup & Installation Guide

## Prerequisites

Before running this project, you need to have **Node.js** installed on your system.

### Install Node.js (Choose one method)

#### Option 1: Official Installer (Recommended for beginners)
1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (v18 or v20)
3. Run the installer and follow the instructions
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### Option 2: Using Homebrew (macOS)
```bash
brew install node
```

#### Option 3: Using nvm (Version Manager)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js
nvm install --lts
nvm use --lts
```

---

## Quick Setup

### Automated Setup (Recommended)
Run the setup script:
```bash
./setup.sh
```

### Manual Setup
If you prefer to set up manually:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Available Commands

```bash
npm run dev      # Start development server on port 3000
npm run build    # Build for production
npm start        # Run production server
npm run seed     # Seed demo data (requires dev server running)
```

---

## Project Features

✅ All features are implemented and working:

### Core Features
- ✅ **Multiple choice questions** - 4 options per question
- ✅ **Immediate feedback** - See correct answers and explanations instantly
- ✅ **Review screen** - Review all your answers after completing the quiz
- ✅ **Score tracking** - File-based demo storage for attempts
- ✅ **24 curated questions** - Stored in `data/questions.json`

### Advanced Features
- ✅ **Timed mode** - Optional timer with time bonus scoring
- ✅ **Badges & Profile** - Profile page with badge placeholders
- ✅ **Admin page** - Add new questions via web interface
- ✅ **Leaderboard** - Demo leaderboard with top players
- ✅ **Responsive design** - Beautiful Arabian Nights theme with Tailwind CSS

---

## How to Use

### Playing the Quiz
1. Click **"Play Now"** on the homepage
2. Toggle **"Timed mode"** on/off as desired
3. Answer 10 random questions
4. Review your score and answers

### Adding Questions (Admin)
1. Navigate to `/admin` page
2. Fill in the question form:
   - Question text
   - 4 options
   - Correct answer index (0-3)
   - Difficulty level
3. Click **"Add Question"**

### Viewing Leaderboard
1. Navigate to `/leaderboard`
2. See top players and scores

### Profile
1. Navigate to `/profile`
2. View your badges and total score (demo data)

---

## File Structure

```
arabian-nights-quiz/
├── components/           # React components
│   ├── Header.js        # Navigation header
│   ├── QuestionCard.js  # Quiz question display
│   ├── LeaderboardList.js
│   └── Timer.js         # Timer component
├── data/                # JSON data storage
│   ├── questions.json   # Question database
│   ├── attempts.json    # User attempts
│   └── leaderboard.json # Leaderboard data
├── pages/               # Next.js pages
│   ├── index.js         # Homepage
│   ├── quiz.js          # Quiz page
│   ├── review.js        # Review answers
│   ├── leaderboard.js   # Leaderboard
│   ├── profile.js       # User profile
│   ├── admin.js         # Admin panel
│   └── api/             # API routes
│       ├── questions.js # Fetch questions
│       ├── attempts.js  # Save attempts
│       ├── leaderboard.js
│       └── seed.js      # Seed new questions
├── styles/              # CSS styles
│   └── globals.css      # Global styles + Tailwind
└── lib/                 # Utilities
    └── supabaseClient.js # Supabase config (optional)
```

---

## Troubleshooting

### Port Already in Use
If port 3000 is busy, the dev server will automatically try the next available port (3001, 3002, etc.)

### CSS Warnings
If you see `Unknown at rule @tailwind` warnings in your editor:
- These are harmless - the build will work fine
- Install the **Tailwind CSS IntelliSense** VS Code extension to remove them

### Build Errors
If you encounter build errors:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

---

## Optional: Supabase Integration

This project includes optional Supabase integration for authentication and cloud storage.

### Setup Supabase (Optional)
1. Create a project at [https://supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`
3. Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Modify API endpoints in `pages/api/` to use Supabase instead of file storage

---

## Deployment

### Deploy to Vercel (Recommended)
1. Push this repo to GitHub
2. Visit [https://vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and deploy
5. Add environment variables in Vercel dashboard if using Supabase

---

## Support

If you encounter any issues:
1. Check that Node.js is installed: `node --version`
2. Ensure dependencies are installed: `npm install`
3. Clear Next.js cache: `rm -rf .next`
4. Check the terminal for error messages

---

## License

This is a hackathon scaffold project. Feel free to use and modify!

---

**Enjoy exploring the Arabian Nights! 🌙✨**
