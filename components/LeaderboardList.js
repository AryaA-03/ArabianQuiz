export default function LeaderboardList({ entries = [], showRank = false, currentUserId = null, startRank = 1 }) {
  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400'
    if (rank === 2) return 'text-gray-300'
    if (rank === 3) return 'text-orange-400'
    return 'text-arabian-sand'
  }

  return (
    <div className="parchment">
      <h3 className="text-xl font-serif font-bold mb-4 gradient-text">
        Rankings
      </h3>
      
      {entries.length === 0 ? (
        <div className="text-center py-8 text-arabian-sand">
          <div className="text-4xl mb-2">🏆</div>
          <p>No rankings yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, index) => {
            const rank = startRank + index
            const isTopThree = rank <= 3
            const isCurrentUser = currentUserId && (entry.uid === currentUserId || entry._id === currentUserId)
            
            return (
              <div
                key={entry.uid || entry.user_id || index}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  isCurrentUser
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400 pulse-glow'
                    : isTopThree 
                    ? 'bg-gradient-to-r from-arabian-gold/10 to-transparent border border-arabian-gold/30' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {/* Rank */}
                <div className={`w-12 text-center font-bold text-xl ${getRankColor(rank)}`}>
                  {getRankIcon(rank)}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-arabian-gold to-yellow-600 flex items-center justify-center font-bold text-arabian-indigo">
                  {entry.photoURL ? (
                    <img src={entry.photoURL} alt={entry.username} className="w-full h-full object-cover" />
                  ) : (
                    <span>{entry.username?.[0]?.toUpperCase() || 'U'}</span>
                  )}
                </div>

                {/* Username */}
                <div className="flex-1">
                  <div className="font-semibold text-lg flex items-center gap-2">
                    {entry.username || `Player ${entry.user_id}`}
                    {isCurrentUser && (
                      <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">YOU</span>
                    )}
                  </div>
                  {entry.level && (
                    <div className="text-sm text-arabian-sand">
                      Level {entry.level}
                    </div>
                  )}
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className={`text-2xl font-bold ${isTopThree ? 'gradient-text' : 'text-arabian-gold'}`}>
                    {entry.score}
                  </div>
                  <div className="text-xs text-arabian-sand">points</div>
                </div>

                {/* Badges indicator */}
                {entry.badges_count > 0 && (
                  <div className="badge">
                    🏅 {entry.badges_count}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
