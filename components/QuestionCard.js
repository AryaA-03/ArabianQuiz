import { useState, useEffect } from 'react'
import clsx from 'clsx'

export default function QuestionCard({ q, index, onAnswer, showTimer, timeLimit = 20, onNext }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  // Get unique question identifier
  const questionId = q._id?.toString() || q.id || index

  useEffect(() => {
    // Reset state when question changes
    setSelected(null)
    setRevealed(false)
    setTimeLeft(timeLimit)
  }, [questionId, timeLimit])

  useEffect(() => {
    if (!showTimer || revealed || selected !== null) return
    if (timeLeft <= 0) {
      handleTimeout()
      return
    }
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, showTimer, revealed, selected])

  function handleTimeout() {
    setRevealed(true)
    onAnswer({ questionId, selectedIndex: null, correct: false, timeTaken: timeLimit })
    // Auto-advance to next question after 2 seconds
    setTimeout(() => {
      if (onNext) onNext()
    }, 2000)
  }

  function choose(i) {
    if (selected !== null) return // Already answered
    setSelected(i)
    const correct = i === q.correct_index
    const timeTaken = timeLimit - timeLeft
    onAnswer({ questionId, selectedIndex: i, correct, timeTaken })
    // Reveal answer immediately after selection
    setTimeout(() => setRevealed(true), 300)
  }

  function handleNext() {
    if (selected === null) return // Must answer first
    if (onNext) {
      onNext()
    }
  }

  return (
    <div className="parchment shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="text-sm text-arabian-sand">Question {index + 1}</div>
          <h3 className="text-lg font-serif mt-1">{q.text || q.question_text || q.question}</h3>
        </div>
        {showTimer && (
          <div className="ml-4 text-right">
            <div className={`text-4xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-arabian-gold'}`}>
              ⏱️ {timeLeft}s
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct_index
          const isSelected = selected === i
          const showCorrect = revealed && isCorrect
          const showWrong = revealed && isSelected && !isCorrect
          
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={selected !== null}
              className={clsx(
                "text-left p-3 rounded-md border transition",
                selected === null
                  ? "bg-transparent border-gray-700 hover:bg-white/5 cursor-pointer"
                  : showCorrect
                    ? "bg-green-700 border-green-500"
                    : showWrong
                      ? "bg-red-700 border-red-500"
                      : "bg-transparent border-gray-700 opacity-50",
                selected === i && !revealed && "bg-arabian-gold/20 border-arabian-gold"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 text-sm font-bold">{String.fromCharCode(65 + i)}</div>
                <div>{opt}</div>
                {revealed && isCorrect && <span className="ml-auto text-green-400">✓</span>}
                {revealed && isSelected && !isCorrect && <span className="ml-auto text-red-400">✗</span>}
              </div>
            </button>
          )
        })}
      </div>

      {revealed && q.explanation && (
        <div className="mt-4 text-sm bg-white/5 p-4 rounded-lg border border-arabian-gold/20">
          <div className="font-semibold text-arabian-gold mb-2">💡 Explanation</div>
          <div className="text-arabian-sand">{q.explanation}</div>
        </div>
      )}

      {revealed && (
        <div className="mt-4">
          <button
            onClick={handleNext}
            className="btn-primary w-full"
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  )
}
