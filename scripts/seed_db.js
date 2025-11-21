/**
 * Seed script — for Supabase integration you would use the REST/JS client to insert rows.
 * This demo script will simply ensure data/questions.json exists and optionally POST to /api/seed
 */

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const questionsFile = path.resolve('./data/questions.json')
if (!fs.existsSync(questionsFile)) {
  console.error('questions.json not found — make sure data/questions.json exists.')
  process.exit(1)
}

async function seedRemote() {
  try {
    const raw = fs.readFileSync(questionsFile, 'utf8')
    const qs = JSON.parse(raw)
    // For demo, post the first 5 questions to the seed API
    for (let i = 0; i < Math.min(5, qs.length); i++) {
      const q = qs[i]
      await fetch('http://localhost:3000/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: q.text,
          options: q.options,
          correct_index: q.correct_index,
          difficulty: q.difficulty,
          theme: q.theme,
          explanation: q.explanation
        })
      })
      console.log('seeded question:', q.text.slice(0,40))
    }
    console.log('Done seeding.')
  } catch (err) {
    console.error(err)
  }
}

seedRemote();
