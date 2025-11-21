import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('mystiq-quiz')
    const collection = db.collection('attempts')

    if (req.method === 'POST') {
      const body = req.body
      const record = {
        score: body.score || 0,
        answers: body.answers || [],
        mode: body.mode || 'solo',
        difficulty: body.difficulty || 'mixed',
        theme: body.theme || 'all',
        totalQuestions: body.totalQuestions || 0,
        username: body.username || 'Guest',
        userId: body.userId || null,
        timestamp: new Date().toISOString()
      }
      
      const result = await collection.insertOne(record)
      
      // Update user stats if userId exists
      if (body.userId) {
        const usersCollection = db.collection('users')
        
        // Get all user attempts including this new one
        const userAttempts = await collection.find({ userId: body.userId }).toArray()
        
        const stats = {
          totalAttempts: userAttempts.length,
          totalScore: userAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0),
          highScore: Math.max(...userAttempts.map(a => a.score || 0)),
          averageScore: Math.round(userAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / userAttempts.length),
          lastAttemptAt: new Date()
        }
        
        // Update user stats
        await usersCollection.updateOne(
          { uid: body.userId },
          { $set: stats }
        )
      }
      
      return res.status(201).json({ ok: true, id: result.insertedId })
      
    } else {
      // GET
      // If query all=true, return all attempts (optionally filtered by userId)
      if (req.query.all === 'true') {
        const { userId, username } = req.query
        
        if (userId && userId !== 'guest') {
          // Filter attempts by userId (or fallback to username for backwards compatibility)
          const userAttempts = await collection.find({
            $or: [
              { userId: userId },
              { username: username, userId: { $exists: false } }
            ]
          }).sort({ timestamp: -1 }).toArray()
          
          return res.status(200).json(userAttempts)
        }
        
        const allAttempts = await collection.find({}).sort({ timestamp: -1 }).toArray()
        return res.status(200).json(allAttempts)
      }
      
      // Otherwise return latest
      const latest = await collection.findOne({}, { sort: { timestamp: -1 } })
      return res.status(200).json(latest)
    }
  } catch (error) {
    console.error('Attempts API error:', error)
    res.status(500).json({ error: error.message })
  }
}
