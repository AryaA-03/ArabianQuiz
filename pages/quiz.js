import { useEffect, useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import Router from 'next/router'
import { useAuth } from '../contexts/FirebaseAuthContext'

export default function Quiz() {
  const { user, loading: authLoading } = useAuth()
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [modeTimed, setModeTimed] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState('mixed')
  const [theme, setTheme] = useState('all')
  const [loading, setLoading] = useState(false)

  // Get display name for user
  const displayName = user ? (user.displayName || user.email?.split('@')[0] || 'Player') : 'Guest Player'

  async function startQuiz() {
    setLoading(true)
    try {
      // Build query params - use 20 questions for better variety
      const params = new URLSearchParams({
        count: '20',
        ...(difficulty !== 'mixed' && { difficulty }),
        ...(theme !== 'all' && { theme })
      })
      
      const res = await fetch(`/api/questions?${params}`)
      const data = await res.json()
      
      // Normalize question data to ensure consistent field names
      const normalizedQuestions = data.map((q, idx) => ({
        ...q,
        id: q._id?.toString() || q.id || `q_${idx}`,
        text: q.text || q.question_text || q.question,
        options: q.options || [],
        correct_index: q.correct_index ?? q.correctIndex ?? 0
      }))
      
      setQuestions(normalizedQuestions)
      setGameStarted(true)
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleAnswer({ questionId, selectedIndex, correct, timeTaken }) {
    const currentQuestion = questions[index]
    
    // Store complete answer data for review
    setAnswers(prev => [...prev, { 
      questionId, 
      selectedIndex, 
      correct, 
      timeTaken,
      question_text: currentQuestion.text || currentQuestion.question_text || currentQuestion.question,
      selected_text: selectedIndex !== null ? currentQuestion.options[selectedIndex] : 'No answer',
      correct_text: currentQuestion.options[currentQuestion.correct_index],
      explanation: currentQuestion.explanation,
      all_options: currentQuestion.options
    }])
    
    if (correct) {
      let gained = 10
      if (modeTimed) {
        // Time bonus: up to 5 extra points for quick answers
        gained += Math.max(0, Math.floor((20 - timeTaken) * 0.25))
      }
      // Difficulty bonus
      const q = questions[index]
      if (q.difficulty === 'hard') gained += 5
      else if (q.difficulty === 'medium') gained += 2
      
      setScore(s => s + gained)
    } else {
      setScore(s => Math.max(0, s - 2))
    }
  }

  function handleNextQuestion() {
    if (index + 1 < questions.length) {
      setIndex(index + 1)
    } else {
      finishQuiz()
    }
  }

  async function finishQuiz() {
    // Calculate correct answers
    const correctCount = answers.filter(a => a.correct).length
    
    // Submit attempt
    await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score,
        answers,
        mode: modeTimed ? 'timed' : 'solo',
        difficulty,
        theme,
        totalQuestions: questions.length,
        username: displayName,
        userId: user?.uid || 'guest'
      })
    })
    
    Router.push(`/review?score=${score}&total=${questions.length}&correct=${correctCount}`)
  }

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="parchment glow-border">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
              🎮 Choose Your Challenge
            </h1>
            <p className="text-arabian-sand">
              Customize your quiz experience and test your knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Difficulty Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>⚔️</span> Difficulty Level
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'easy', label: 'Easy', desc: 'Perfect for beginners', icon: '🌱', color: 'green' },
                  { value: 'medium', label: 'Medium', desc: 'Test your knowledge', icon: '⚡', color: 'yellow' },
                  { value: 'hard', label: 'Hard', desc: 'Expert challenge', icon: '🔥', color: 'red' },
                  { value: 'mixed', label: 'Mixed', desc: 'Variety of all levels', icon: '🎲', color: 'purple' }
                ].map(d => (
                  <button
                    key={d.value}
                    onClick={() => setDifficulty(d.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      difficulty === d.value
                        ? `border-${d.color}-500 bg-${d.color}-500/20`
                        : 'border-arabian-gold/20 hover:border-arabian-gold/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{d.icon}</span>
                      <div>
                        <div className="font-semibold">{d.label}</div>
                        <div className="text-sm text-arabian-sand">{d.desc}</div>
                      </div>
                      {difficulty === d.value && (
                        <span className="ml-auto text-arabian-gold">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>📚</span> Story Theme
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'all', label: 'All Stories', icon: '🌟' },
                  { value: 'Aladdin', label: 'Aladdin', icon: '🪔' },
                  { value: 'Sinbad', label: 'Sinbad', icon: '⛵' },
                  { value: 'Ali Baba', label: 'Ali Baba', icon: '🗝️' },
                  { value: 'Scheherazade', label: 'Scheherazade', icon: '👸' }
                ].map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      theme === t.value
                        ? 'border-arabian-gold bg-arabian-gold/20'
                        : 'border-arabian-gold/20 hover:border-arabian-gold/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{t.icon}</span>
                      <div className="font-semibold">{t.label}</div>
                      {theme === t.value && (
                        <span className="ml-auto text-arabian-gold">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Game Options */}
          <div className="parchment mb-8">
            <h3 className="text-lg font-semibold mb-4">Game Options</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={modeTimed}
                onChange={(e) => setModeTimed(e.target.checked)}
                className="w-5 h-5 rounded border-arabian-gold/30 text-arabian-gold focus:ring-arabian-gold"
              />
              <div>
                <div className="font-semibold">⏱️ Timed Mode</div>
                <div className="text-sm text-arabian-sand">20 seconds per question with time bonus</div>
              </div>
            </label>
          </div>

          <button
            onClick={startQuiz}
            disabled={loading}
            className="btn-primary w-full text-xl py-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="spinner border-2 w-5 h-5"></div>
                Loading Questions...
              </span>
            ) : (
              'Start Quiz 🚀'
            )}
          </button>
        </div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="text-center py-16">
        <div className="spinner mx-auto mb-4"></div>
        <p>Loading questions…</p>
      </div>
    )
  }

  const q = questions[index]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress and Score Header */}
      <div className="parchment">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm text-arabian-sand">Current Score</div>
            <div className="text-3xl font-bold gradient-text">{score}</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-arabian-sand">Progress</div>
            <div className="text-2xl font-bold">
              {index + 1} / {questions.length}
            </div>
          </div>
          
          {modeTimed && (
            <div className="text-right">
              <div className="text-sm text-arabian-sand">Time Left</div>
              <div className="text-3xl font-bold text-arabian-gold" id="timer-display">
                {/* Timer will be shown here */}
              </div>
            </div>
          )}
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard 
        q={q} 
        index={index} 
        onAnswer={handleAnswer} 
        showTimer={modeTimed} 
        timeLimit={20}
        onNext={handleNextQuestion}
      />
    </div>
  )
}

function handleNextQuestion() {
  if (index + 1 < questions.length) {
    setIndex(index + 1)
  } else {
    finishQuiz()
  }
}
