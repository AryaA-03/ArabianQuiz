import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Check active session
    checkUser()

    // Listen for auth changes
    const { data: authListener } = supabase?.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          loadProfile(session.user.id)
        } else {
          setProfile(null)
        }
      }
    ) || { data: null }

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  async function checkUser() {
    if (!supabase) {
      // Demo mode
      const demoUser = {
        id: 'demo-user',
        email: 'demo@arabiannights.com',
        user_metadata: { username: 'Guest Player' }
      }
      setUser(demoUser)
      setProfile({
        id: 'demo-user',
        username: 'Guest Player',
        total_score: 0,
        level: 1,
        badges: []
      })
      setLoading(false)
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        await loadProfile(user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadProfile(userId) {
    if (!supabase) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  async function signUp(email, password, username) {
    if (!supabase) return { error: new Error('Supabase not configured') }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      })

      if (error) throw error

      // Create profile
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          username,
          total_score: 0,
          level: 1,
          badges: []
        })
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async function signIn(email, password) {
    if (!supabase) return { error: new Error('Supabase not configured') }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async function signOut() {
    if (!supabase) {
      setUser(null)
      setProfile(null)
      return
    }

    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  async function updateProfile(updates) {
    if (!supabase || !user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error
      await loadProfile(user.id)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile: () => user && loadProfile(user.id)
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
