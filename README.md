# 🌙 Arabian Nights Quiz

<div align="center">

**An immersive, feature-rich quiz application inspired by the enchanting tales of Arabian Nights**

</div>

---

## 📝 Description

Arabian Nights Quiz is a premium, production-ready web application that brings the magic of 1001 Arabian Nights to life through an engaging quiz experience. Built with Next.js and featuring a stunning UI with animated backgrounds, this application offers both educational and entertainment value through carefully curated questions about classic Arabian tales like Aladdin, Sinbad, Ali Baba, and Scheherazade.

> 🚀 **NEW USER?** See [QUICKSTART.md](QUICKSTART.md) for step-by-step installation instructions!

---

## ✨ Features

### 🎯 Core Quiz Features

#### **Interactive Quiz System**
-  Multiple choice questions with 4 options each
-  Immediate feedback with detailed explanations
-  24+ curated questions across multiple themes
-  Real-time score tracking and statistics
-  Dynamic question randomization
-  Progress tracking with visual indicators

#### **Quiz Configuration**
- **Difficulty Selection**: Easy, Medium, Hard, or Mixed
- **Theme Filtering**: All stories, Aladdin, Sinbad, Ali Baba, or Scheherazade
- **Timed Mode**: Optional countdown timer with time bonus
- Beautiful configuration screen with visual selections

#### **Advanced Scoring System**
-  Base points: 10 per correct answer
-  Time bonus: Up to 5 additional points in timed mode
-  Difficulty bonus: Easy +0, Medium +2, Hard +5
-  Penalty: -2 points for incorrect answers
-  Comprehensive score breakdown and analytics

### 🔐 Authentication & User Management

- ✅ **Full Authentication System** powered by Firebase
  - Sign up with email and password
  - Secure sign in functionality
  - Guest mode for anonymous play
  - Password reset functionality
  - Session management
  - Protected routes and user-specific data

- 👤 **User Profiles**
  - Personalized profile pages
  - User statistics dashboard
  - Achievement tracking
  - Historical performance data

### 🏆 Achievements & Progression

#### **Badge System** (12 Unique Achievements)
1.  **Novice Storyteller** - Complete your first quiz
2.  **First Victory** - Score 50+ points
3.  **Speed Demon** - Achieve perfect score in timed mode
4.  **Sinbad Seafarer** - Master Sinbad questions
5.  **Aladdin's Wisdom** - Master Aladdin questions
6.  **Ali Baba's Secret** - Master Ali Baba questions
7.  **Scheherazade's Tale** - Complete 10 quizzes
8.  **Scholar of Tales** - Answer 100 questions correctly
9.  **Perfectionist** - Achieve 5 perfect scores
10.  **Grand Champion** - Reach top 10 on leaderboard
11.  **Living Legend** - Reach level 10
12.  **Streak Master** - Maintain 7-day streak

#### **Level & XP System**
-  Experience points for all activities
-  Level progression with milestones
-  Daily streak tracking
-  Performance analytics

### 📊 Leaderboard System

#### **Multi-Timeframe Rankings**
-  **All-Time Leaderboard** - Historical champions
-  **Monthly Rankings** - Current month's top players
-  **Weekly Rankings** - This week's leaders
-  **Daily Rankings** - Today's best performances

#### **Advanced Filtering**
-  Filter by story theme (Aladdin, Sinbad, etc.)
-  Filter by difficulty level
-  Combine multiple filters
-  Dynamic statistics

#### **Visual Enhancements**
-  Podium display for top 3 players
-  Player avatars
-  Badge count display
-  Stats sidebar with insights
-  Gradient effects for top performers

### 🎮 Multiplayer Mode

- 🌐 **Global Multiplayer Rooms**
  - Create or join global game rooms
  - Real-time player synchronization
  - Live room updates via polling
  - Automatic room management

- 👥 **Competitive Features**
  - Play against other players simultaneously
  - Real-time score comparison
  - Room capacity management
  - Automatic game start when ready

### 🎨 Premium UI/UX

#### **Visual Design**
-  Animated starry background with particle effects
-  Gradient text animations
-  Glassmorphism cards with glow effects
-  Smooth transitions and hover effects
-  Pulse animations for CTAs
-  Professional color scheme (Gold, Indigo, Sand)

#### **Enhanced Components**
-  Redesigned homepage with animated stats counters
-  Interactive feature showcase
-  Premium header with user menu
-  Fully responsive design for all devices
-  Loading states and spinners
-  Progress bars and visual indicators

#### **3D Interactive Elements**
- 🪔 **Animated Genie Lamp** (Three.js)
  - Interactive 3D model
  - Hover animations
  - Sound effects
  - Magical particle effects

### 🌍 Internationalization

- 🗣️ **Multi-Language Support**
  - English (EN)
  - Hindi (हिं)
  - Easy language switching
  - Localized content and UI
  - Context-aware translations

### 👨‍💼 Admin Features

- 🔧 **Admin Dashboard** (`/admin`)
  - Add new questions via web interface
  - Question management system
  - Real-time preview
  - Category and difficulty assignment
  - Bulk question operations

### 📱 Additional Features

