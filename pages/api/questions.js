import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const { count = 10, theme, difficulty } = req.query
    
    const client = await clientPromise
    const db = client.db('mystiq-quiz')
    const collection = db.collection('questions')

    // Build filter
    const filter = {}
    if (theme && theme !== 'all') {
      filter.theme = new RegExp(`^${theme}$`, 'i')
    }
    if (difficulty) filter.difficulty = difficulty

    // Get questions
    let questions = await collection.find(filter).toArray()

    // If no questions found and theme was specified, try getting all questions
    if (questions.length === 0 && theme && theme !== 'all') {
      console.log(`No questions found for theme: ${theme}, fetching all questions`)
      questions = await collection.find(difficulty ? { difficulty } : {}).toArray()
    }

    // Shuffle and return count
    questions = questions.sort(() => Math.random() - 0.5).slice(0, Number(count))
    
    // Convert MongoDB _id to string for client-side consistency
    const normalizedQuestions = questions.map(q => ({
      ...q,
      _id: q._id.toString()
    }))
    
    res.status(200).json(normalizedQuestions)
  } catch (error) {
    console.error('Questions API error:', error)
    res.status(500).json({ error: error.message })
  }
}
