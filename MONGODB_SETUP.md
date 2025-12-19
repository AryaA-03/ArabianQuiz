# 📊 MongoDB Atlas Setup

So you want to use MongoDB instead of the file-based storage? Cool. Here's how to get MongoDB Atlas working.

---

## The Most Common Problem

If you're getting ECONNREFUSED errors, it's probably because MongoDB Atlas is blocking your IP address. This is super common and easy to fix.

## Fix It

### Allow Your IP Address

Atlas needs to know you're allowed to connect:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Log in to your account
3. Select your project (the one with `cluster0`)
4. Click **"Network Access"** in the left sidebar (under Security)
5. Click **"Add IP Address"** button
6. Choose one option:
   - **Quick Option**: Click "Allow Access from Anywhere" (adds 0.0.0.0/0)
   - **Secure Option**: Click "Add Current IP Address" to whitelist only your IP
7. Click **"Confirm"**
8. Wait ~1 minute for the changes to propagate

### 2. Verify Database User
Make sure your database user exists and credentials are correct:

1. In MongoDB Atlas, click **"Database Access"** in left sidebar
2. Verify user `arya0101` exists
3. If not, click "Add New Database User":
   - Username: `arya0101`
   - Password: `arya112233` (or your actual password)
   - Database User Privileges: "Read and write to any database"
4. Click "Add User"

### 3. Check Cluster Status
1. Click **"Database"** in left sidebar
2. Verify `cluster0` shows as "Active" (not Paused)
3. If paused, click "Resume" button

### 4. Get Correct Connection String
1. Click "Connect" button on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "5.5 or later"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Update `.env.local` with the new connection string if different

### 5. Run Setup Again
After completing steps above:

```bash
npm run setup-mongodb
```

## Expected Output
When successful, you should see:

```
✅ Connected successfully!
📦 Dropping existing collections...
✅ Inserted X questions
✅ Inserted Y attempts
✅ Created rooms collection
📈 Database Statistics
🎉 Database setup complete!
```

## Connection String Format
Your connection string should follow this format:
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

Example:
```
mongodb+srv://arya0101:yourpassword@cluster0.elro8c3.mongodb.net/arabian-quiz?retryWrites=true&w=majority&appName=Cluster0
```

Make sure:
- ✅ Password has no special characters that need URL encoding
- ✅ Database name is included (`mystiq-quiz`)
- ✅ Cluster hostname is correct (`cluster0.elro8c3.mongodb.net`)

## Troubleshooting

### Still getting ECONNREFUSED?
- Wait 2-3 minutes after adding IP address
- Try "Allow Access from Anywhere" (0.0.0.0/0) temporarily
- Restart your terminal/VSCode
- Check if you're behind a corporate firewall/VPN

### Authentication Failed?
- Verify password doesn't contain special characters
- If password has @, #, %, encode it: # → %23, @ → %40, % → %25
- Reset password in Database Access if needed

### Wrong Database?
Connection string should end with `/mystiq-quiz?...`

## Alternative: Manual Database Setup
If automated script continues failing, you can:
1. Use MongoDB Compass (GUI) to connect
2. Manually create database `mystiq-quiz`
3. Create collections: `questions`, `attempts`, `rooms`
4. Import data from `/data/questions.json` and `/data/attempts.json`
