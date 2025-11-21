import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/FirebaseAuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Multiplayer() {
  const { user } = useAuth()
  const router = useRouter()
  const [mode, setMode] = useState(null) // 'global' or 'private'
  const [roomCode, setRoomCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [room, setRoom] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [playerAnswers, setPlayerAnswers] = useState([])
  const [gameFinished, setGameFinished] = useState(false)

  const displayName = user ? (user.displayName || user.email?.split('@')[0] || 'Player') : 'Guest'

  // Poll for room updates when in a room
  useEffect(() => {
    if (!room) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/multiplayer/rooms?roomId=${room.id}`)
        const data = await res.json()
        if (data.success) {
          setRoom(data.room)
          
          // Check if game started
          if (data.room.status === 'playing' && !gameStarted) {
            setGameStarted(true)
            setCurrentQuestionIndex(0)
            setTimeLeft(30)
          }

          // Check if current player finished (not waiting for all players)
          const currentPlayer = data.room.players.find(p => p.userId === user?.uid)
          if (currentPlayer && currentPlayer.finishedAt && !gameFinished) {
            setGameFinished(true)
          }
        }
      } catch (err) {
        console.error('Error polling room:', err)
      }
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(interval)
  }, [room, gameStarted, user, gameFinished])

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameFinished || timeLeft === 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, currentQuestionIndex, gameFinished, timeLeft])

  async function handleGlobalMatch() {
    if (!user) {
      router.push('/auth')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Try to find existing global room
      const findRes = await fetch('/api/multiplayer/rooms?findGlobal=true')
      const findData = await findRes.json()

      if (findData.room) {
        // Join existing room
        const joinRes = await fetch('/api/multiplayer/rooms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'join',
            roomId: findData.room.id,
            userId: user.uid,
            username: displayName,
            userPhoto: user.photoURL
          })
        })

        const joinData = await joinRes.json()
        if (joinData.success) {
          setRoom(joinData.room)
          setMode('global')
        }
      } else {
        // Create new global room
        const createRes = await fetch('/api/multiplayer/rooms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create',
            userId: user.uid,
            username: displayName,
            userPhoto: user.photoURL,
            isGlobal: true
          })
        })

        const createData = await createRes.json()
        if (createData.success) {
          setRoom(createData.room)
          setMode('global')
        }
      }
    } catch (err) {
      setError('Failed to join global match')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreatePrivateRoom() {
    if (!user) {
      router.push('/auth')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/multiplayer/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          userId: user.uid,
          username: displayName,
          userPhoto: user.photoURL,
          isGlobal: false
        })
      })

      const data = await res.json()
      if (data.success) {
        setRoom(data.room)
        setMode('private')
      } else {
        setError(data.error || 'Failed to create room')
      }
    } catch (err) {
      setError('Failed to create room')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleJoinPrivateRoom() {
    if (!user) {
      router.push('/auth')
      return
    }

    if (!roomCode.trim()) {
      setError('Please enter a room code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/multiplayer/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'join',
          roomCode: roomCode.toUpperCase(),
          userId: user.uid,
          username: displayName,
          userPhoto: user.photoURL
        })
      })

      const data = await res.json()
      if (data.success) {
        setRoom(data.room)
        setMode('private')
      } else {
        setError(data.error || 'Failed to join room')
      }
    } catch (err) {
      setError('Failed to join room')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleStartGame() {
    if (!room || room.hostId !== user?.uid) return

    setLoading(true)

    try {
      const res = await fetch('/api/multiplayer/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          roomId: room.id,
          userId: user.uid
        })
      })

      const data = await res.json()
      if (data.success) {
        setRoom(data.room)
        setGameStarted(true)
        setCurrentQuestionIndex(0)
        setTimeLeft(30)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleAnswer(selectedIndex) {
    if (!room || !user) return

    const timeTaken = 30 - timeLeft
    const questionNumber = currentQuestionIndex + 1

    try {
      const res = await fetch('/api/multiplayer/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit',
          roomId: room.id,
          userId: user.uid,
          questionNumber,
          selectedIndex,
          timeTaken
        })
      })

      const data = await res.json()
      if (data.success) {
        setPlayerAnswers([...playerAnswers, {
          questionNumber,
          selectedIndex,
          isCorrect: data.isCorrect,
          points: data.points
        }])

        // Move to next question
        if (currentQuestionIndex < 14) {
          setCurrentQuestionIndex(prev => prev + 1)
          setTimeLeft(30)
        } else {
          // Game finished
          await finishGame()
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleTimeout() {
    // Submit empty answer
    await handleAnswer(-1)
  }

  async function finishGame() {
    try {
      const res = await fetch('/api/multiplayer/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'finish',
          roomId: room.id,
          userId: user.uid
        })
      })

      const data = await res.json()
      if (data.success) {
        // Show completion bonus notification
        if (data.completionBonus > 0) {
          alert(`🎉 Finished #${data.finishPosition}! Bonus: +${data.completionBonus} points`)
        }
      }

      setGameFinished(true)
    } catch (err) {
      console.error(err)
    }
  }

  function copyRoomCode() {
    navigator.clipboard.writeText(room.code)
    alert('Room code copied!')
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="parchment">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-serif font-bold mb-4">Sign In Required</h2>
          <p className="text-arabian-sand mb-6">
            Create an account to play multiplayer matches
          </p>
          <Link href="/auth" className="btn-primary inline-block">
            Sign In / Sign Up
          </Link>
        </div>
      </div>
    )
  }

  // Mode selection screen
  if (!room) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="parchment glow-border">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚔️</div>
            <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
              Multiplayer Mode
            </h1>
            <p className="text-arabian-sand text-lg">
              Challenge players in real-time quiz battles
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="parchment bg-white/5">
              <div className="text-4xl mb-4 text-center">🌍</div>
              <h3 className="text-xl font-bold mb-2">Global Match</h3>
              <p className="text-arabian-sand mb-4">
                Get matched with random players from around the world
              </p>
              <button 
                onClick={handleGlobalMatch}
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Finding Match...' : 'Find Match'}
              </button>
            </div>

            <div className="parchment bg-white/5">
              <div className="text-4xl mb-4 text-center">👥</div>
              <h3 className="text-xl font-bold mb-2">Private Room</h3>
              <p className="text-arabian-sand mb-4">
                Create a room and invite your friends with a code
              </p>
              <div className="space-y-3">
                <button 
                  onClick={handleCreatePrivateRoom}
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Creating...' : 'Create Room'}
                </button>
                <div className="text-center text-arabian-sand">or</div>
                <input
                  type="text"
                  placeholder="Enter Room Code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-arabian-gold/30 rounded-lg text-center uppercase"
                  maxLength={6}
                />
                <button 
                  onClick={handleJoinPrivateRoom}
                  disabled={loading || !roomCode.trim()}
                  className="btn-secondary w-full"
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="btn-secondary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Waiting room
  if (room && !gameStarted) {
    const isHost = room.hostId === user?.uid

    return (
      <div className="max-w-4xl mx-auto">
        <div className="parchment glow-border">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎮</div>
            <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
              {mode === 'global' ? 'Global Match' : 'Private Room'}
            </h2>
            {mode === 'private' && (
              <div className="inline-block parchment bg-white/10 px-6 py-3 mt-3">
                <div className="text-sm text-arabian-sand mb-1">Room Code</div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold gradient-text tracking-wider">
                    {room.code}
                  </div>
                  <button 
                    onClick={copyRoomCode}
                    className="btn-secondary text-sm py-1 px-3"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>👥</span>
              Players ({room.players.length}/10)
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {room.players.map((player, idx) => (
                <div key={idx} className="parchment bg-white/5 flex items-center gap-3 p-3">
                  {player.photoURL ? (
                    <img src={player.photoURL} alt={player.username} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-arabian-gold to-yellow-600 flex items-center justify-center font-bold text-arabian-indigo">
                      {player.username[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">{player.username}</div>
                    {player.isHost && <div className="text-xs text-arabian-gold">👑 Host</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            {isHost ? (
              <button
                onClick={handleStartGame}
                disabled={loading || room.players.length < 2}
                className="btn-primary text-lg px-8 py-3"
              >
                {loading ? 'Starting...' : room.players.length < 2 ? 'Waiting for Players...' : '🚀 Start Game'}
              </button>
            ) : (
              <div className="text-arabian-sand text-lg">
                Waiting for host to start the game...
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Game in progress
  if (gameStarted && !gameFinished && room) {
    const currentQuestion = room.questions?.[currentQuestionIndex]

    if (!currentQuestion) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="parchment glow-border text-center">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl">Loading question...</p>
          </div>
        </div>
      )
    }

    const questionText = currentQuestion.text || currentQuestion.question_text || currentQuestion.question || 'Question not available'
    const questionOptions = currentQuestion.options || []

    return (
      <div className="max-w-4xl mx-auto">
        <div className="parchment glow-border">
          {/* Question Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold">
              Question {currentQuestionIndex + 1}/15
            </div>
            <div className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-arabian-gold'}`}>
              ⏱️ {timeLeft}s
            </div>
          </div>

          {/* Question */}
          <div className="parchment bg-white/10 mb-6 p-6">
            <h2 className="text-2xl font-serif font-bold mb-4">
              {questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="grid gap-4">
            {questionOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="parchment bg-white/5 hover:bg-white/10 text-left p-4 transition-all border-2 border-transparent hover:border-arabian-gold/50"
              >
                <span className="font-bold text-arabian-gold mr-3">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Game finished - show results
  if (gameFinished && room) {
    const topThree = room.players.slice(0, 3)

    return (
      <div className="max-w-6xl mx-auto">
        <div className="parchment glow-border">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
              Game Over!
            </h1>
            <p className="text-arabian-sand text-lg">
              Final Results
            </p>
          </div>

          {/* Top 3 Podium */}
          {topThree.length >= 3 && (
            <div className="grid grid-cols-3 gap-4 mb-8 items-end">
              {[1, 0, 2].map((idx, position) => {
                const player = topThree[idx]
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
                      {player.photoURL ? (
                        <img src={player.photoURL} alt={player.username} className="w-12 h-12 rounded-full mb-2" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arabian-gold to-yellow-600 flex items-center justify-center font-bold text-arabian-indigo mb-2">
                          {player.username[0]}
                        </div>
                      )}
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

          {/* All Players */}
          <div className="parchment bg-white/5 mb-6">
            <h3 className="text-xl font-bold mb-4">All Players</h3>
            <div className="space-y-2">
              {room.players.map((player, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 text-center font-bold text-arabian-gold">
                    #{idx + 1}
                  </div>
                  {player.photoURL ? (
                    <img src={player.photoURL} alt={player.username} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-arabian-gold to-yellow-600 flex items-center justify-center font-bold text-arabian-indigo">
                      {player.username[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">{player.username}</div>
                    {player.finishPosition && (
                      <div className="text-xs text-arabian-sand">
                        Finished {player.finishPosition === 1 ? '1st' : player.finishPosition === 2 ? '2nd' : player.finishPosition === 3 ? '3rd' : `${player.finishPosition}th`}
                        {player.finishPosition <= 3 && ` 🎁 +${player.finishPosition === 1 ? 2000 : player.finishPosition === 2 ? 1000 : 500} bonus`}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold gradient-text">{player.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => router.push('/multiplayer')} className="btn-primary mr-3">
              🎮 Play Again
            </button>
            <Link href="/" className="btn-secondary">
              🏠 Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}
