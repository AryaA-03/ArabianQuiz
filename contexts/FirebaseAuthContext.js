import { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified
        })
      } else {
        // User is signed out
        setUser(null)
      }
      setLoading(false)
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      setError(null)
      setLoading(true)
      const result = await signInWithPopup(auth, googleProvider)
      
      // Save user to MongoDB
      try {
        await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            emailVerified: result.user.emailVerified
          })
        })
      } catch (dbError) {
        console.error('Failed to save user to database:', dbError)
      }
      
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Google sign-in error:', error)
      let errorMessage = 'Failed to sign in with Google'
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups for this site.'
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.'
      }
      
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      await firebaseSignOut(auth)
      return { success: true }
    } catch (error) {
      console.error('Sign-out error:', error)
      setError('Failed to sign out')
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
