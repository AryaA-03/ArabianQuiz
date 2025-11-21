import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ResetPassword() {
  const router = useRouter()
  const { token } = router.query
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        // Redirect to sign in after 3 seconds
        setTimeout(() => {
          router.push('/auth')
        }, 3000)
      } else {
        setError(data.error || 'Failed to reset password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-16">
        <div className="parchment glow-border text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Invalid Reset Link</h1>
          <p className="text-arabian-sand mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link href="/forgot-password" className="btn-primary">
            Request New Link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="parchment glow-border">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-serif font-bold gradient-text mb-2">
            Reset Your Password
          </h1>
          <p className="text-arabian-sand">
            Choose a new password for your account
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-6 rounded-lg">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-semibold mb-2">Password Reset Successfully!</p>
              <p className="text-sm">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <p className="text-xs mt-3 opacity-75">
                Redirecting to sign in page...
              </p>
            </div>

            <Link href="/auth" className="btn-primary w-full text-center block">
              Go to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-arabian-gold/30 focus:border-arabian-gold focus:outline-none focus:ring-2 focus:ring-arabian-gold/50 transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="text-xs text-arabian-sand mt-1">
                Minimum 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-arabian-gold/30 focus:border-arabian-gold focus:outline-none focus:ring-2 focus:ring-arabian-gold/50 transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner"></span>
                  Resetting...
                </span>
              ) : (
                'Reset Password 🔑'
              )}
            </button>

            <div className="text-center">
              <Link href="/auth" className="text-sm text-arabian-gold hover:underline">
                ← Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>

      {/* Loading spinner CSS */}
      <style jsx>{`
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: #1a1a2e;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
