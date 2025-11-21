const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://arya0101:arya1010@cluster0.elro8c3.mongodb.net/?appName=Cluster0';

const newQuestions = [
  // CHARACTERS – EASY (20)
  { question_text: "Who is known as the storyteller of One Thousand and One Nights?", options: ["Scheherazade", "Dinarzad", "Shah Zaman", "Morgiana"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Scheherazade is the legendary storyteller of 1001 Nights." },
  { question_text: "What is the name of Aladdin's monkey companion?", options: ["Abu", "Rajah", "Iago", "Zazu"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Abu is Aladdin's loyal monkey friend." },
  { question_text: "Who discovered the forty thieves' cave?", options: ["Ali Baba", "Sinbad", "Aladdin", "Harun"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Ali Baba is the poor woodcutter who finds the cave." },
  { question_text: "Who is Ali Baba's clever servant?", options: ["Morgiana", "Scheherazade", "Jasmine", "Fatima"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Morgiana helps Ali Baba defeat the thieves." },
  { question_text: "Who is the cruel king Scheherazade marries?", options: ["King Shahryar", "King Solomon", "King Harun", "King Sinbad"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Shahryar marries and kills brides until Scheherazade." },
  { question_text: "What creature is the Roc?", options: ["Giant bird", "Dragon", "Sea serpent", "Giant ape"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "The Roc is a mythical giant bird." },
  { question_text: "Who finds the brass vessel containing a genie?", options: ["A fisherman", "Ali Baba", "Aladdin", "Sinbad"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "A poor fisherman finds the vessel." },
  { question_text: "What is Scheherazade's sister's name?", options: ["Dinarzad", "Morgiana", "Jasmine", "Leila"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Dinarzad helps her in the tales." },
  { question_text: "Who is the hunchback in the tale?", options: ["A jester", "A merchant", "A sailor", "A prince"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "He is a court jester." },
  { question_text: "Aladdin's father's profession?", options: ["Tailor", "Merchant", "Fisherman", "Baker"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "His father was a poor tailor." },
  { question_text: "Who is Sinbad's king he visits?", options: ["King Mihrage", "King Shahryar", "King Kassim", "King Firouz"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Sinbad visits King Mihrage." },
  { question_text: "Who is Aladdin's enemy?", options: ["Maghrebi sorcerer", "Cyclops", "Vizier", "Fisherman"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "The sorcerer tricks Aladdin." },
  { question_text: "Sinbad sails with what companion?", options: ["Hindbad", "Abu", "Cassim", "Ali"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Hindbad listens to Sinbad's tales." },
  { question_text: "Who helps Morgiana identify thieves?", options: ["Ali Baba", "Cassim", "Dinarzad", "Fisherman"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Ali Baba assists her." },
  { question_text: "Who is the vizier's daughter?", options: ["Scheherazade", "Morgiana", "Jasmine", "Leila"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Scheherazade is the vizier's daughter." },
  { question_text: "Who is main storyteller?", options: ["Scheherazade", "Sinbad", "Ali Baba", "Aladdin"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "She tells 1001 tales." },
  { question_text: "What creature helps Sinbad?", options: ["Roc", "Lion", "Camel", "Eagle"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "The Roc helps him escape." },
  { question_text: "Who is the princess Aladdin loves?", options: ["Badroulbadour", "Jasmine", "Leila", "Morgiana"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "Princess Badroulbadour." },
  { question_text: "Who is the porter in many tales?", options: ["A nameless porter", "Abu", "Ali", "Cassim"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "He appears in several stories." },
  { question_text: "Sinbad's profession?", options: ["Sailor", "Merchant", "Tailor", "Fisherman"], correct_index: 0, theme: "Characters", difficulty: "easy", explanation: "He is a sailor adventurer." },

  // CHARACTERS – MEDIUM (20)
  { question_text: "Who is the Caliph appearing in many tales?", options: ["Harun al-Rashid", "Abu Bakr", "Omar", "Ali"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Harun al-Rashid features often." },
  { question_text: "Who accompanies Sinbad as a listener?", options: ["Hindbad", "Cassim", "Ibrahim", "Mustafa"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Hindbad listens to stories." },
  { question_text: "Ali Baba's brother?", options: ["Cassim", "Omar", "Rashid", "Firouz"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Cassim is greedy brother." },
  { question_text: "Name of Grand Vizier?", options: ["Ja'far", "Mustafa", "Omar", "Hassan"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Ja'far serves the caliph." },
  { question_text: "Prince in Ebony Horse?", options: ["Firouz Shah", "Prince Ali", "Prince Ahmed", "Kamar"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Prince Firouz Shah rides it." },
  { question_text: "Aladdin's sorcerer villain?", options: ["Maghrebi", "Jafar", "Zoltar", "Morath"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Maghrebi tricks Aladdin." },
  { question_text: "Three-eyed monster Sinbad meets?", options: ["Cyclops", "Hydra", "Sphinx", "Minotaur"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "He meets a giant cyclops." },
  { question_text: "Porter in Three Apples?", options: ["Nameless", "Hindbad", "Ali", "Mustafa"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "He is unnamed." },
  { question_text: "Princess in Ebony Horse?", options: ["Princess of Bengal", "Jasmine", "Leila", "Badr"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Bengal princess is rescued." },
  { question_text: "Scheherazade's father's role?", options: ["Vizier", "Merchant", "Scholar", "Sailor"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "He is the vizier." },
  { question_text: "Sinbad's crew captain?", options: ["Unnamed", "Rashid", "Kassim", "Ali"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Captain unnamed in tales." },
  { question_text: "Who tries to kill Morgiana?", options: ["Thieves' leader", "Sorcerer", "Vizier", "Fisherman"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "The thieves' leader plots." },
  { question_text: "Who rules Baghdad?", options: ["Caliph Harun", "Shahryar", "Firouz", "Omar"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "The caliph rules there." },
  { question_text: "Who is main antagonist in 40 thieves?", options: ["Thieves' captain", "Cassim", "Sinbad", "Fisherman"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "The captain leads thieves." },
  { question_text: "Who grants Aladdin riches?", options: ["Genie", "Sultan", "Princess", "Vizier"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Genie grants riches." },
  { question_text: "Who helps Sinbad escape serpents?", options: ["Merchants", "Cyclops", "Genie", "Ali"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Merchants rescue Sinbad." },
  { question_text: "Who revives Aladdin?", options: ["Genie of ring", "Lamp genie", "Princess", "Vizier"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Ring's genie saves him." },
  { question_text: "Who judges crimes in Baghdad?", options: ["Qadi", "Vizier", "Sultan", "Merchant"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Qadi is judge." },
  { question_text: "Who is Sinbad's servant?", options: ["Unnamed", "Cassim", "Hassan", "Mustafa"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Servant unnamed." },
  { question_text: "Who is princess kidnapped in Ebony Horse?", options: ["Princess of Persia", "Princess of Egypt", "Princess of China", "Princess of Baghdad"], correct_index: 0, theme: "Characters", difficulty: "medium", explanation: "Persian princess kidnapped." }
];

async function addCharacterQuestions() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('mystiq-quiz');
    const collection = db.collection('questions');
    
    // Get existing questions
    const existing = await collection.find({ theme: "Characters" }).toArray();
    console.log(`📊 Existing Characters questions: ${existing.length}`);
    
    // Filter out duplicates by comparing question text
    const existingTexts = new Set(existing.map(q => q.question_text?.toLowerCase() || q.text?.toLowerCase() || q.question?.toLowerCase()));
    const newUnique = newQuestions.filter(q => !existingTexts.has(q.question_text.toLowerCase()));
    
    console.log(`🆕 New unique questions to add: ${newUnique.length}`);
    
    if (newUnique.length > 0) {
      await collection.insertMany(newUnique);
      console.log(`✅ Added ${newUnique.length} new Characters questions`);
    } else {
      console.log('ℹ️ No new questions to add (all already exist)');
    }
    
    const total = await collection.countDocuments({ theme: "Characters" });
    console.log(`📊 Total Characters questions now: ${total}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('🔒 Connection closed');
  }
}

addCharacterQuestions();
