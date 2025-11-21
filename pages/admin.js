import { useState } from 'react'

export default function Admin() {
  const [form, setForm] = useState({ text: '', options: ['', '', '', ''], correct_index: 0, difficulty: 'easy', theme: '' })

  async function submit(e) {
    e.preventDefault()
    await fetch('/api/seed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    alert('Question submitted (seed endpoint). Refresh data to see in quizzes.')
  }

  return (
    <div className="parchment">
      <h3 className="font-serif">Admin — Add Question</h3>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input placeholder="Question text" value={form.text} onChange={e => setForm({...form, text: e.target.value})} className="w-full p-2 rounded bg-transparent border" />
        {[0,1,2,3].map(i => (
          <input key={i} placeholder={`Option ${i+1}`} value={form.options[i]} onChange={e => setForm({...form, options: form.options.map((o,idx) => idx===i?e.target.value:o)})} className="w-full p-2 rounded bg-transparent border" />
        ))}
        <div>
          <label>Correct index</label>
          <select value={form.correct_index} onChange={e => setForm({...form, correct_index: Number(e.target.value)})} className="ml-2 p-1 rounded bg-transparent border">
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div>
          <label>Difficulty</label>
          <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})} className="ml-2 p-1 rounded bg-transparent border">
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-arabian-gold text-arabian-indigo rounded">Add Question</button>
      </form>
    </div>
  )
}
