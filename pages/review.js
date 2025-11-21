import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Review() {
  const router = useRouter()
  const { score, total, correct } = router.query
  const [attempt, setAttempt] = useState(null)
  const [expandedQuestions, setExpandedQuestions] = useState({})

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/attempts?latest=true')
      if (res.ok) {
        const data = await res.json()
        setAttempt(data)
      }
    }
    load()
  }, [])

  const numScore = parseInt(score) || 0
  const numTotal = parseInt(total) || 0
  const numCorrect = parseInt(correct) || 0
  const percentage = numTotal > 0 ? Math.round((numCorrect / numTotal) * 100) : 0
  const passed = percentage >= 50

  return (
    <div className="max-w-4xl mx-auto">
      {/* Final Score Card */}
      <div className="parchment glow-border mb-8 text-center">
        <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
        <h1 className="text-4xl font-serif font-bold gradient-text mb-4">
          Quiz Complete!
        </h1>
        
        <div className="mb-6">
          <div className="text-sm text-arabian-sand mb-2">Your Final Score</div>
          <div className="text-7xl font-bold gradient-text mb-2">{numScore}</div>
          <div className="text-xl text-arabian-sand">
            {percentage}% ({numCorrect}/{numTotal} correct)
          </div>
        </div>

        {/* Performance Message */}
        <div className="parchment mb-6 max-w-md mx-auto">
          {percentage >= 90 && (
            <div>
              <div className="text-2xl mb-2">🌟 Outstanding!</div>
              <p className="text-arabian-sand">You're a true Arabian Nights expert!</p>
            </div>
          )}
          {percentage >= 70 && percentage < 90 && (
            <div>
              <div className="text-2xl mb-2">🎯 Great Job!</div>
              <p className="text-arabian-sand">You know your tales well!</p>
            </div>
          )}
          {percentage >= 50 && percentage < 70 && (
            <div>
              <div className="text-2xl mb-2">👍 Good Effort!</div>
              <p className="text-arabian-sand">Keep exploring the stories!</p>
            </div>
          )}
          {percentage < 50 && (
            <div>
              <div className="text-2xl mb-2">📖 Keep Learning!</div>
              <p className="text-arabian-sand">Practice makes perfect!</p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/quiz" className="btn-primary">
            Try Again
          </Link>
          <Link href="/leaderboard" className="btn-secondary">
            View Leaderboard
          </Link>
        </div>
      </div>

      {/* Questions Review */}
      {attempt && attempt.answers && (
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 gradient-text text-center">
            📋 Answer Review
          </h2>
          
          <div className="space-y-4">
            {attempt.answers.map((a, i) => (
              <div 
                key={i} 
                className={`parchment cursor-pointer transition-all hover:scale-[1.02] ${
                  a.correct ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
                }`}
                onClick={() => toggleQuestion(i)}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-2xl ${a.correct ? 'text-green-400' : 'text-red-400'}`}>
                    {a.correct ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-3">
                      Question {i + 1}: {a.question_text || 'Question'}
                    </div>
                    
                    <div className="space-y-2">
                      {/* Your Answer */}
                      {a.selected_text && (
                        <div className={`text-sm p-3 rounded-lg ${
                          a.correct 
                            ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                            : 'bg-red-500/10 border border-red-500/30 text-red-400'
                        }`}>
                          <span className="font-semibold">
                            {a.correct ? '✓ Your answer: ' : '✗ Your answer: '}
                          </span>
                          {a.selected_text}
                        </div>
                      )}
                      
                      {/* Correct Answer (show if wrong) */}
                      {!a.correct && a.correct_text && (
                        <div className="text-sm p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
                          <span className="font-semibold">✓ Correct answer: </span>
                          {a.correct_text}
                        </div>
                      )}
                    </div>
                    
                    {/* Expandable Explanation */}
                    {expandedQuestions[i] && a.explanation && (
                      <div className="text-sm text-arabian-sand bg-white/5 p-4 rounded-lg mt-4 border border-arabian-gold/20 slide-in-right">
                        <div className="flex items-start gap-2">
                          <span className="text-xl">💡</span>
                          <div>
                            <div className="font-semibold text-arabian-gold mb-1">Explanation:</div>
                            <div>{a.explanation}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Click to expand hint */}
                    {a.explanation && (
                      <div className="text-xs text-arabian-sand/60 mt-3 flex items-center gap-1">
                        {expandedQuestions[i] ? '▼' : '▶'} Click to {expandedQuestions[i] ? 'hide' : 'show'} explanation
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