-  **Review Screen** - Comprehensive answer review after quiz completion
-  **Question Card** - Enhanced question display with difficulty badges
-  **Timer Component** - Visual countdown timer for timed mode
-  **Animated Background** - Dynamic particle system
-  **Profile Stats** - Detailed performance analytics
-  **Notifications** - Toast notifications for achievements
-  **PWA Ready** - Progressive Web App capabilities
-  **Accessibility** - WCAG compliant components

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher ([Download here](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** (for cloning)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ArabianQuiz-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your credentials:
   - Firebase configuration
   - MongoDB connection string (if using MongoDB)
   - Supabase keys (if using Supabase)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Automated Setup

Use the provided setup script for one-command installation:

```bash
./setup.sh
```

---

## 📖 Documentation

-  **[QUICKSTART.md](QUICKSTART.md)** - Complete step-by-step installation guide
-  **[SETUP.md](SETUP.md)** - Detailed setup and configuration
-  **[AUTH_README.md](AUTH_README.md)** - Authentication system documentation
-  **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - MongoDB integration guide
-  **[GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)** - OAuth configuration
-  **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Deployment instructions
-  **[BACKGROUND_SETUP.md](BACKGROUND_SETUP.md)** - Animated background setup
-  **[HACKATHON_SUMMARY.md](HACKATHON_SUMMARY.md)** - Complete feature list

---

## 🎮 Usage

### Playing the Quiz

1. **Start a Quiz**
   - Click "Play Now" on the homepage
   - Select difficulty level (Easy/Medium/Hard/Mixed)
   - Choose a theme (All/Aladdin/Sinbad/Ali Baba/Scheherazade)
   - Toggle timed mode on/off
   - Click "Start Quiz"

2. **Answer Questions**
   - Read each question carefully
   - Select one of four options
   - Get immediate feedback
   - View explanations for each answer
   - Track your progress

3. **Review Results**
   - See your final score
   - Review all questions and answers
   - Check which badges you earned
   - View detailed score breakdown

### Multiplayer Mode

1. Navigate to `/multiplayer`
2. Click "Join Global Room" or "Create Private Room"
3. Wait for other players
4. Game starts automatically when ready
5. Compete in real-time

### Profile Management

- View your stats at `/profile`
- Track your badges and achievements
- Monitor your level progression
- Check your streaks and performance

### Leaderboard

- Access at `/leaderboard`
- Filter by timeframe (All/Monthly/Weekly/Daily)
- Filter by theme or difficulty
- See your ranking

---

## 🔧 Tech Stack

### Frontend
- **[Next.js](https://nextjs.org/)** 14.2.0 - React framework with SSR
- **[React](https://reactjs.org/)** 18.2.0 - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** 3.4.7 - Utility-first CSS
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Three.js helpers

### Backend & Database
- **[Firebase](https://firebase.google.com/)** - Authentication and real-time database
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Next Auth](https://next-auth.js.org/)** - Authentication solution
- **[Supabase](https://supabase.com/)** - Alternative backend (optional)

### Authentication & Security
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token management
- **Firebase Auth** - User authentication

### Additional Libraries
- **clsx** - Conditional className utility
- **uuid** - Unique identifier generation
- **nodemailer** - Email functionality

### Development Tools
- **PostCSS** - CSS transformation
- **Autoprefixer** - CSS vendor prefixing
- **dotenv** - Environment variable management

---

## 📦 Project Structure

```
ArabianQuiz-main/
├── components/          # React components
│   ├── AnimatedBackground.js
│   ├── BadgeSystem.js
│   ├── GenieLamp.js
│   ├── Header.js
│   ├── LanguageSwitcher.js
│   ├── LeaderboardList.js
│   ├── QuestionCard.js
│   └── Timer.js
├── contexts/           # React context providers
│   ├── AuthContext.js
│   ├── FirebaseAuthContext.js
│   └── LanguageContext.js
├── data/              # JSON data files
│   ├── attempts.json
│   ├── leaderboard.json
│   ├── questions.json
│   └── rooms.json
├── lib/               # Utility libraries
│   ├── firebase.js
│   ├── mongodb.js
│   └── supabaseClient.js
├── pages/             # Next.js pages
│   ├── _app.js
│   ├── index.js
│   ├── admin.js
│   ├── auth.js
│   ├── quiz.js
│   ├── profile.js
│   ├── leaderboard.js
│   ├── multiplayer.js
│   ├── review.js
│   └── api/          # API routes
│       ├── attempts.js
│       ├── leaderboard.js
│       ├── questions.js
│       └── users/
├── public/            # Static assets
│   ├── assets/
│   ├── models/
│   └── genie-sound.mpeg
├── scripts/           # Utility scripts
│   ├── seed_db.js
│   └── setup-mongodb.js
├── styles/            # Global styles
│   └── globals.css
└── genie-lamp/        # 3D model assets
```

---

## 🔌 Available Scripts

```bash
# Development
npm run dev              # Start development server on port 3000
npm run build           # Build for production
npm start               # Run production server

# Database
npm run seed            # Seed demo data
npm run setup-mongodb   # Setup MongoDB collections

# Validation
./validate.sh           # Validate project setup
./setup.sh             # Automated project setup
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB (Optional)
MONGODB_URI=your_mongodb_connection_string

# Supabase (Optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth
NEXTAUTH_URL=your_deployment_url
NEXTAUTH_SECRET=your_secret_key
```

---

## 🎯 Key Highlights

- ✅ **Production-Ready** - Fully tested and deployable
- ✅ **Mobile Responsive** - Works perfectly on all devices
- ✅ **Accessible** - WCAG compliant
- ✅ **Performance Optimized** - Fast loading and smooth animations
- ✅ **Scalable Architecture** - Easy to extend and maintain
- ✅ **Modern Stack** - Latest technologies and best practices
- ✅ **Comprehensive Documentation** - Well-documented codebase
- ✅ **Active Features** - All features fully implemented and working

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Inspired by the timeless tales of 1001 Arabian Nights
- Built with modern web technologies
- Designed for education and entertainment

---

## 📞 Support

For issues, questions, or suggestions:
- 📧 Create an issue in the repository
- 📖 Check the documentation files
- 💬 Review the code comments

---

<div align="center">

**Made with ❤️ and a touch of Arabian magic ✨**

[⬆ Back to Top](#-arabian-nights-quiz)

</div>

