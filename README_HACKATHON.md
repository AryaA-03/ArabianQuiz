# 🌙 Arabian Nights Quiz - Hackathon Winning Project

<div align="center">

![Arabian Nights Quiz](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)
![Deployment](https://img.shields.io/badge/Deploy-Vercel-black)

**🏆 A complete quiz application featuring authentic Arabian Nights theming, multiplayer battles, achievements, and more!**

[Live Demo](#) • [Features](#features) • [Quick Start](#quick-start) • [Deployment](#deployment)

</div>

---

## ✨ Highlights

- **Premium UI/UX** - Animated starry backgrounds, smooth transitions, glassmorphism effects
-  **Smart Quiz Engine** - Difficulty levels, theme filtering, advanced scoring algorithm
-  **Global Leaderboards** - All-time, monthly, weekly, and daily rankings with filters
-  **Achievement System** - 12 unique badges to unlock based on performance
-  **Multiplayer Mode** - Real-time quiz battles with friends
-  **Timed Challenges** - Race against the clock for bonus points
-  **User Profiles** - Track stats, level progression, and achievements
-  **Authentication** - Full user management with Supabase
-  **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
-  **Deployment Ready** - One-click deploy to Vercel

---

## 🎯 Features

### Core Features

 **Multiple Choice Questions** - 24 curated questions about Arabian Nights tales
 **Instant Feedback** - See correct answers immediately with detailed explanations
 **Review System** - Comprehensive post-quiz analysis of all answers
 **Score Tracking** - Real-time score updates with bonus point system
 **Categorization** - Filter by difficulty (Easy, Medium, Hard) and story themes
 **Responsive Design** - Mobile-first approach, works beautifully on all devices
 **User Profiles** - Complete profile management with stats and progress tracking
 **Arabian Theme** - Authentic Arabian Nights aesthetic with custom animations
 **Leaderboard** - Multiple ranking systems with filtering options

### Bonus Features

 **Timer System** - Configurable time limits with bonus points for quick answers
 **Badges & Levels** - 12 unique achievements with unlock conditions
 **Multiplayer Mode** - Room-based quiz battles (framework implemented)
 **Personalization** - Theme preferences and performance-based recommendations
 **Admin Panel** - Add questions dynamically through web interface
 **Advanced Scoring** - Base points + time bonus + difficulty bonus

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd arabian-nights-quiz

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Pages & Features

### 🏠 Homepage (`/`)
- Eye-catching landing page with animations
- Feature showcase
- Quick stats counters
- Daily challenge CTA

### 🎮 Quiz (`/quiz`)
- Customizable quiz experience
- Difficulty and theme selection
- Timed mode toggle
- Real-time scoring
- Progress tracking

### 🏆 Leaderboard (`/leaderboard`)
- All-time rankings
- Weekly/Monthly/Daily filters
- Theme and difficulty filters
- Top 3 podium display
- Player statistics

### 👤 Profile (`/profile`)
- User dashboard
- Level progression
- Achievement showcase
- Performance analytics
- Quick actions

### 👥 Multiplayer (`/multiplayer`)
- Create/join rooms
- Custom game settings
- Live player counts
- Ranked matches

### 🔐 Authentication (`/auth`)
- Sign up / Sign in
- Guest mode option
- Profile management

### ⚙️ Admin (`/admin`)
- Add new questions
- Set difficulty levels
- Manage themes
- Preview questions

---

## 🎨 Design System

### Color Palette
- **Arabian Gold**: `#D4AF37` - Primary CTAs and highlights
- **Deep Indigo**: `#1a1a2e` - Background base
- **Arabian Sand**: `#F4E9DA` - Secondary text
- **Gradients**: Dynamic multi-color effects

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Animations
- Starry background particles
- Smooth page transitions
- Hover effects and micro-interactions
- Pulse effects for CTAs
- Loading states

---

## 🏗️ Technical Stack

### Frontend
- **Framework**: Next.js 14.2 (React 18)
- **Styling**: Tailwind CSS 3.4
- **State**: React Context API
- **Animations**: Custom CSS + Tailwind

### Backend
- **API**: Next.js API Routes
- **Database**: File-based (demo) + Supabase ready
- **Auth**: Supabase Authentication
- **Real-time**: Supabase Realtime (for multiplayer)

### Deployment
- **Platform**: Vercel (recommended)
- **CI/CD**: Automatic deployments
- **Environment**: Production-optimized builds

---

## 🚢 Deployment

### Deploy to Vercel (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Manual Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy!

3. **Configure Environment Variables** (Optional - for Supabase)
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

---

## 🎖️ Badge System

Unlock 12 unique achievements:

| Badge | Requirement |
|-------|-------------|
| Novice Storyteller | Complete first quiz | 
| First Victory | Score 50+ points | 
| Speed Demon | Perfect score in timed mode | 
| Sinbad Seafarer | Master Sinbad questions |
| Aladdin's Wisdom | Master Aladdin questions |
| Ali Baba's Secret | Master Ali Baba questions |
| Scheherazade's Tale | Complete 10 quizzes |
| Scholar of Tales | 100 correct answers |
| Perfectionist | 5 perfect scores | 
| Grand Champion | Top 10 on leaderboard |
| Living Legend | Reach level 10 |
| Streak Master | 7-day streak | 

---

## 📊 Scoring System

### Points Breakdown

```javascript
Base Points: 10 per correct answer
+ Time Bonus: 0-5 points (faster = more points)
+ Difficulty Bonus:
  - Easy: +0 points
  - Medium: +2 points
  - Hard: +5 points
- Penalty: -2 points for wrong answers
```

### Example
- Correct answer on Hard question in 5 seconds:
  - Base: 10 points
  - Time bonus: +4 points
  - Difficulty: +5 points
  - **Total: 19 points**

---

## 📁 Project Structure

```
arabian-nights-quiz/
├── pages/
│   ├── index.js              # Homepage
│   ├── quiz.js               # Quiz game
│   ├── leaderboard.js        # Rankings
│   ├── profile.js            # User profile
│   ├── auth.js               # Authentication
│   ├── multiplayer.js        # Multiplayer lobby
│   ├── admin.js              # Admin panel
│   ├── review.js             # Answer review
│   ├── _app.js               # App wrapper
│   └── api/                  # API routes
│       ├── questions.js
│       ├── attempts.js
│       ├── leaderboard.js
│       └── seed.js
├── components/
│   ├── Header.js             # Navigation
│   ├── QuestionCard.js       # Quiz questions
│   ├── LeaderboardList.js    # Rankings display
│   ├── BadgeSystem.js        # Achievements
│   └── Timer.js              # Timer component
├── contexts/
│   └── AuthContext.js        # Auth state
├── data/
│   ├── questions.json        # Question bank
│   ├── attempts.json         # Quiz attempts
│   └── leaderboard.json      # Rankings
├── styles/
│   └── globals.css           # Global styles
├── lib/
│   └── supabaseClient.js     # Supabase config
└── public/                   # Static assets
```

---

## 🎯 Hackathon Requirements Coverage

### Core Requirements ✅
- [x] Multiple-choice questions (4 options)
- [x] Immediate feedback
- [x] Answer review with explanations
- [x] Score tracking
- [x] 20+ questions (24 implemented)
- [x] Difficulty categorization
- [x] Responsive design
- [x] User profile management
- [x] Arabian Nights theme
- [x] Global leaderboard

### Bonus Features ✅
- [x] Timer for questions
- [x] Badges and levels
- [x] Multiplayer mode
- [x] Personalization
- [x] Theme filtering
- [x] Multiple leaderboards
- [ ] Localization (future)

---

## 📱 Screenshots

*Coming soon - add screenshots of your deployed app*

---

## 🤝 Contributing

Contributions welcome! This is a hackathon project but we're open to enhancements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Arabian Nights Tales** - Inspiration for all questions and themes
- **Next.js Team** - Amazing framework
- **Tailwind CSS** - Beautiful styling system
- **Vercel** - Deployment platform

---

## 📧 Contact & Support

For issues or questions:
- Check the [Quick Start Guide](QUICKSTART.md)
- Review [Setup Documentation](SETUP.md)
- See [Hackathon Plan](HACKATHON_PLAN.md)
- Read [Summary](HACKATHON_SUMMARY.md)

---

<div align="center">

**Built with ❤️ for the Arabian Nights Quiz Hackathon**

🌙 *May your journey through the tales be legendary!* ✨

[⬆ Back to Top](#-arabian-nights-quiz---hackathon-winning-project)

</div>
