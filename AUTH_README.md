# 🔐 Authentication Setup

The app has a full auth system built in. It primarily uses Firebase, but there's also a fallback file-based system if you don't want to set up Firebase right away.

---

## How It Works

### Primary Authentication (Firebase)
- Firebase Authentication integration
- Email/password authentication
- Session management
- Secure user profiles

### Features Implemented:
1. **User Registration & Login**
   - Firebase Auth for secure authentication
   - Alternative bcrypt password hashing
   - JWT token-based authentication (legacy)
   - User profile management

2. **Password Reset Flow**
   - Forgot password functionality
   - Email-based password reset
   - Secure token-based verification
   - 1-hour token expiration

3. **Email Integration**
   - Welcome emails for new users
   - Password reset emails with styled HTML templates
   - Nodemailer integration with SMTP support

4. **User Schema**
   - User profiles with stats tracking
   - Level and badge system integration
   - Last active tracking

## � Firebase Configuration

### Firebase Setup (Primary Authentication):

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Get your Firebase config from Project Settings
4. Add to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 📧 Email Configuration (Optional)

### Gmail Setup (For Password Reset):

1. Enable 2-factor authentication on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an "App Password" for "Mail"
4. Create a `.env.local` file in the project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
JWT_SECRET=your-super-secret-jwt-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Other Email Providers:

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASSWORD=your-mailgun-password
```

### Development Mode:
If no SMTP credentials are provided, emails will be logged to the console instead of being sent.

## 🗄️ Database Structure

### User Schema (JSON File-Based):
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "password": "hashed-string",
  "createdAt": "ISO-date",
  "verified": true,
  "profile": {
    "total_score": 0,
    "level": 1,
    "badges": [],
    "quizzesCompleted": 0,
    "lastActive": "ISO-date"
  }
}
```

### Files Created:
- `/data/users/users.json` - User accounts
- `/data/users/reset-tokens.json` - Password reset tokens

## 🔑 API Endpoints

### Authentication:
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/me` - Get current user (requires auth token)

### Request Examples:

**Sign Up:**
```javascript
POST /api/auth/signup
{
  "username": "scheherazade",
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Sign In:**
```javascript
POST /api/auth/signin
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Forgot Password:**
```javascript
POST /api/auth/forgot-password
{
  "email": "user@example.com"
}
```

**Reset Password:**
```javascript
POST /api/auth/reset-password
{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

## 🎯 User Flow

1. **New User:**
   - Sign up → Receive welcome email → Sign in → Start quiz

2. **Forgot Password:**
   - Click "Forgot Password" → Enter email → Receive reset link → Click link → Set new password → Sign in

3. **Returning User:**
   - Sign in → JWT token stored in localStorage → Access protected routes

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT tokens with 7-day expiration
- Secure password reset flow
- Token-based authentication
- Email verification support
- Protected API endpoints

## 📝 Testing the System

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Create an account:**
   - Visit http://localhost:3000/auth
   - Click "Sign up"
   - Fill in details and submit

3. **Test forgot password:**
   - Click "Forgot your password?"
   - Enter your email
   - Check console for reset link (if no SMTP configured)
   - Visit the reset link and set new password

## 🚀 Production Deployment

Before deploying to production:

1. Set a secure JWT_SECRET
2. Configure real SMTP credentials
3. Set NEXT_PUBLIC_BASE_URL to your domain
4. Consider migrating to a real database (PostgreSQL, MongoDB)

## 📦 Dependencies Added

- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation/verification
- `nodemailer` - Email sending
- `uuid` - Unique ID generation

## 🎨 UI Pages

- `/auth` - Sign in / Sign up page (updated with forgot password link)
- `/forgot-password` - Request password reset
- `/reset-password` - Reset password form (accessed via email link)

All pages use the Arabian Nights theme with gradient text, parchment cards, and gold accents! 
