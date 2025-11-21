import fs from 'fs'
import path from 'path'

const QUESTIONS_FILE = path.resolve('./data/questions.json')

export default function handler(req, res) {
  if (req.method !== 'POST') {
    const qs = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf8'))
    return res.status(200).json(qs)
  }

  const body = req.body
  const qs = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf8'))
  const newId = qs.length + 1
  const obj = {
    id: newId,
    story: body.story || 'custom',
    theme: body.theme || 'custom',
    difficulty: body.difficulty || 'easy',
    text: body.text,
    options: body.options,
    correct_index: body.correct_index,
    explanation: body.explanation || '',
    source: 'admin'
  }
  qs.push(obj)
  fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(qs, null, 2))
  res.status(201).json({ ok: true, id: newId })
}
