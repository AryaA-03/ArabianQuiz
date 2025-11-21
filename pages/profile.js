import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/FirebaseAuthContext'
import { BadgeCard, BADGES, checkBadgeUnlock } from '../components/BadgeSystem'
import Link from 'next/link'

export default function Profile() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [attempts, setAttempts] = useState([])

  useEffect(() => {
    async function loadData() {
      if (user) {
        // Load attempts from API
        try {
          const username = user.displayName || user.email?.split('@')[0] || 'Player'
          const res = await fetch(`/api/attempts?all=true&userId=${user.uid}&username=${encodeURIComponent(username)}`)
          const allAttempts = await res.json()
          setAttempts(Array.isArray(allAttempts) ? allAttempts : [])
          
          // Calculate stats from attempts
          const quizzesCompleted = allAttempts.length || 0
          const totalScore = allAttempts.reduce((sum, a) => sum + (a.score || 0), 0)
          const correctAnswers = allAttempts.reduce((sum, a) => {
            const correct = a.answers?.filter(ans => ans.correct).length || 0
            return sum + correct
          }, 0)
          const totalQuestions = allAttempts.reduce((sum, a) => a.totalQuestions || 0, 0)
          const accuracy = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(1) : '0.0'
          const level = Math.floor(totalScore / 100) + 1

          const statsData = {
            quizzesCompleted,
            totalScore,
            correctAnswers,
            accuracy,
            level,
            currentStreak: 0,
            bestStreak: 0,
            rank: null
          }

          setStats(statsData)

          // Check which badges are unlocked
          const unlockedBadges = checkBadgeUnlock(statsData, allAttempts)
          setAchievements(unlockedBadges)
        } catch (error) {
          console.error('Error loading attempts:', error)
          // Fallback to default values
          setStats({
            quizzesCompleted: 0,
            totalScore: 0,
            correctAnswers: 0,
            accuracy: '0.0',
            level: 1,
            currentStreak: 0,
            bestStreak: 0
          })
        }
      }
    }
    loadData()
  }, [user])

  if (!user || !stats) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="parchment">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-serif font-bold mb-4">Sign In Required</h2>
          <p className="text-arabian-sand mb-6">
            Create an account to track your progress and unlock achievements
          </p>
          <Link href="/auth" className="btn-primary inline-block">
            Sign In / Sign Up
          </Link>
        </div>
      </div>
    )
  }

  const levelProgress = ((stats.totalScore % 100) / 100) * 100

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="parchment glow-border">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-arabian-gold to-yellow-600 flex items-center justify-center text-4xl font-bold text-arabian-indigo shadow-xl pulse-glow">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-24 h-24 rounded-full" />
            ) : (
              (user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-bold gradient-text mb-2">
              {user.displayName || user.email?.split('@')[0] || 'Player'}
            </h1>
            <div className="flex flex-wrap gap-3 mb-3">
              <span className="badge">
                <span className="text-xl">⭐</span>
                Level {stats.level}
              </span>
              <span className="badge">
                <span className="text-xl">🏆</span>
                {stats.totalScore} Points
              </span>
              <span className="badge">
                <span className="text-xl">🔥</span>
                {stats.currentStreak} Day Streak
              </span>
            </div>

            {/* Level Progress */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-arabian-sand">Level {stats.level}</span>
                <span className="text-arabian-gold">{stats.totalScore % 100}/100 XP</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${levelProgress}%` }}></div>
              </div>
            </div>
          </div>

          <Link href="/settings" className="btn-secondary">
            ⚙️ Settings
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Quizzes Completed', value: stats.quizzesCompleted, icon: '📝', color: 'from-blue-500 to-cyan-500' },
          { label: 'Correct Answers', value: stats.correctAnswers, icon: '✅', color: 'from-green-500 to-emerald-500' },
          { label: 'Accuracy', value: `${stats.accuracy}%`, icon: '🎯', color: 'from-purple-500 to-pink-500' },
          { label: 'Best Streak', value: `${stats.bestStreak} days`, icon: '🔥', color: 'from-orange-500 to-red-500' }
        ].map((stat, i) => (
          <div key={i} className="parchment text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-sm text-arabian-sand mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Badges Section */}
      <div className="parchment">
        <h2 className="text-2xl font-serif font-bold mb-6 gradient-text flex items-center gap-2">
          <span className="text-3xl">🏅</span>
          Achievements
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {Object.keys(BADGES).map(badgeKey => (
            <BadgeCard
              key={badgeKey}
              badgeId={badgeKey}
              unlocked={achievements.includes(badgeKey.toLowerCase())}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="parchment">
          <h3 className="text-xl font-serif font-bold mb-4 gradient-text">📊 Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-arabian-sand">Average Score</span>
              <span className="font-bold text-arabian-gold">
                {stats.quizzesCompleted > 0 ? Math.round(stats.totalScore / stats.quizzesCompleted) : 0}/100
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-arabian-sand">Total Questions</span>
              <span className="font-bold">
                {attempts.reduce((sum, a) => sum + (a.totalQuestions || 0), 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-arabian-sand">Perfect Scores</span>
              <span className="font-bold text-green-400">
                {attempts.filter(a => a.score === 100).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-arabian-sand">Questions Answered</span>
              <span className="font-bold text-purple-400">{stats.correctAnswers}</span>
            </div>
          </div>
        </div>

        <div className="parchment">
          <h3 className="text-xl font-serif font-bold mb-4 gradient-text">🎯 Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/quiz" className="btn-primary w-full text-center block">
              🎮 Start New Quiz
            </Link>
            <Link href="/quiz?mode=daily" className="btn-secondary w-full text-center block">
              🌟 Daily Challenge
            </Link>
            <Link href="/leaderboard" className="btn-secondary w-full text-center block">
              🏆 View Leaderboard
            </Link>
            <Link href="/multiplayer" className="btn-secondary w-full text-center block">
              👥 Challenge Friends
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
