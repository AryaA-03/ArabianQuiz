# Arabian Nights Quiz

Hackathon-ready Next.js + Tailwind web app scaffold for an Arabian Nights-themed quiz.

> 🚀 **NEW USER?** See [QUICKSTART.md](QUICKSTART.md) for step-by-step installation instructions!

## Features included
- Multiple choice questions (4 options)
- Immediate feedback and explanations
- Review screen and score tracking (file-based demo store)
- 24 curated questions (data/questions.json)
- Timed mode with time bonus
- Badges placeholders & profile page
- Admin page to add questions
- Leaderboard (demo)
- Deployed-ready structure (Vercel recommended)

## Quick start (local)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.local.example` to `.env.local` and add values if using Supabase (optional).
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Seed DB (demo)
This repo uses a local file-based demo store. To demo seeding:
```bash
npm run seed
```
Make sure the dev server is running so the script can POST to `/api/seed`.

## Supabase integration
- To use Supabase for auth and storage, create a Supabase project and paste your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` into `.env.local`.
- Replace the minimal file-based APIs with Supabase queries in `pages/api/*.js` (or adapt `lib/supabaseClient.js`).

## Deploy
- I recommend Vercel. Push repo to GitHub and import into Vercel — add environment variables in Vercel dashboard if using Supabase.

## Next steps (winning polish)
- Add Socket.IO or Supabase Realtime for live leaderboards and multiplayer.
- Add authentication, profile persistence, and badges logic in Supabase.
- Add accessibility testing and i18n (next-i18next).
- Add tests (Jest + Playwright) and CI.

Good luck — if you want, I can:
- Convert the demo APIs to full Supabase-backed endpoints (auth, attempts, leaderboard).
- Add Socket.IO multiplayer server and client glue.
- Create a one-click Vercel deploy config.
Tell me which part you want next and I'll generate the code.
