# Deployment Guide

## Option 1: Full Stack on Vercel (Recommended for Next.js)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- MongoDB Atlas database (already configured)

### Steps:

1. **Ensure code is pushed to GitHub** ✅
   ```bash
   git add -A
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Visit https://vercel.com
   - Click "Sign up" or "Login" with GitHub
   - Click "Add New Project"
   - Select your repository: `AryaA-03/pecathonfinal1`
   - Configure project:
     - Framework Preset: Next.js (auto-detected)
     - Root Directory: ./
     - Build Command: npm run build
     - Output Directory: .next
     - Install Command: npm install

3. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   MONGODB_URI = mongodb+srv://arya0101:arya1010@cluster0.elro8c3.mongodb.net/?appName=Cluster0
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your app will be live at: `https://your-project-name.vercel.app`

5. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Post-Deployment:
- Test all features:
  - Google Sign-in
  - Quiz functionality
  - Leaderboard
  - Multiplayer
- Monitor logs in Vercel Dashboard
- Set up production Firebase project (optional but recommended)

---

## Option 2: Frontend (Vercel) + Backend (Render)

### This requires splitting the Next.js app - NOT RECOMMENDED for this project

**Why?** 
- Next.js API routes are designed to run with the frontend
- Splitting requires significant restructuring
- Loses Next.js optimizations
- More complex to maintain
- Higher costs (two deployments)

**If you still want to proceed:**

### A. Backend on Render:

1. Create a separate Node.js/Express API:
   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express mongodb cors dotenv
   ```

2. Move API routes to Express:
   - Convert `/pages/api/*` to Express routes
   - Set up CORS for Vercel domain
   - Deploy to Render

3. Update frontend API calls:
   - Change all `fetch('/api/...')` to `fetch('https://your-backend.onrender.com/api/...')`

### B. Frontend on Vercel:
   - Remove `/pages/api` folder
   - Add `NEXT_PUBLIC_API_URL` environment variable
   - Deploy to Vercel

---

## Recommended Approach

**Use Option 1** - Deploy everything on Vercel because:
- ✅ Zero configuration needed
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless functions for API routes
- ✅ Free tier generous (100GB bandwidth, unlimited sites)
- ✅ Auto-deploys on git push
- ✅ Preview deployments for PRs
- ✅ Built-in analytics
- ✅ No CORS issues
- ✅ Fast cold starts

## Troubleshooting

### Build fails on Vercel:
1. Check build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node version (use LTS)
4. Check environment variables

### API routes not working:
1. Verify MongoDB connection string
2. Check environment variables are set
3. Review function logs in Vercel dashboard

### Authentication issues:
1. Add Vercel domain to Firebase authorized domains
2. Update Firebase config if needed
3. Check OAuth redirect URIs

## Environment Variables Needed:

```env
MONGODB_URI=mongodb+srv://arya0101:arya1010@cluster0.elro8c3.mongodb.net/?appName=Cluster0
```

## Post-Deployment Checklist:

- [ ] Test Google authentication
- [ ] Verify database connections
- [ ] Test quiz functionality
- [ ] Check leaderboard
- [ ] Test multiplayer rooms
- [ ] Monitor error logs
- [ ] Set up custom domain (optional)
- [ ] Add Firebase production config
- [ ] Enable Vercel Analytics (optional)
