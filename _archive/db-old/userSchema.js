import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const USERS_FILE = path.resolve('./data/users/users.json')
const RESET_TOKENS_FILE = path.resolve('./data/users/reset-tokens.json')

// Initialize files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]))
}
if (!fs.existsSync(RESET_TOKENS_FILE)) {
  fs.writeFileSync(RESET_TOKENS_FILE, JSON.stringify([]))
}

/**
 * User Schema:
 * {
 *   id: string (uuid),
 *   username: string (unique),
 *   email: string (unique),
 *   password: string (hashed),
 *   createdAt: ISO date string,
 *   verified: boolean,
 *   verificationToken: string | null,
 *   profile: {
 *     total_score: number,
 *     level: number,
 *     badges: array,
 *     quizzesCompleted: number,
 *     lastActive: ISO date string
 *   }
 * }
 */

export class UserDB {
  static getUsers() {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'))
  }

  static saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  }

  static getResetTokens() {
    return JSON.parse(fs.readFileSync(RESET_TOKENS_FILE, 'utf8'))
  }

  static saveResetTokens(tokens) {
    fs.writeFileSync(RESET_TOKENS_FILE, JSON.stringify(tokens, null, 2))
  }

  static async createUser({ username, email, password }) {
    const users = this.getUsers()

    // Check if user already exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already registered')
    }
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      throw new Error('Username already taken')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = {
      id: uuidv4(),
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      verified: true, // Auto-verify for simplicity (can be set to false for email verification)
      verificationToken: null,
      profile: {
        total_score: 0,
        level: 1,
        badges: [],
        quizzesCompleted: 0,
        lastActive: new Date().toISOString()
      }
    }

    users.push(user)
    this.saveUsers(users)

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async validateCredentials(email, password) {
    const users = this.getUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid email or password')
    }

    // Update last active
    user.profile.lastActive = new Date().toISOString()
    this.saveUsers(users)

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static getUserByEmail(email) {
    const users = this.getUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) return null

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static getUserById(id) {
    const users = this.getUsers()
    const user = users.find(u => u.id === id)
    if (!user) return null

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static updateProfile(userId, updates) {
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    users[userIndex].profile = {
      ...users[userIndex].profile,
      ...updates,
      lastActive: new Date().toISOString()
    }

    this.saveUsers(users)
    const { password: _, ...userWithoutPassword } = users[userIndex]
    return userWithoutPassword
  }

  static async createPasswordResetToken(email) {
    const users = this.getUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      throw new Error('No account found with this email')
    }

    const tokens = this.getResetTokens()
    const token = uuidv4()
    const expires = new Date(Date.now() + 3600000).toISOString() // 1 hour from now

    // Remove any existing tokens for this user
    const filteredTokens = tokens.filter(t => t.userId !== user.id)

    filteredTokens.push({
      userId: user.id,
      token,
      expires,
      used: false
    })

    this.saveResetTokens(filteredTokens)
    return { token, email: user.email, username: user.username }
  }

  static async resetPassword(token, newPassword) {
    const tokens = this.getResetTokens()
    const resetToken = tokens.find(t => t.token === token && !t.used)

    if (!resetToken) {
      throw new Error('Invalid or expired reset token')
    }

    if (new Date(resetToken.expires) < new Date()) {
      throw new Error('Reset token has expired')
    }

    // Mark token as used
    resetToken.used = true
    this.saveResetTokens(tokens)

    // Update user password
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === resetToken.userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    users[userIndex].password = hashedPassword
    this.saveUsers(users)

    return true
  }

  static async changePassword(userId, oldPassword, newPassword) {
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const user = users[userIndex]
    const isValid = await bcrypt.compare(oldPassword, user.password)

    if (!isValid) {
      throw new Error('Current password is incorrect')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    users[userIndex].password = hashedPassword
    this.saveUsers(users)

    return true
  }
}
