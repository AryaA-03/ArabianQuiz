export const BADGES = {
  BEGINNER: {
    id: 'beginner',
    name: 'Novice Storyteller',
    description: 'Complete your first quiz',
    icon: '📖',
    requirement: 'Complete 1 quiz',
    color: 'from-gray-400 to-gray-600'
  },
  FIRST_WIN: {
    id: 'first_win',
    name: 'First Victory',
    description: 'Score 50+ points in a quiz',
    icon: '🎯',
    requirement: 'Score 50+ points',
    color: 'from-blue-400 to-blue-600'
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a timed quiz with perfect score',
    icon: '⚡',
    requirement: 'Perfect score in timed mode',
    color: 'from-yellow-400 to-orange-600'
  },
  SINBAD: {
    id: 'sinbad',
    name: 'Sinbad Seafarer',
    description: 'Master all Sinbad questions',
    icon: '⛵',
    requirement: 'Answer all Sinbad questions correctly',
    color: 'from-cyan-400 to-blue-600'
  },
  ALADDIN: {
    id: 'aladdin',
    name: 'Aladdin\'s Wisdom',
    description: 'Master all Aladdin questions',
    icon: '🪔',
    requirement: 'Answer all Aladdin questions correctly',
    color: 'from-purple-400 to-pink-600'
  },
  ALI_BABA: {
    id: 'ali_baba',
    name: 'Ali Baba\'s Secret',
    description: 'Master all Ali Baba questions',
    icon: '🗝️',
    requirement: 'Answer all Ali Baba questions correctly',
    color: 'from-amber-400 to-orange-600'
  },
  SCHEHERAZADE: {
    id: 'scheherazade',
    name: 'Scheherazade\'s Tale',
    description: 'Complete 10 quizzes',
    icon: '👸',
    requirement: 'Complete 10 quizzes',
    color: 'from-pink-400 to-rose-600'
  },
  SCHOLAR: {
    id: 'scholar',
    name: 'Scholar of Tales',
    description: 'Answer 100 questions correctly',
    icon: '📚',
    requirement: '100 correct answers',
    color: 'from-green-400 to-emerald-600'
  },
  PERFECTIONIST: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 5 perfect scores',
    icon: '💯',
    requirement: '5 perfect scores',
    color: 'from-yellow-400 to-yellow-600'
  },
  CHAMPION: {
    id: 'champion',
    name: 'Grand Champion',
    description: 'Reach top 10 on leaderboard',
    icon: '👑',
    requirement: 'Top 10 on leaderboard',
    color: 'from-yellow-500 via-yellow-400 to-yellow-600'
  },
  LEGEND: {
    id: 'legend',
    name: 'Living Legend',
    description: 'Reach level 10',
    icon: '⭐',
    requirement: 'Reach level 10',
    color: 'from-indigo-400 via-purple-400 to-pink-400'
  },
  STREAK_MASTER: {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    requirement: '7-day streak',
    color: 'from-red-400 to-orange-600'
  }
}

export function checkBadgeUnlock(stats, attempts = []) {
  const unlockedBadges = []
  
  // BEGINNER: Complete 1 quiz
  if (stats.quizzesCompleted >= 1) {
    unlockedBadges.push('beginner')
  }

  // FIRST_WIN: Score 50+ in a quiz
  if (attempts.some(a => a.score >= 50)) {
    unlockedBadges.push('first_win')
  }

  // SPEED_DEMON: Perfect score in timed mode
  if (attempts.some(a => a.mode === 'timed' && a.score >= (a.totalQuestions * 10))) {
    unlockedBadges.push('speed_demon')
  }

  // SINBAD: Master all Sinbad questions (get all correct in a Sinbad-themed quiz)
  const sinbadAttempt = attempts.find(a => a.theme === 'Sinbad')
  if (sinbadAttempt && sinbadAttempt.answers.every(ans => ans.correct)) {
    unlockedBadges.push('sinbad')
  }

  // ALADDIN: Master all Aladdin questions
  const aladdinAttempt = attempts.find(a => a.theme === 'Aladdin')
  if (aladdinAttempt && aladdinAttempt.answers.every(ans => ans.correct)) {
    unlockedBadges.push('aladdin')
  }

  // ALI_BABA: Master all Ali Baba questions
  const aliBabaAttempt = attempts.find(a => a.theme === 'Ali Baba')
  if (aliBabaAttempt && aliBabaAttempt.answers.every(ans => ans.correct)) {
    unlockedBadges.push('ali_baba')
  }

  // SCHEHERAZADE: Complete 10 quizzes
  if (stats.quizzesCompleted >= 10) {
    unlockedBadges.push('scheherazade')
  }

  // SCHOLAR: 100 correct answers
  if (stats.correctAnswers >= 100) {
    unlockedBadges.push('scholar')
  }

  // PERFECTIONIST: 5 perfect scores
  const perfectScores = attempts.filter(a => a.score >= (a.totalQuestions * 10)).length
  if (perfectScores >= 5) {
    unlockedBadges.push('perfectionist')
  }

  // CHAMPION: Top 10 on leaderboard (check rank)
  if (stats.rank && stats.rank <= 10) {
    unlockedBadges.push('champion')
  }

  // LEGEND: Reach level 10
  if (stats.level >= 10) {
    unlockedBadges.push('legend')
  }

  // STREAK_MASTER: 7-day streak
  if (stats.bestStreak >= 7) {
    unlockedBadges.push('streak_master')
  }

  return unlockedBadges
}

export function BadgeDisplay({ badgeId, size = 'md', showTooltip = true }) {
  const badge = BADGES[badgeId.toUpperCase()]
  if (!badge) return null

  const sizes = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl'
  }

  return (
    <div className={`tooltip ${showTooltip ? '' : ''}`} data-tooltip={badge.name}>
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg pulse-glow`}>
        <span>{badge.icon}</span>
      </div>
    </div>
  )
}

export function BadgeCard({ badgeId, unlocked = false }) {
  const badge = BADGES[badgeId.toUpperCase()]
  if (!badge) return null

  return (
    <div className={`parchment ${unlocked ? 'pulse-glow' : 'opacity-50 grayscale'} transition-all`}>
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-3xl shadow-lg ${unlocked ? 'pulse-glow' : ''}`}>
          {badge.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg">{badge.name}</h4>
          <p className="text-sm text-arabian-sand">{badge.description}</p>
          <p className="text-xs text-arabian-gold mt-1">{badge.requirement}</p>
          {unlocked && (
            <span className="inline-block mt-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              ✓ Unlocked
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
