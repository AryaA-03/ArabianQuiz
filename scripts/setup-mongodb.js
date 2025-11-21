import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const uri = process.env.MONGODB_URI || 'mongodb+srv://arya0101:arya1010@cluster0.elro8c3.mongodb.net/?appName=Cluster0'

async function seedDatabase() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  })

  try {
    console.log('🔌 Connecting to MongoDB Atlas...')
    console.log('📡 Using URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//****:****@'))
    await client.connect()
    console.log('✅ Connected successfully!')

    const db = client.db('mystiq-quiz')
    console.log('📊 Database: mystiq-quiz')

    // Create collections
    console.log('\n📦 Creating collections...')

    // 1. Questions Collection
    const questionsFile = path.resolve('./data/questions.json')
    if (fs.existsSync(questionsFile)) {
      const questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'))
      
      await db.collection('questions').drop().catch(() => {})
      await db.collection('questions').insertMany(questions)
      console.log(`✅ Inserted ${questions.length} questions`)
    }

    // 2. Attempts Collection
    const attemptsFile = path.resolve('./data/attempts.json')
    if (fs.existsSync(attemptsFile)) {
      const attempts = JSON.parse(fs.readFileSync(attemptsFile, 'utf8'))
      
      if (attempts.length > 0) {
        await db.collection('attempts').drop().catch(() => {})
        await db.collection('attempts').insertMany(attempts)
        console.log(`✅ Inserted ${attempts.length} attempts`)
      }
    }

    // 3. Rooms Collection (for multiplayer)
    await db.collection('rooms').drop().catch(() => {})
    await db.createCollection('rooms')
    console.log('✅ Created rooms collection')

    // Create indexes for better performance
    console.log('\n🔍 Creating indexes...')
    
    // Questions indexes
    await db.collection('questions').createIndex({ theme: 1 })
    await db.collection('questions').createIndex({ difficulty: 1 })
    console.log('✅ Created questions indexes')

    // Attempts indexes
    await db.collection('attempts').createIndex({ userId: 1 })
    await db.collection('attempts').createIndex({ timestamp: -1 })
    await db.collection('attempts').createIndex({ score: -1 })
    console.log('✅ Created attempts indexes')

    // Rooms indexes
    await db.collection('rooms').createIndex({ code: 1 }, { unique: true, sparse: true })
    await db.collection('rooms').createIndex({ status: 1 })
    console.log('✅ Created rooms indexes')

    // Users collection and indexes
    await db.collection('users').createIndex({ uid: 1 }, { unique: true })
    await db.collection('users').createIndex({ email: 1 })
    await db.collection('users').createIndex({ lastLoginAt: -1 })
    console.log('✅ Created users collection and indexes')

    // Display statistics
    console.log('\n📈 Database Statistics:')
    const stats = {
      questions: await db.collection('questions').countDocuments(),
      attempts: await db.collection('attempts').countDocuments(),
      rooms: await db.collection('rooms').countDocuments(),
      users: await db.collection('users').countDocuments()
    }
    
    console.log(`   Questions: ${stats.questions}`)
    console.log(`   Attempts: ${stats.attempts}`)
    console.log(`   Rooms: ${stats.rooms}`)
    console.log(`   Users: ${stats.users}`)

    console.log('\n🎉 Database setup complete!')
    console.log('🔗 Connection string configured in .env.local')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    await client.close()
    console.log('\n👋 Connection closed')
  }
}

// Run the seed
seedDatabase()
