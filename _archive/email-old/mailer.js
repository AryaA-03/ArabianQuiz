import nodemailer from 'nodemailer'

// Create transporter with email configuration
const createTransporter = () => {
  // Use environment variables for email configuration
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  }

  // If no SMTP credentials, use test account for development
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('⚠️  SMTP credentials not found. Emails will be logged to console only.')
    return null
  }

  return nodemailer.createTransport(config)
}

export const sendPasswordResetEmail = async ({ email, username, token }) => {
  const transporter = createTransporter()
  
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${token}`
  
  const mailOptions = {
    from: `"Arabian Nights Quiz" <${process.env.SMTP_USER || 'noreply@arabiannights.com'}>`,
    to: email,
    subject: '🔑 Reset Your Password - Arabian Nights Quiz',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.9));
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .title {
            background: linear-gradient(90deg, #FFD700, #D4AF37, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
          }
          .content {
            color: #f4e9da;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #D4AF37, #FFD700);
            color: #1a1a2e;
            font-weight: 600;
            padding: 15px 40px;
            border-radius: 12px;
            text-decoration: none;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          }
          .footer {
            color: #f4e9da;
            opacity: 0.7;
            font-size: 12px;
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(212, 175, 55, 0.2);
          }
          .warning {
            background: rgba(255, 193, 7, 0.1);
            border-left: 4px solid #FFD700;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #f4e9da;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">🏺 Arabian Nights Quiz</h1>
          </div>
          
          <div class="content">
            <h2 style="color: #FFD700;">Hello ${username}! 👋</h2>
            
            <p>We received a request to reset your password for your Arabian Nights Quiz account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password 🔑</a>
            </div>
            
            <div class="warning">
              <strong>⏰ Important:</strong> This link will expire in 1 hour for security reasons.
            </div>
            
            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            
            <p style="margin-top: 30px;">
              <strong>Can't click the button?</strong> Copy and paste this link into your browser:<br>
              <span style="color: #D4AF37; word-break: break-all;">${resetUrl}</span>
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated message from Arabian Nights Quiz.</p>
            <p>Please do not reply to this email.</p>
            <p style="margin-top: 10px;">🌙 May your journey through a thousand and one tales continue! ⭐</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hello ${username}!

We received a request to reset your password for your Arabian Nights Quiz account.

To reset your password, please visit the following link:
${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

---
Arabian Nights Quiz
May your journey through a thousand and one tales continue!
    `
  }

  // If no transporter (development mode), just log the email
  if (!transporter) {
    console.log('\n📧 ===== PASSWORD RESET EMAIL =====')
    console.log('To:', email)
    console.log('Subject:', mailOptions.subject)
    console.log('Reset URL:', resetUrl)
    console.log('===================================\n')
    return { success: true, info: 'Email logged to console (dev mode)' }
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return { success: true, info }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send reset email')
  }
}

export const sendWelcomeEmail = async ({ email, username }) => {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Arabian Nights Quiz" <${process.env.SMTP_USER || 'noreply@arabiannights.com'}>`,
    to: email,
    subject: '🌟 Welcome to Arabian Nights Quiz!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.9));
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 16px;
            padding: 40px;
          }
          .title {
            background: linear-gradient(90deg, #FFD700, #D4AF37, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 32px;
            text-align: center;
          }
          .content {
            color: #f4e9da;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #D4AF37, #FFD700);
            color: #1a1a2e;
            font-weight: 600;
            padding: 15px 40px;
            border-radius: 12px;
            text-decoration: none;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">🏺 Welcome, ${username}!</h1>
          <div class="content">
            <p>Your Arabian Nights adventure begins now! 🌙</p>
            <p>Test your knowledge of tales from a thousand and one nights, compete on the leaderboard, and unlock exclusive badges!</p>
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/quiz" class="button">Start Your Journey ✨</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  if (!transporter) {
    console.log('\n📧 Welcome email would be sent to:', email)
    return { success: true }
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    // Don't throw error for welcome email - it's not critical
    return { success: false }
  }
}
