import { UserDB } from '../../../lib/db/userSchema'
import { generateToken } from '../../../lib/auth/jwt'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Validate credentials
    const user = await UserDB.validateCredentials(email, password)

    // Generate JWT token
    const token = generateToken(user)

    res.status(200).json({
      success: true,
      user,
      token,
      message: 'Signed in successfully!'
    })
  } catch (error) {
    console.error('Signin error:', error)
    res.status(401).json({ error: error.message || 'Invalid credentials' })
  }
}
