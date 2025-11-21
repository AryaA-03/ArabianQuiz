import Link from 'next/link'
import { useAuth } from '../contexts/FirebaseAuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const { user, signOut } = useAuth()
  const { t } = useLanguage()
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    setShowMenu(false)
    router.push('/')
  }

  const displayName = user ? (user.displayName || user.email?.split('@')[0] || 'Player') : null

  return (
    <header className="bg-gradient-to-r from-arabian-indigo via-[#1a1a2e] to-arabian-indigo shadow-lg border-b border-arabian-gold/20 relative z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-start gap-3 group">
          <img 
            src="/assets/logo2.png" 
            alt="MystiQ" 
            className="h-16 w-16 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 drop-shadow-lg"
          />
          <span className="font-serif text-3xl font-bold gradient-text group-hover:tracking-wider transition-all duration-300 leading-none pt-0.5">
            Mysti<span className="text-arabian-gold text-4xl">Q</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/quiz" className="text-white hover:text-arabian-gold transition-colors font-medium flex items-center gap-1">
            <span>🎮</span> {t('play')}
          </Link>
          <Link href="/multiplayer" className="text-white hover:text-arabian-gold transition-colors font-medium flex items-center gap-1">
            <span>👥</span> {t('multiplayer')}
          </Link>
          <Link href="/leaderboard" className="text-white hover:text-arabian-gold transition-colors font-medium flex items-center gap-1">
            <span>🏆</span> {t('leaderboard')}
          </Link>
          {user && (
            <Link href="/profile" className="text-white hover:text-arabian-gold transition-colors font-medium flex items-center gap-1">
              <span>👤</span> {t('profile')}
            </Link>
          )}
          <Link href="/admin" className="text-white hover:text-arabian-gold transition-colors font-medium flex items-center gap-1">
            <span>⚙️</span> {t('admin')}
          </Link>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 btn-primary"
              >
                {user.photoURL && (
                  <img src={user.photoURL} alt={displayName} className="w-6 h-6 rounded-full" />
                )}
                <span className="font-semibold">{displayName}</span>
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 parchment border border-arabian-gold/30 shadow-xl">
                  <div className="px-4 py-2 border-b border-arabian-gold/20">
                    <p className="text-sm text-arabian-sand truncate">{user.email}</p>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 hover:bg-white/5 transition-colors"
                  >
                    {t('myProfile')}
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors text-red-400"
                  >
                    {t('signOut')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" className="btn-primary">
              {t('signIn')}
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden btn-secondary p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden parchment m-4 border border-arabian-gold/30">
          <Link 
            href="/quiz" 
            onClick={() => setShowMenu(false)}
            className="block px-4 py-3 hover:bg-white/5 transition-colors"
          >
            🎮 {t('play')}
          </Link>
          <Link 
            href="/multiplayer" 
            onClick={() => setShowMenu(false)}
            className="block px-4 py-3 hover:bg-white/5 transition-colors"
          >
            👥 {t('multiplayer')}
          </Link>
          <Link 
            href="/leaderboard" 
            onClick={() => setShowMenu(false)}
            className="block px-4 py-3 hover:bg-white/5 transition-colors"
          >
            🏆 {t('leaderboard')}
          </Link>
          {user && (
            <Link 
              href="/profile" 
              onClick={() => setShowMenu(false)}
              className="block px-4 py-3 hover:bg-white/5 transition-colors"
            >
              👤 {t('profile')}
            </Link>
          )}
          <Link 
            href="/admin" 
            onClick={() => setShowMenu(false)}
            className="block px-4 py-3 hover:bg-white/5 transition-colors"
          >
            ⚙️ {t('admin')}
          </Link>
          {user ? (
            <>
              <div className="px-4 py-2 border-t border-arabian-gold/20">
                <p className="text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-arabian-sand truncate">{user.email}</p>
              </div>
              <button 
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-red-400"
              >
                {t('signOut')}
              </button>
            </>
          ) : (
            <Link 
              href="/auth" 
              onClick={() => setShowMenu(false)}
              className="block px-4 py-3 hover:bg-white/5 transition-colors text-arabian-gold"
            >
              {t('signIn')}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
