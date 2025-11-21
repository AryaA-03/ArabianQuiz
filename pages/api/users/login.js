import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { uid, email, displayName, photoURL, emailVerified } = req.body

    if (!uid || !email) {
      return res.status(400).json({ error: 'Missing required fields: uid and email' })
    }

    const client = await clientPromise
    const db = client.db('mystiq-quiz')
    const usersCollection = db.collection('users')

    // Update or insert user (upsert)
    const result = await usersCollection.updateOne(
      { uid },
      {
        $set: {
          email,
          displayName,
          photoURL,
          emailVerified,
          lastLoginAt: new Date()
        },
        $setOnInsert: {
          uid,
          createdAt: new Date(),
          totalAttempts: 0,
          totalScore: 0
        }
      },
      { upsert: true }
    )

    // Get user stats
    const attemptsCollection = db.collection('attempts')
    const userAttempts = await attemptsCollection.find({ userId: uid }).toArray()
    
    const stats = {
      totalAttempts: userAttempts.length,
      totalScore: userAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0),
      highScore: userAttempts.length > 0 ? Math.max(...userAttempts.map(a => a.score || 0)) : 0,
      averageScore: userAttempts.length > 0 
        ? Math.round(userAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / userAttempts.length)
        : 0
    }

    // Update user stats
    await usersCollection.updateOne(
      { uid },
      { $set: stats }
    )

    return res.status(200).json({
      success: true,
      isNewUser: result.upsertedCount > 0,
      stats
    })

  } catch (error) {
    console.error('User login API error:', error)
    return res.status(500).json({ error: error.message })
  }
}
