import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'arabian-nights-secret-key-change-in-production'

export const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      username: user.username 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
