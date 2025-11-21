import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/FirebaseAuthContext'
import LeaderboardList from '../components/LeaderboardList'

export default function Leaderboard() {
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [scope, setScope] = useState('alltime') // 'alltime', 'weekly', 'monthly'
  const [theme, setTheme] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [loading, setLoading] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [userRank, setUserRank] = useState(null)

  useEffect(() => {
    loadLeaderboard()
    loadHighScore()
  }, [scope, theme, difficulty, user])

  async function loadLeaderboard() {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        scope,
        limit: '100',
        ...(theme !== 'all' && { theme }),
        ...(difficulty !== 'all' && { difficulty })
      })
      
      const res = await fetch(`/api/leaderboard?${params}`)
      const json = await res.json()
      setData(json)
      
      // Find user's rank
      if (user) {
        const userIndex = json.findIndex(p => p.uid === user.uid)
        if (userIndex !== -1) {
          setUserRank({
            rank: userIndex + 1,
            player: json[userIndex]
          })
        } else {
          setUserRank(null)
        }
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadHighScore() {
    try {
      if (!user) {
        setHighScore(0)
        return
      }
      
      const username = user.displayName || user.email?.split('@')[0] || 'Player'
      
      // Get user's attempts and find their highest score
      const res = await fetch(`/api/attempts?all=true&userId=${user.uid}&username=${encodeURIComponent(username)}`)
      const attempts = await res.json()
      
      if (Array.isArray(attempts) && attempts.length > 0) {
        const userHighScore = Math.max(...attempts.map(a => a.score || 0))
        setHighScore(userHighScore)
      } else {
        setHighScore(0)
      }
    } catch (error) {
      console.error('Error loading high score:', error)
      setHighScore(0)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
          🏆 Global Leaderboard
        </h1>
        <p className="text-arabian-sand">
          Compete with players worldwide and climb to the top
        </p>
        
        {/* High Score Display */}
        {user && (
          <div className="mt-6 inline-block parchment glow-border pulse-glow px-8 py-4">
            <div className="text-sm text-arabian-sand mb-1">Your High Score</div>
            <div className="text-4xl font-bold gradient-text">{highScore}</div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          {/* Scope Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { value: 'alltime', label: 'All Time', icon: '⏳' },
              { value: 'monthly', label: 'This Month', icon: '📅' },
              { value: 'weekly', label: 'This Week', icon: '📆' },
              { value: 'daily', label: 'Today', icon: '☀️' }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setScope(tab.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  scope === tab.value
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="parchment text-center py-12">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-arabian-sand">Loading rankings...</p>
            </div>
          ) : (
            <div>
              {/* Top 3 Podium */}
              {data.length >= 3 && (
                <div className="grid grid-cols-3 gap-4 mb-6 items-end">
                  {[1, 0, 2].map((idx, position) => {
                    const player = data[idx]
                    if (!player) return null
                    const medals = ['🥇', '🥈', '🥉']
                    const heights = ['h-32', 'h-40', 'h-28']
                    const colors = [
                      'from-yellow-400 to-yellow-600',
                      'from-yellow-500 to-yellow-700',
                      'from-orange-400 to-orange-600'
                    ]
                    
                    return (
                      <div key={idx} className="text-center">
                        <div className={`parchment ${heights[position]} flex flex-col items-center justify-center mb-2 ${idx === 0 ? 'pulse-glow' : ''}`}>
                          <div className="text-4xl mb-2">{medals[idx]}</div>
                          <div className="font-bold text-lg">{player.username}</div>
                          <div className={`text-2xl font-bold bg-gradient-to-r ${colors[idx]} bg-clip-text text-transparent`}>
                            {player.score}
                          </div>
                        </div>
                        <div className="text-sm text-arabian-sand">#{idx + 1}</div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Full List - Top 10 */}
              <LeaderboardList entries={data.slice(0, 10)} showRank={true} currentUserId={user?.uid} />
              
              {/* User's Rank (if not in top 10) */}
              {user && userRank && userRank.rank > 10 && (
                <div className="mt-6">
                  <div className="text-center text-arabian-sand text-sm mb-2">
                    • • •
                  </div>
                  <div className="parchment glow-border pulse-glow">
                    <div className="text-sm text-arabian-sand mb-3 text-center font-semibold">
                      📍 Your Rank
                    </div>
                    <LeaderboardList 
                      entries={[userRank.player]} 
                      showRank={true} 
                      currentUserId={user.uid}
                      startRank={userRank.rank}
                    />
                  </div>
                </div>
              )}
              
              {/* User not ranked yet */}
              {user && !userRank && highScore === 0 && (
                <div className="mt-6 parchment text-center py-8">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-arabian-sand mb-4">You haven't played any quizzes yet!</p>
                  <a href="/quiz" className="btn-primary inline-block">
                    Play Your First Quiz
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="parchment">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🎯</span> Filters
            </h3>

            <div className="space-y-4">
              {/* Theme Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Story Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-arabian-gold/30 focus:border-arabian-gold focus:outline-none"
                >
                  <option value="all">All Themes</option>
                  <option value="Aladdin">Aladdin 🪔</option>
                  <option value="Sinbad">Sinbad ⛵</option>
                  <option value="Ali Baba">Ali Baba 🗝️</option>
                  <option value="Scheherazade">Scheherazade 👸</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-arabian-gold/30 focus:border-arabian-gold focus:outline-none"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy 🌱</option>
                  <option value="medium">Medium ⚡</option>
                  <option value="hard">Hard 🔥</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="parchment">
            <h3 className="text-lg font-semibold mb-4 gradient-text">
              📊 Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-arabian-sand">Total Players</span>
                <span className="font-bold">{data.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-arabian-sand">High Score</span>
                <span className="font-bold text-arabian-gold">{highScore}</span>
              </div>
              {data.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-arabian-sand">Avg Score</span>
                  <span className="font-bold">
                    {Math.round(data.reduce((sum, p) => sum + p.score, 0) / data.length)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Climb the Ranks CTA */}
          <div className="parchment glow-border pulse-glow">
            <h4 className="font-bold mb-2 gradient-text">🚀 Climb the Ranks!</h4>
            <p className="text-sm text-arabian-sand mb-4">
              Play more quizzes to improve your ranking and unlock exclusive badges
            </p>
            <a href="/quiz" className="btn-primary w-full text-center block">
              Play Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
