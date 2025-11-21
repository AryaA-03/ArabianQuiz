import Link from 'next/link'
import { useAuth } from '../contexts/FirebaseAuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Load GenieLamp with no SSR to avoid Three.js hydration issues
const GenieLamp = dynamic(() => import('../components/GenieLamp'), { 
  ssr: false 
})

export default function Home() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState({ totalQuestions: 24, totalPlayers: 1250, totalQuizzes: 5420 })

  useEffect(() => {
    // Animate numbers on load
    const timer = setInterval(() => {
      setStats(prev => ({
        totalQuestions: 24,
        totalPlayers: Math.min(prev.totalPlayers + 13, 1250),
        totalQuizzes: Math.min(prev.totalQuizzes + 42, 5420)
      }))
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Genie Lamp - Bottom Right Corner */}
      <GenieLamp />
      
      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 fade-in">
        <section className="space-y-6">
          <div className="inline-block">
            <span className="text-sm font-semibold text-arabian-gold uppercase tracking-wider">
              🌙 Legendary Tales Await
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
            <span className="gradient-text">{t('heroTitle')}</span>
            <br />
            <span className="text-white">{t('heroSubtitle')}</span>
          </h1>
          
          <p className="text-lg text-arabian-sand leading-relaxed">
            {t('heroDescription')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/quiz" className="btn-primary inline-flex items-center gap-2">
              <span>🎮 {t('startQuiz')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Daily Challenge */}
        <aside className="space-y-6 fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="parchment pulse-glow">
            <div className="flex items-center justify-center mb-3">
              <div className="text-center">
                <h4 className="font-bold text-2xl mb-2">
                  Begin Your Journey
                </h4>
                <p className="text-sm text-arabian-sand">
                  Test Your Knowledge of a Thousand and One Tales
                </p>
              </div>
            </div>
            <Link href="/quiz" className="btn-primary w-full text-center block mt-4">
              Begin Your Journey
            </Link>
          </div>
        </aside>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { label: t('totalQuestions'), value: stats.totalQuestions, icon: '📖', color: 'from-purple-500 to-pink-500' },
          { label: t('totalPlayers'), value: stats.totalPlayers.toLocaleString(), icon: '👥', color: 'from-blue-500 to-cyan-500' },
          { label: t('totalQuizzes'), value: stats.totalQuizzes.toLocaleString(), icon: '🎯', color: 'from-orange-500 to-red-500' }
        ].map((stat, i) => (
          <div key={i} className="parchment text-center fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-sm text-arabian-sand mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* How to Play */}
      <div className="parchment mb-16">
        <h3 className="text-2xl font-serif font-bold mb-6 text-center gradient-text">
          How to Play
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Choose Mode', desc: 'Select difficulty or theme', icon: '🎮' },
            { step: '2', title: 'Answer Questions', desc: '10 questions per quiz', icon: '❓' },
            { step: '3', title: 'Get Feedback', desc: 'Learn from explanations', icon: '💡' },
            { step: '4', title: 'Climb Ranks', desc: 'Top the leaderboard', icon: '🏆' }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-arabian-gold to-yellow-600 flex items-center justify-center text-2xl font-bold text-arabian-indigo group-hover:scale-110 transition-transform">
                {item.step}
              </div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-arabian-sand">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
