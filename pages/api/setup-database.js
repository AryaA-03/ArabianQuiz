// API route to initialize MongoDB database
// Access this at: http://localhost:3000/api/setup-database

import clientPromise from '../../lib/mongodb'
import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST request.' })
  }

  try {
    const client = await clientPromise
    const db = client.db('mystiq-quiz')

    // Drop existing collections
    const collections = await db.listCollections().toArray()
    console.log('Existing collections:', collections.map(c => c.name))
    
    for (const collection of collections) {
      await db.collection(collection.name).drop()
      console.log(`Dropped collection: ${collection.name}`)
    }

    // Read questions from JSON file
    const questionsPath = path.join(process.cwd(), 'data', 'questions.json')
    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'))
    
    // Insert questions
    const questionsCollection = db.collection('questions')
    if (questionsData.length > 0) {
      await questionsCollection.insertMany(questionsData)
      console.log(`Inserted ${questionsData.length} questions`)
    }

    // Read attempts from JSON file
    const attemptsPath = path.join(process.cwd(), 'data', 'attempts.json')
    let attemptsData = []
    try {
      attemptsData = JSON.parse(fs.readFileSync(attemptsPath, 'utf8'))
    } catch (e) {
      console.log('No attempts file found, starting fresh')
    }

    // Insert attempts
    const attemptsCollection = db.collection('attempts')
    if (attemptsData.length > 0) {
      await attemptsCollection.insertMany(attemptsData)
      console.log(`Inserted ${attemptsData.length} attempts`)
    }

    // Create rooms collection
    const roomsCollection = db.collection('rooms')
    await roomsCollection.insertOne({ _initialized: true })
    await roomsCollection.deleteOne({ _initialized: true })
    console.log('Created rooms collection')

    // Create indexes
    await questionsCollection.createIndex({ theme: 1 })
    await questionsCollection.createIndex({ difficulty: 1 })
    console.log('Created indexes on questions')

    await attemptsCollection.createIndex({ userId: 1 })
    await attemptsCollection.createIndex({ timestamp: -1 })
    await attemptsCollection.createIndex({ score: -1 })
    console.log('Created indexes on attempts')

    await roomsCollection.createIndex({ code: 1 }, { unique: true, sparse: true })
    await roomsCollection.createIndex({ status: 1 })
    await roomsCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 7200 })
    console.log('Created indexes on rooms (with TTL)')

    // Get statistics
    const stats = {
      questions: await questionsCollection.countDocuments(),
      attempts: await attemptsCollection.countDocuments(),
      rooms: await roomsCollection.countDocuments()
    }

    return res.status(200).json({
      success: true,
      message: 'Database setup complete!',
      statistics: stats
    })

  } catch (error) {
    console.error('Database setup error:', error)
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.stack
    })
  }
}
