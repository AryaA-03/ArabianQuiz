const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://arya0101:arya1010@cluster0.elro8c3.mongodb.net/?appName=Cluster0';

const newQuestions = [
  // Characters - Easy (10 new questions)
  {
    question_text: "Who is known as the storyteller of One Thousand and One Nights?",
    options: ["Scheherazade", "Dinarzad", "Shah Zaman", "Morgiana"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "Scheherazade is the legendary Persian queen and storyteller of One Thousand and One Nights."
  },
  {
    question_text: "What is the name of Aladdin's monkey companion?",
    options: ["Abu", "Rajah", "Iago", "Zazu"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "Abu is Aladdin's loyal monkey friend who accompanies him on his adventures."
  },
  {
    question_text: "Who was the poor woodcutter who discovered the forty thieves' cave?",
    options: ["Ali Baba", "Sinbad", "Aladdin", "Harun"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "Ali Baba is the woodcutter who stumbles upon the secret cave of the forty thieves."
  },
  {
    question_text: "What is the name of Ali Baba's clever servant girl?",
    options: ["Morgiana", "Scheherazade", "Jasmine", "Fatima"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "Morgiana is Ali Baba's intelligent servant who helps defeat the forty thieves."
  },
  {
    question_text: "Who is the cruel king that Scheherazade marries?",
    options: ["King Shahryar", "King Solomon", "King Harun", "King Sinbad"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "King Shahryar is the king who married and executed a new bride each day until Scheherazade's stories."
  },
  {
    question_text: "What kind of creature is the Roc in Sinbad's adventures?",
    options: ["Giant bird", "Dragon", "Sea serpent", "Giant ape"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "The Roc is a gigantic mythical bird that appears in Sinbad's voyages."
  },
  {
    question_text: "Who was the fisherman who found the brass vessel?",
    options: ["A poor fisherman", "Sinbad", "Aladdin", "Ali Baba"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "A poor fisherman discovers a brass vessel containing a genie in one of the tales."
  },
  {
    question_text: "What is Scheherazade's sister's name?",
    options: ["Dinarzad", "Morgiana", "Jasmine", "Leila"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "Dinarzad is Scheherazade's younger sister who helps her tell the stories each night."
  },
  {
    question_text: "Who is the hunchback in 'The Tale of the Hunchback'?",
    options: ["A court jester", "A merchant", "A sailor", "A prince"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "The hunchback is a court jester whose apparent death sets off a chain of events."
  },
  {
    question_text: "What profession does Aladdin's father have?",
    options: ["Tailor", "Merchant", "Fisherman", "Baker"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "easy",
    explanation: "Aladdin's father, Mustapha, was a poor tailor before his death."
  },

  // Characters - Medium (10 new questions)
  {
    question_text: "Who is the Caliph that appears in many Arabian Nights tales?",
    options: ["Harun al-Rashid", "Abu Bakr", "Umar ibn al-Khattab", "Ali ibn Abi Talib"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "Harun al-Rashid was a real Abbasid Caliph who appears as a character in many tales."
  },
  {
    question_text: "What is the name of Sinbad's porter companion?",
    options: ["Hindbad", "Kassim", "Mustafa", "Ibrahim"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "Hindbad the Porter listens to Sinbad the Sailor's tales of adventure."
  },
  {
    question_text: "Who is Ali Baba's greedy brother?",
    options: ["Cassim", "Hassan", "Omar", "Rashid"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "Cassim is Ali Baba's wealthy but greedy brother who meets a tragic end."
  },
  {
    question_text: "What is the name of the Grand Vizier in many tales?",
    options: ["Ja'far", "Hassan", "Mustafa", "Omar"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "Ja'far al-Barmaki was Harun al-Rashid's Grand Vizier and appears in many stories."
  },
  {
    question_text: "Who is the prince in 'The Ebony Horse' tale?",
    options: ["Prince Firouz Shah", "Prince Ali", "Prince Ahmed", "Prince Kamar"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "Prince Firouz Shah is the protagonist who receives the magical ebony horse."
  },
  {
    question_text: "What is the name of the evil sorcerer in Aladdin?",
    options: ["The Maghrebi", "Jafar", "Mozenrath", "Malcho"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "The Maghrebi (the Maghrrebian) is the evil sorcerer who tricks Aladdin."
  },
  {
    question_text: "Who is the three-eyed monster that Sinbad encounters?",
    options: ["A cyclops", "A hydra", "A sphinx", "A minotaur"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "Sinbad encounters a one-eyed cyclops-like giant in his third voyage."
  },
  {
    question_text: "What is the name of the porter in 'The Three Apples'?",
    options: ["A nameless porter", "Hindbad", "Mustafa", "Ali"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "The porter in 'The Three Apples' is not named in the original tale."
  },
  {
    question_text: "Who is the beautiful princess in 'The Ebony Horse'?",
    options: ["Princess of Bengal", "Princess Jasmine", "Princess Badr", "Princess Leila"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "The Princess of Bengal is rescued by Prince Firouz Shah in the tale."
  },
  {
    question_text: "What is Scheherazade's father's profession?",
    options: ["Vizier", "Merchant", "Scholar", "Soldier"],
    correct_index: 0,
    theme: "Characters",
    difficulty: "medium",
    explanation: "Scheherazade's father was the Grand Vizier to King Shahryar."
  },

  // Plot & Stories - Easy (10 new questions)
  {
    question_text: "How many nights did Scheherazade tell stories?",
    options: ["1001 nights", "500 nights", "365 nights", "100 nights"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "Scheherazade told stories for 1001 nights to save her life and other women."
  },
  {
    question_text: "What did Ali Baba say to open the cave?",
    options: ["Open Sesame", "Abracadabra", "Open Cave", "Alakazam"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "'Open Sesame' is the famous magic phrase that opens the thieves' cave."
  },
  {
    question_text: "What happens when Aladdin rubs the lamp?",
    options: ["A genie appears", "Gold appears", "Fire starts", "The lamp glows"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "When Aladdin rubs the magic lamp, a powerful genie appears to grant wishes."
  },
  {
    question_text: "How does Scheherazade save her life each night?",
    options: ["By stopping the story at dawn", "By making the king laugh", "By singing songs", "By cooking meals"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "Scheherazade stops her story at dawn, making the king spare her to hear the ending."
  },
  {
    question_text: "Where does Aladdin find the magic lamp?",
    options: ["In a cave", "In the ocean", "In a palace", "In a market"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "Aladdin finds the magic lamp in a magical cave filled with treasures."
  },
  {
    question_text: "How many voyages did Sinbad the Sailor make?",
    options: ["Seven", "Five", "Ten", "Three"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "Sinbad the Sailor is famous for his seven fantastic voyages."
  },
  {
    question_text: "What did the fisherman find in the brass vessel?",
    options: ["A genie", "Gold coins", "A map", "A message"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "The fisherman finds an angry genie trapped in the brass vessel."
  },
  {
    question_text: "Why did King Shahryar marry a new bride each day?",
    options: ["His first wife betrayed him", "It was tradition", "For power", "For wealth"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "King Shahryar's first wife's betrayal led him to distrust all women."
  },
  {
    question_text: "What does Morgiana pour into the oil jars?",
    options: ["Boiling oil", "Water", "Wine", "Sand"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "Morgiana pours boiling oil into the jars to kill the hidden thieves."
  },
  {
    question_text: "What happens at the end of Scheherazade's tales?",
    options: ["The king spares her life", "She escapes", "She becomes queen", "She dies"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "easy",
    explanation: "After 1001 nights, the king falls in love with Scheherazade and spares her."
  },

  // Plot & Stories - Medium (10 new questions)
  {
    question_text: "In which voyage does Sinbad encounter the Old Man of the Sea?",
    options: ["Fifth voyage", "Third voyage", "First voyage", "Seventh voyage"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "Sinbad encounters the Old Man of the Sea in his fifth voyage."
  },
  {
    question_text: "What causes the death of Cassim in Ali Baba's tale?",
    options: ["He forgets the magic words", "The thieves kill him", "He drowns", "He falls"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "Cassim forgets the words 'Open Sesame' and is trapped in the cave."
  },
  {
    question_text: "How does Scheherazade finally convince the king?",
    options: ["Through her wisdom and stories", "Through magic", "Through her beauty", "Through wealth"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "Scheherazade's wisdom, stories, and virtue convince the king to spare her."
  },
  {
    question_text: "What is special about the ebony horse?",
    options: ["It can fly", "It talks", "It's invisible", "It grants wishes"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "The ebony horse is a magical flying horse that can travel great distances."
  },
  {
    question_text: "How does Morgiana identify the thieves' leader?",
    options: ["By marking his house", "By his voice", "By his clothes", "By his sword"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "Morgiana marks all the houses in the neighborhood to confuse the thieves."
  },
  {
    question_text: "What happens to the genie who was trapped for centuries?",
    options: ["He becomes vengeful", "He becomes grateful", "He becomes wise", "He disappears"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "The genie becomes vengeful after being trapped and vows to kill his liberator."
  },
  {
    question_text: "How many wishes does Aladdin's lamp genie grant?",
    options: ["Unlimited", "Three", "Seven", "One"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "Unlike typical genies, Aladdin's genie grants unlimited wishes to the lamp's owner."
  },
  {
    question_text: "What island does Sinbad discover with giant eggs?",
    options: ["Roc's island", "Diamond island", "Serpent island", "Whale island"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "Sinbad discovers an island with giant Roc eggs during one of his voyages."
  },
  {
    question_text: "How does Ali Baba dispose of Cassim's body?",
    options: ["Morgiana helps hide it", "He buries it secretly", "He leaves it", "He burns it"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "Morgiana cleverly helps Ali Baba hide and bury Cassim's body."
  },
  {
    question_text: "What test does Scheherazade's father give her?",
    options: ["He doesn't test her", "A riddle test", "A courage test", "A wisdom test"],
    correct_index: 0,
    theme: "Plot & Stories",
    difficulty: "medium",
    explanation: "Scheherazade volunteers herself despite her father's concerns."
  },

  // Magic & Mythology - Easy (10 new questions)
  {
    question_text: "What magical creature grants wishes in Aladdin?",
    options: ["Genie", "Dragon", "Phoenix", "Fairy"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "A genie (or djinn) is the magical creature that grants Aladdin's wishes."
  },
  {
    question_text: "What magical words open the thieves' cave?",
    options: ["Open Sesame", "Sim Sala Bim", "Hocus Pocus", "Presto"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "'Open Sesame' are the magical words that open and close the cave."
  },
  {
    question_text: "What is a Roc?",
    options: ["A giant bird", "A flying carpet", "A magic lamp", "A treasure chest"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "A Roc is a legendary giant bird from Arabian and Persian mythology."
  },
  {
    question_text: "What magical object does Aladdin possess?",
    options: ["A magic lamp", "A magic carpet", "A magic ring", "A magic sword"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "Aladdin's magic lamp contains a powerful genie that grants wishes."
  },
  {
    question_text: "What creature is trapped in the fisherman's bottle?",
    options: ["An ifrit (evil genie)", "A dragon", "A ghost", "A demon"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "An ifrit, a type of evil genie, is trapped in the brass bottle."
  },
  {
    question_text: "What transportation method is magical in Arabian Nights?",
    options: ["Flying carpet", "Magic horse", "Cloud", "Boat"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "Flying carpets are one of the most iconic magical items in Arabian Nights."
  },
  {
    question_text: "What type of beings are genies?",
    options: ["Djinn", "Angels", "Demons", "Spirits"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "Genies are djinn, supernatural beings made of smokeless fire."
  },
  {
    question_text: "What happens when you rub Aladdin's lamp?",
    options: ["The genie appears", "It shines bright", "It gets hot", "It disappears"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "Rubbing the lamp summons the powerful genie who serves the lamp's owner."
  },
  {
    question_text: "What magical feature does the ebony horse have?",
    options: ["It can fly", "It talks", "It's invisible", "It changes size"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "The ebony horse is magical because it can fly through the air."
  },
  {
    question_text: "What do genies live in according to the tales?",
    options: ["Lamps and bottles", "Palaces", "Caves", "Trees"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "easy",
    explanation: "Genies are often found trapped in lamps, bottles, or vessels."
  },

  // Magic & Mythology - Medium (10 new questions)
  {
    question_text: "What are the different types of djinn mentioned?",
    options: ["Ifrit, Marid, Ghul", "Fire, Water, Earth", "Good, Evil, Neutral", "Male, Female, Child"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "Ifrit, Marid, and Ghul are different classes of djinn in Arabian mythology."
  },
  {
    question_text: "What material are djinn created from?",
    options: ["Smokeless fire", "Clay", "Light", "Wind"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "According to Islamic tradition, djinn are created from smokeless fire."
  },
  {
    question_text: "What powers the ebony horse's flight?",
    options: ["Magic pegs and keys", "Spells", "Wind magic", "Fire gems"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "The ebony horse is controlled by special pegs and keys that make it fly."
  },
  {
    question_text: "How long was the ifrit trapped in the bottle?",
    options: ["Centuries", "Decades", "Years", "Months"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "The ifrit was trapped for several centuries, making him vengeful."
  },
  {
    question_text: "What is the Simurgh in Persian mythology?",
    options: ["A benevolent bird", "An evil serpent", "A flying horse", "A wise owl"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "The Simurgh is a benevolent mythical bird in Persian mythology."
  },
  {
    question_text: "What island phenomenon does Sinbad mistake for land?",
    options: ["A giant whale", "A floating island", "A mirage", "A sea monster"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "Sinbad and his crew land on what they think is an island, but it's actually a whale."
  },
  {
    question_text: "What magical ring does Aladdin also possess?",
    options: ["A ring with a genie", "An invisibility ring", "A strength ring", "A truth ring"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "Aladdin has a magic ring that also contains a genie, though less powerful than the lamp."
  },
  {
    question_text: "What creature guards treasure in many tales?",
    options: ["Dragons or serpents", "Lions", "Eagles", "Bears"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "Dragons and giant serpents often guard treasures in Arabian Nights tales."
  },
  {
    question_text: "What is the Valley of Diamonds guarded by?",
    options: ["Giant serpents", "Dragons", "Genies", "Sphinxes"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "The Valley of Diamonds in Sinbad's tale is guarded by giant serpents."
  },
  {
    question_text: "What magical ability do some characters possess?",
    options: ["Transformation", "Telepathy", "Time travel", "Immortality"],
    correct_index: 0,
    theme: "Magic & Mythology",
    difficulty: "medium",
    explanation: "Transformation or shapeshifting appears in several Arabian Nights tales."
  },

  // Geography & Places - Easy (10 new questions)
  {
    question_text: "Where is the setting of most Arabian Nights tales?",
    options: ["Baghdad and Persia", "Cairo", "Damascus", "Mecca"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "Many tales are set in Baghdad during the Abbasid Caliphate and Persia."
  },
  {
    question_text: "What city is associated with Sinbad the Sailor?",
    options: ["Basra", "Baghdad", "Damascus", "Cairo"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "Sinbad the Sailor begins his voyages from the port city of Basra."
  },
  {
    question_text: "Where does Aladdin live at the start of his story?",
    options: ["China (in the tale)", "Baghdad", "Arabia", "Persia"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "Interestingly, Aladdin's tale is set in China, though it's clearly an Arabian setting."
  },
  {
    question_text: "What type of place is the thieves' hideout?",
    options: ["A cave", "A palace", "A forest", "An island"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "The forty thieves hide their treasure in a secret cave in the mountains."
  },
  {
    question_text: "Where does King Shahryar rule?",
    options: ["Persia", "Arabia", "Egypt", "India"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "King Shahryar is a Persian king in the frame story of Arabian Nights."
  },
  {
    question_text: "What body of water does Sinbad sail on?",
    options: ["Indian Ocean", "Mediterranean Sea", "Red Sea", "Persian Gulf"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "Sinbad's voyages take him across the Indian Ocean and beyond."
  },
  {
    question_text: "Where is the magic lamp hidden?",
    options: ["In a cave", "In a palace", "Under the sea", "In the desert"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "The magic lamp is hidden in a treasure-filled cave beneath the earth."
  },
  {
    question_text: "What type of marketplace is common in the tales?",
    options: ["Bazaar", "Mall", "Fair", "Forum"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "Bazaars or souks are the traditional Middle Eastern marketplaces in the tales."
  },
  {
    question_text: "Where does Caliph Harun al-Rashid rule?",
    options: ["Baghdad", "Damascus", "Cairo", "Medina"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "Harun al-Rashid was the Caliph of Baghdad during the Islamic Golden Age."
  },
  {
    question_text: "What geographical feature separates the thieves' cave?",
    options: ["Mountains", "Desert", "River", "Forest"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "easy",
    explanation: "The thieves' cave is hidden in the mountains outside the city."
  },

  // Geography & Places - Medium (10 new questions)
  {
    question_text: "Which real Caliph's reign is featured in many tales?",
    options: ["Harun al-Rashid", "Abu Bakr", "Umar", "Ali"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "Harun al-Rashid ruled Baghdad from 786-809 CE during its golden age."
  },
  {
    question_text: "What island is known for its Valley of Diamonds?",
    options: ["An unnamed island", "Ceylon", "Java", "Sumatra"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "The Valley of Diamonds is on a mysterious unnamed island in Sinbad's voyages."
  },
  {
    question_text: "Where does the ebony horse originate?",
    options: ["Persia", "India", "China", "Arabia"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "The ebony horse is created by a Persian sage as a gift to the king."
  },
  {
    question_text: "What city is known as the 'City of Peace' in the tales?",
    options: ["Baghdad", "Damascus", "Jerusalem", "Medina"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "Baghdad was called Madinat as-Salam (City of Peace) by the Abbasid caliphs."
  },
  {
    question_text: "Which trade route is referenced in Sinbad's travels?",
    options: ["Silk Road", "Spice Route", "Incense Route", "Tea Route"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "Sinbad's voyages follow historical trade routes including the Silk Road."
  },
  {
    question_text: "Where is the palace that Aladdin builds?",
    options: ["Outside the Sultan's palace", "In the mountains", "By the sea", "In the desert"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "Aladdin builds his magnificent palace next to the Sultan's palace."
  },
  {
    question_text: "What river is mentioned in Baghdad tales?",
    options: ["Tigris", "Euphrates", "Nile", "Jordan"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "The Tigris River runs through Baghdad and is mentioned in many tales."
  },
  {
    question_text: "Where does Ali Baba live?",
    options: ["A town in Persia", "Baghdad", "Cairo", "Damascus"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "Ali Baba lives in a Persian town near mountains where the cave is hidden."
  },
  {
    question_text: "What region is the origin of many djinn tales?",
    options: ["Arabian Peninsula", "North Africa", "Central Asia", "Mediterranean"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "Djinn mythology originates from pre-Islamic Arabian Peninsula traditions."
  },
  {
    question_text: "Which historical empire's era is depicted?",
    options: ["Abbasid Caliphate", "Ottoman Empire", "Persian Empire", "Umayyad Caliphate"],
    correct_index: 0,
    theme: "Geography & Places",
    difficulty: "medium",
    explanation: "The Abbasid Caliphate era (750-1258 CE) is the setting for many tales."
  },
];

async function addQuestions() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('mystiq-quiz');
    const collection = db.collection('questions');
    
    // Get current count
    const currentCount = await collection.countDocuments();
    console.log(`📊 Current questions: ${currentCount}`);
    
    // Insert new questions
    const result = await collection.insertMany(newQuestions);
    console.log(`✅ Added ${result.insertedCount} new questions`);
    
    const newCount = await collection.countDocuments();
    console.log(`📊 Total questions now: ${newCount}`);
    
    // Show count by theme and difficulty
    const themes = await collection.aggregate([
      { $group: { _id: { theme: '$theme', difficulty: '$difficulty' }, count: { $sum: 1 } } },
      { $sort: { '_id.theme': 1, '_id.difficulty': 1 } }
    ]).toArray();
    
    console.log('\n📋 Questions by Category:');
    themes.forEach(t => {
      console.log(`   ${t._id.theme} (${t._id.difficulty}): ${t.count}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n🔒 Connection closed');
  }
}

addQuestions();
