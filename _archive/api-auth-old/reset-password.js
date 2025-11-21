import { UserDB } from '../../../lib/db/userSchema'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    // Reset password
    await UserDB.resetPassword(token, password)

    res.status(200).json({
      success: true,
      message: 'Password reset successfully! You can now sign in with your new password.'
    })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(400).json({ error: error.message || 'Failed to reset password' })
  }
}
