import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Failed to send reset email')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="parchment glow-border">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔑</div>
          <h1 className="text-3xl font-serif font-bold gradient-text mb-2">
            Forgot Password?
          </h1>
          <p className="text-arabian-sand">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-6 rounded-lg">
              <div className="text-4xl mb-3">📧</div>
              <p className="font-semibold mb-2">Check Your Email!</p>
              <p className="text-sm">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-xs mt-2 opacity-75">
                The link will expire in 1 hour
              </p>
            </div>
            
            <div className="text-sm text-arabian-sand">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => {
                  setSuccess(false)
                  setEmail('')
                }}
                className="text-arabian-gold hover:underline"
              >
                try again
              </button>
            </div>

            <Link href="/auth" className="btn-secondary w-full text-center block">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-arabian-gold/30 focus:border-arabian-gold focus:outline-none focus:ring-2 focus:ring-arabian-gold/50 transition-all"
                placeholder="your@email.com"
                required
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
                  Sending...
                </span>
              ) : (
                'Send Reset Link 📨'
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
