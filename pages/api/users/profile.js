import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' })
    }

    const client = await clientPromise
    const db = client.db('mystiq-quiz')
    const usersCollection = db.collection('users')
    const attemptsCollection = db.collection('attempts')

    // Get user profile
    const user = await usersCollection.findOne({ uid: userId })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Get recent attempts
    const recentAttempts = await attemptsCollection
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray()

    // Calculate current stats
    const allAttempts = await attemptsCollection.find({ userId }).toArray()
    
    const stats = {
      totalAttempts: allAttempts.length,
      totalScore: allAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0),
      highScore: allAttempts.length > 0 ? Math.max(...allAttempts.map(a => a.score || 0)) : 0,
      averageScore: allAttempts.length > 0 
        ? Math.round(allAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / allAttempts.length)
        : 0,
      correctAnswers: allAttempts.reduce((sum, attempt) => 
        sum + (attempt.answers || []).filter(a => a.correct).length, 0),
      totalQuestions: allAttempts.reduce((sum, attempt) => 
        sum + (attempt.totalQuestions || 0), 0)
    }

    // Calculate accuracy
    stats.accuracy = stats.totalQuestions > 0 
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0

    return res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt
      },
      stats,
      recentAttempts
    })

  } catch (error) {
    console.error('User profile API error:', error)
    return res.status(500).json({ error: error.message })
  }
}
