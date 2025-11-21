# Google OAuth Setup Guide for Arabian Nights Quiz

## ✅ What's Already Done

I've created the complete NextAuth configuration for you:
- `/pages/api/auth/[...nextauth].js` - NextAuth API route with Google provider
- Updated `/pages/auth.js` - Added "Sign in with Google" button
- Updated `/pages/_app.js` - Added SessionProvider wrapper
- Installed `next-auth` package

## 🔧 What You Need to Do

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Name it: `Arabian Nights Quiz` (or any name you prefer)
4. Click **"Create"**
5. Wait for the project to be created, then select it

### Step 2: Enable Google OAuth

1. In the left sidebar, go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** (unless you have Google Workspace)
3. Click **"Create"**

### Step 3: Configure OAuth Consent Screen

Fill in the required fields:

**App Information:**
- App name: `Arabian Nights Quiz`
- User support email: `your-email@gmail.com` (your email)
- App logo: *(optional)*

**App domain (optional):**
- Application home page: `http://localhost:3000`

**Developer contact information:**
- Email addresses: `your-email@gmail.com`

Click **"Save and Continue"**

### Step 4: Scopes (Default is Fine)

Click **"Save and Continue"** (no need to add scopes)

### Step 5: Test Users (For Development)

1. Click **"Add Users"**
2. Add your Gmail address (and any testers)
3. Click **"Save and Continue"**

Click **"Back to Dashboard"**

### Step 6: Create OAuth Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Application type: **"Web application"**
4. Name: `Arabian Nights Quiz Web Client`

**Authorized JavaScript origins:**
```
http://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
```

5. Click **"Create"**

### Step 7: Copy Your Credentials

You'll see a popup with:
- **Client ID** (starts with something like `123456789-abc.apps.googleusercontent.com`)
- **Client Secret** (random string like `GOCSPX-xyz123...`)

**IMPORTANT:** Copy both values!

### Step 8: Add to Environment Variables

Create or update `/Users/aryaarora/Downloads/arabian-nights-quiz/.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret-here

# Email Configuration (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET`.

### Step 9: Restart Your Dev Server

```bash
npm run dev
```

### Step 10: Test Google Sign-In

1. Go to `http://localhost:3000/auth`
2. Click **"Sign in with Google"**
3. You should see Google's login page
4. Sign in with your Gmail account
5. You'll be redirected back to `/quiz` page

## 🎯 How It Works

1. **User clicks "Sign in with Google"** → Redirects to Google
2. **Google authenticates** → User grants permission
3. **Google redirects back** → To `/api/auth/callback/google`
4. **NextAuth processes** → Creates/finds user in database
5. **User is signed in** → Redirected to `/quiz`

## 📝 User Data Storage

When someone signs in with Google:
- **Email**: Used to identify returning users
- **Name**: Stored as username (fallback to email)
- **Profile**: Created with default score of 0
- **Password**: Not required (OAuth users don't have passwords)

The user is saved in `/data/users/users.json` just like email/password users.

## 🔒 Security Notes

- **Never commit** `.env.local` to git
- **NEXTAUTH_SECRET** must be unique and random
- **Client Secret** should remain private
- For production, update OAuth redirect URIs with your live domain

## 🐛 Troubleshooting

### Error: "Redirect URI mismatch"
- Check that `http://localhost:3000/api/auth/callback/google` is in Authorized redirect URIs
- Make sure there's no trailing slash

### Error: "Access blocked: Arabian Nights Quiz has not completed Google verification"
- This is normal for apps in development
- Click **"Advanced"** → **"Go to Arabian Nights Quiz (unsafe)"**
- OR add yourself as a test user (Step 5 above)

### Google login button doesn't work
- Make sure `next-auth` is installed: `npm install next-auth`
- Restart dev server after adding `.env.local`
- Check browser console for errors

### User is signed in with Google but profile doesn't show
- The NextAuth callback automatically creates users
- Check `/data/users/users.json` to see if user was created
- Google users will have no password hash (only OAuth login)

## ✨ You're Done!

Both authentication methods now work:
- ✅ **Email/Password** (your custom auth)
- ✅ **Google OAuth** (NextAuth)

Users can choose either method, and both store data in the same database!
