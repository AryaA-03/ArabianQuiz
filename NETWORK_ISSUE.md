# MongoDB Connection Blocked - Solutions

## Problem
Your network is blocking MongoDB Atlas connections (port 27017 and DNS queries).

## Solutions

### 1. Try Different Network (Quickest)
- Disconnect from current WiFi
- Connect to mobile hotspot or different network
- Run: `npm run setup-mongodb`

### 2. Check macOS Firewall
- System Settings → Network → Firewall
- Temporarily disable or add exception for Node.js

### 3. Use MongoDB Compass (Manual Setup)
1. Download: https://www.mongodb.com/try/download/compass
2. Connect with: `mongodb+srv://arya0101:arya1010@cluster0.elro8c3.mongodb.net/`
3. Create database `mystiq-quiz`
4. Import `/data/questions.json` into `questions` collection
5. Import `/data/attempts.json` into `attempts` collection

### 4. Setup After Deployment
Deploy to Vercel first, then visit:
`https://your-app.vercel.app/api/setup-database` (POST request)

The production environment won't have these network restrictions.
