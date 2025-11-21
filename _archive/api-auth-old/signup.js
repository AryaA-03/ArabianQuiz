import { UserDB } from '../../../lib/db/userSchema'
import { generateToken } from '../../../lib/auth/jwt'
import { sendWelcomeEmail } from '../../../lib/email/mailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { username, email, password } = req.body

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    // Create user
    const user = await UserDB.createUser({ username, email, password })

    // Generate JWT token
    const token = generateToken(user)

    // Send welcome email (non-blocking)
    sendWelcomeEmail({ email: user.email, username: user.username })
      .catch(err => console.error('Failed to send welcome email:', err))

    res.status(201).json({
      success: true,
      user,
      token,
      message: 'Account created successfully!'
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(400).json({ error: error.message || 'Failed to create account' })
  }
}
