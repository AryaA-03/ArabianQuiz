import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const { scope = 'alltime', limit = 20 } = req.query
  
  try {
    const client = await clientPromise
    const db = client.db('mystiq-quiz')
    const usersCollection = db.collection('users')
    const attemptsCollection = db.collection('attempts')

    // Build time filter for attempts
    let timeFilter = {}
    const now = new Date()
    
    if (scope === 'daily') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      timeFilter = { timestamp: { $gte: today.toISOString() } }
    } else if (scope === 'weekly') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      timeFilter = { timestamp: { $gte: weekAgo.toISOString() } }
    } else if (scope === 'monthly') {
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      timeFilter = { timestamp: { $gte: monthAgo.toISOString() } }
    }

    let leaderboard

    if (scope === 'alltime') {
      // For all-time, use the pre-calculated highScore from users collection
      leaderboard = await usersCollection
        .find({ highScore: { $exists: true, $gt: 0 } })
        .sort({ highScore: -1 })
        .limit(Number(limit))
        .project({
          username: '$displayName',
          score: '$highScore',
          photoURL: 1,
          uid: 1,
          totalAttempts: 1,
          averageScore: 1
        })
        .toArray()
    } else {
      // For time-scoped leaderboards, calculate from attempts
      const pipeline = [
        { $match: timeFilter },
        {
          $group: {
            _id: '$userId',
            username: { $first: '$username' },
            score: { $max: '$score' },
            timestamp: { $max: '$timestamp' }
          }
        },
        { $sort: { score: -1 } },
        { $limit: Number(limit) }
      ]

      const scopedScores = await attemptsCollection.aggregate(pipeline).toArray()

      // Enrich with user data
      leaderboard = await Promise.all(
        scopedScores.map(async (entry) => {
          if (entry._id) {
            const user = await usersCollection.findOne({ uid: entry._id })
            if (user) {
              return {
                username: user.displayName || entry.username,
                score: entry.score,
                photoURL: user.photoURL,
                uid: user.uid,
                timestamp: entry.timestamp
              }
            }
          }
          return {
            username: entry.username || 'Guest',
            score: entry.score,
            timestamp: entry.timestamp
          }
        })
      )
    }

    res.status(200).json(leaderboard)
  } catch (error) {
    console.error('Leaderboard error:', error)
    res.status(500).json({ error: error.message })
  }
}
