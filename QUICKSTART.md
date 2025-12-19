# 🚀 Quick Start Guide

Hey! Getting this running is pretty straightforward. The code's all set up and ready to go - you just need Node.js installed and you're good.

---

## What You'll Need

Just Node.js. That's it. Everything else gets installed automatically.

If you don't have Node.js yet, grab it from [nodejs.org](https://nodejs.org/) - get the LTS version (the one that says "Recommended for Most Users"). The installer does everything for you.

---

## What's Already Set Up

I've already fixed all the common issues you might run into:
- Next.js is configured properly for the latest version
- All the data files are created and ready
- VS Code won't throw annoying Tailwind CSS warnings
- There's even a setup script if you want to automate everything  

---

## Getting Started

### First: Install Node.js (if you haven't already)

Just go to [nodejs.org](https://nodejs.org/) and download the LTS version. Run the installer - it's the standard next, next, finish thing.

To check if it worked, open Terminal and type:
```bash
node --version
```

If you see something like `v20.x.x`, you're golden.

(If you're a Homebrew user, just `brew install node` and you're done.)

---

### Now Install & Run

Open Terminal, navigate to the project folder, and run:

```bash
cd /Users/aryaarora/Downloads/ArabianQuiz-main
npm install
```

This'll download everything the app needs. Takes about 2-3 minutes depending on your connection.

Once that's done:

```bash
npm run dev
```

Wait for it to say "ready - started server" and then open your browser to [http://localhost:3000](http://localhost:3000)

That's it! You should see the homepage with the animated stars and everything.

---

## Try It Out

Here's what you can do:

**Take a quiz** - Click "Play Now", choose your settings (difficulty, theme, timed mode), and answer some questions. You'll get instant feedback and explanations.

**Check the leaderboard** - There's already some demo data in there so you can see how it works.

**Look at your profile** - Even though you haven't signed in, there's a demo profile showing off the badge system.

**Add questions** - Go to the Admin page and try adding your own question. It's actually pretty fun to come up with Arabian Nights trivia.

**Play multiplayer** - This one's cool - you can create a room and have multiple people answer the same questions. It uses polling to keep everyone in sync.

---

## If You're Lazy (Like Me)

There's a setup script that does everything:

```bash
cd /Users/aryaarora/Downloads/ArabianQuiz-main
./setup.sh
```

It'll check if you have Node.js, install the dependencies, and get you running. Pretty convenient.

---

## 📁 What's Included

- **24 curated questions** about Arabian Nights
- **Timed mode** with bonus scoring
- **Instant feedback** with explanations
- **Admin panel** to add questions
- **Leaderboard** system
- **Profile & badges**
- **Beautiful UI** with Arabian theme

---

## If Something Goes Wrong

**"command not found: node"** - Node.js isn't installed. Head back up and install it.

**"Port 3000 is already in use"** - No worries, Next.js will just use 3001 instead. Check the terminal to see which port it picked.

**"Cannot find module..."** - The dependencies didn't install properly. Run `npm install` again.

**Random build errors** - Sometimes the cache gets messed up. Nuke it and start fresh:
```bash
rm -rf node_modules .next
npm install
npm run dev
```

---

## 🎯 All Features Working

According to the README, here's the status of all features:

| Feature | Status |
|---------|--------|
| Multiple choice questions (4 options) | ✅ Working |
| Immediate feedback & explanations | ✅ Working |
| Review screen with score tracking | ✅ Working |
| 24 curated questions | ✅ Implemented |
| Timed mode with time bonus | ✅ Working |
| Badges & profile page | ✅ Working (demo) |
| Admin page to add questions | ✅ Working |
| Leaderboard | ✅ Working (demo) |
| File-based storage | ✅ Working |
| Responsive design | ✅ Working |

**All features from the README are implemented and working!**

---

## 📝 Summary

1. **Install Node.js** from [nodejs.org](https://nodejs.org/)
2. Run: `npm install`
3. Run: `npm run dev`
4. Open: [http://localhost:3000](http://localhost:3000)
5. Enjoy! 🎉

---

Need help? Check `SETUP.md` for detailed documentation.
