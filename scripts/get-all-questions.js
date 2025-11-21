const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://arya0101:arya1010@cluster0.elro8c3.mongodb.net/?appName=Cluster0';

async function getAllQuestions() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db('mystiq-quiz');
    const collection = db.collection('questions');
    
    const questions = await collection.find({}).toArray();
    
    console.log(`📊 Total Questions: ${questions.length}\n`);
    
    // Group by theme
    const byTheme = {};
    questions.forEach(q => {
      const theme = q.theme || 'Unknown';
      if (!byTheme[theme]) byTheme[theme] = [];
      byTheme[theme].push(q);
    });
    
    // Display by theme
    Object.keys(byTheme).sort().forEach(theme => {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📚 THEME: ${theme.toUpperCase()} (${byTheme[theme].length} questions)`);
      console.log('='.repeat(60));
      
      byTheme[theme].forEach((q, idx) => {
        console.log(`\n${idx + 1}. ${q.question_text || q.question || q.text}`);
        console.log(`   Difficulty: ${q.difficulty || 'N/A'}`);
        console.log(`   Options:`);
        (q.options || []).forEach((opt, i) => {
          const marker = i === q.correct_index ? '✓' : ' ';
          console.log(`     ${String.fromCharCode(65 + i)}. ${opt} ${marker}`);
        });
        if (q.explanation) {
          console.log(`   💡 ${q.explanation}`);
        }
      });
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n\n🔒 Connection closed');
  }
}

getAllQuestions();
