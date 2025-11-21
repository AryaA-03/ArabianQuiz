import { UserDB } from '../../../lib/db/userSchema'
import { sendPasswordResetEmail } from '../../../lib/email/mailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Create reset token
    const { token, email: userEmail, username } = await UserDB.createPasswordResetToken(email)

    // Send reset email
    await sendPasswordResetEmail({ email: userEmail, username, token })

    res.status(200).json({
      success: true,
      message: 'Password reset link has been sent to your email'
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    // Don't reveal if email exists or not for security
    res.status(200).json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent'
    })
  }
}
