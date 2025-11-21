import { verifyToken } from '../../../lib/auth/jwt'
import { UserDB } from '../../../lib/db/userSchema'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // Get user from database
    const user = UserDB.getUserById(decoded.userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({ success: true, user })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Failed to get user' })
  }
}
