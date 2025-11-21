import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { UserDB } from '../../../lib/db/userSchema'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists in our database
        let dbUser = UserDB.getUserByEmail(user.email)
        
        if (!dbUser) {
          // Create new user from Google profile
          const username = user.name?.replace(/\s+/g, '') || user.email.split('@')[0]
          dbUser = await UserDB.createUser({
            username,
            email: user.email,
            password: crypto.randomBytes(32).toString('hex'), // Random password
          })
        }
        
        return true
      } catch (error) {
        console.error('Google sign-in error:', error)
        return false
      }
    },
    
    async jwt({ token, user, account }) {
      if (account && user) {
        const dbUser = UserDB.getUserByEmail(user.email)
        if (dbUser) {
          token.userId = dbUser.id
          token.username = dbUser.username
        }
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        const dbUser = UserDB.getUserById(token.userId)
        session.user = {
          ...dbUser,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        }
      }
      return session
    },
  },
  
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
