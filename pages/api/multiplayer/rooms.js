import clientPromise from '../../../lib/mongodb'

// Generate random room code
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// Select 15 random questions
async function selectQuestions(db) {
  const collection = db.collection('questions')
  const allQuestions = await collection.find({}).toArray()
  const shuffled = allQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 15).map((q, idx) => ({
    ...q,
    questionNumber: idx + 1
  }))
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('mystiq-quiz')
    const roomsCollection = db.collection('rooms')

    if (req.method === 'POST') {
      const { action, roomId, roomCode, userId, username, userPhoto, isGlobal } = req.body

      // CREATE ROOM
      if (action === 'create') {
        const newRoom = {
          id: Date.now().toString(),
          code: generateRoomCode(),
          hostId: userId,
          isGlobal: isGlobal || false,
          status: 'waiting', // waiting, playing, finished
          players: [{
            userId,
            username,
            photoURL: userPhoto,
            isHost: true,
            isReady: false,
            score: 0,
            answers: [],
            finishedAt: null,
            finishPosition: null
          }],
          questions: await selectQuestions(db),
          currentQuestion: 0,
          createdAt: new Date(),
          startedAt: null,
          finishedAt: null
        }

        await roomsCollection.insertOne(newRoom)
        return res.status(201).json({ success: true, room: newRoom })
      }

      // JOIN ROOM
      if (action === 'join') {
        const room = await roomsCollection.findOne({
          $or: [{ id: roomId }, { code: roomCode }]
        })
        
        if (!room) {
          return res.status(404).json({ success: false, error: 'Room not found' })
        }

        if (room.status !== 'waiting') {
          return res.status(400).json({ success: false, error: 'Game already started' })
        }

        // Check if player already in room
        const existingPlayer = room.players.find(p => p.userId === userId)
        if (existingPlayer) {
          return res.status(200).json({ success: true, room })
        }

        // Add player
        room.players.push({
          userId,
          username,
          photoURL: userPhoto,
          isHost: false,
          isReady: false,
          score: 0,
          answers: [],
          finishedAt: null,
          finishPosition: null
        })

        await roomsCollection.updateOne(
          { _id: room._id },
          { $set: { players: room.players } }
        )
        
        return res.status(200).json({ success: true, room })
      }

      // START GAME
      if (action === 'start') {
        const room = await roomsCollection.findOne({ id: roomId })
        
        if (!room) {
          return res.status(404).json({ success: false, error: 'Room not found' })
        }

        if (room.hostId !== userId) {
          return res.status(403).json({ success: false, error: 'Only host can start game' })
        }

        await roomsCollection.updateOne(
          { _id: room._id },
          { 
            $set: { 
              status: 'playing',
              startedAt: new Date(),
              currentQuestion: 0
            }
          }
        )

        const updatedRoom = await roomsCollection.findOne({ _id: room._id })
        return res.status(200).json({ success: true, room: updatedRoom })
      }

      // SUBMIT ANSWER
      if (action === 'submit') {
        const { questionNumber, selectedIndex, timeTaken } = req.body
        const room = await roomsCollection.findOne({ id: roomId })
        
        if (!room) {
          return res.status(404).json({ success: false, error: 'Room not found' })
        }

        const playerIndex = room.players.findIndex(p => p.userId === userId)
        if (playerIndex === -1) {
          return res.status(404).json({ success: false, error: 'Player not found' })
        }

        const question = room.questions.find(q => q.questionNumber === questionNumber)
        const isCorrect = selectedIndex === question.correct_index

        // Calculate points based on speed and correctness
        let points = 0
        if (isCorrect) {
          const basePoints = 1000
          const timeBonus = Math.max(0, 1 - (timeTaken / 30)) * 500
          points = Math.round(basePoints + timeBonus)
        }

        const answer = {
          questionNumber,
          selectedIndex,
          isCorrect,
          timeTaken,
          points,
          timestamp: new Date()
        }

        await roomsCollection.updateOne(
          { _id: room._id },
          { 
            $push: { [`players.${playerIndex}.answers`]: answer },
            $inc: { [`players.${playerIndex}.score`]: points }
          }
        )

        return res.status(200).json({ success: true, points, isCorrect })
      }

      // FINISH GAME (Individual player finishes)
      if (action === 'finish') {
        const room = await roomsCollection.findOne({ id: roomId })
        
        if (!room) {
          return res.status(404).json({ success: false, error: 'Room not found' })
        }

        const playerIndex = room.players.findIndex(p => p.userId === userId)
        if (playerIndex === -1) {
          return res.status(404).json({ success: false, error: 'Player not found' })
        }

        // Check if this player already finished
        if (room.players[playerIndex].finishedAt) {
          return res.status(200).json({ success: true, room })
        }

        // Count how many players have already finished
        const finishedCount = room.players.filter(p => p.finishedAt).length

        // Award completion bonus based on finish position
        let completionBonus = 0
        if (finishedCount === 0) {
          completionBonus = 2000 // 1st place bonus
        } else if (finishedCount === 1) {
          completionBonus = 1000 // 2nd place bonus
        } else if (finishedCount === 2) {
          completionBonus = 500 // 3rd place bonus
        }

        // Update player's finish time and add completion bonus
        await roomsCollection.updateOne(
          { _id: room._id },
          { 
            $set: { 
              [`players.${playerIndex}.finishedAt`]: new Date(),
              [`players.${playerIndex}.finishPosition`]: finishedCount + 1
            },
            $inc: { 
              [`players.${playerIndex}.score`]: completionBonus
            }
          }
        )

        // Check if all players have finished
        const updatedRoom = await roomsCollection.findOne({ _id: room._id })
        const allFinished = updatedRoom.players.every(p => p.finishedAt)

        if (allFinished) {
          // Sort players by score and mark game as finished
          updatedRoom.players.sort((a, b) => b.score - a.score)
          
          await roomsCollection.updateOne(
            { _id: room._id },
            { 
              $set: { 
                status: 'finished',
                finishedAt: new Date(),
                players: updatedRoom.players
              }
            }
          )
        }

        const finalRoom = await roomsCollection.findOne({ _id: room._id })
        return res.status(200).json({ 
          success: true, 
          room: finalRoom,
          completionBonus,
          finishPosition: finishedCount + 1
        })
      }

      return res.status(400).json({ success: false, error: 'Invalid action' })
    }

    // GET ROOM
    if (req.method === 'GET') {
      const { roomId, roomCode, findGlobal } = req.query

      // Find available global room
      if (findGlobal === 'true') {
        const globalRoom = await roomsCollection.findOne({
          isGlobal: true,
          status: 'waiting',
          'players.9': { $exists: false } // Less than 10 players
        })
        
        return res.status(200).json({ success: true, room: globalRoom || null })
      }

      // Get specific room
      if (roomId || roomCode) {
        const room = await roomsCollection.findOne({
          $or: [{ id: roomId }, { code: roomCode }]
        })
        
        if (!room) {
          return res.status(404).json({ success: false, error: 'Room not found' })
        }

        return res.status(200).json({ success: true, room })
      }

      const rooms = await roomsCollection.find({}).toArray()
      return res.status(200).json({ success: true, rooms })
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' })
    
  } catch (error) {
    console.error('Rooms API error:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}
