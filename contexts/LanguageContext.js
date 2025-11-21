import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const translations = {
  en: {
    // Navigation
    play: 'Play',
    multiplayer: 'Multiplayer',
    leaderboard: 'Leaderboard',
    profile: 'Profile',
    admin: 'Admin',
    signIn: 'Sign In with Google',
    signOut: 'Sign Out',
    myProfile: 'My Profile',
    
    // Home Page
    heroTitle: 'Arabian Nights',
    heroSubtitle: 'Quiz Challenge',
    heroDescription: 'Embark on a magical journey through the enchanting tales of One Thousand and One Nights. Test your knowledge, compete with players worldwide, and unlock legendary achievements.',
    startQuiz: 'Start Quiz',
    viewLeaderboard: 'View Leaderboard',
    totalQuestions: 'Questions',
    totalPlayers: 'Active Players',
    totalQuizzes: 'Quizzes Taken',
    beginJourney: 'Begin Your Journey',
    testYourKnowledge: 'Test Your Knowledge of a Thousand and One Tales',
    legendaryTales: 'Legendary Tales Await',
    
    // Quiz
    question: 'Question',
    score: 'Score',
    timeLeft: 'Time Left',
    submit: 'Submit Answer',
    nextQuestion: 'Next Question',
    quizComplete: 'Quiz Complete!',
    yourScore: 'Your Score',
    playAgain: 'Play Again',
    reviewAnswers: 'Review Answers',
    selectDifficulty: 'Select Difficulty',
    selectTheme: 'Select Theme',
    questionCount: 'Questions',
    timedMode: 'Timed Mode',
    practiceMode: 'Practice Mode',
    
    // Multiplayer
    globalMatch: 'Global Match',
    privateRoom: 'Private Room',
    findMatch: 'Find Match',
    createRoom: 'Create Room',
    joinRoom: 'Join Room',
    enterRoomCode: 'Enter Room Code',
    roomCode: 'Room Code',
    copyCode: 'Copy',
    players: 'Players',
    waitingForPlayers: 'Waiting for Players...',
    waitingForHost: 'Waiting for host to start the game...',
    startGame: 'Start Game',
    gameOver: 'Game Over!',
    finalResults: 'Final Results',
    allPlayers: 'All Players',
    globalMatchDesc: 'Get matched with random players from around the world',
    privateRoomDesc: 'Create a room and invite your friends with a code',
    findingMatch: 'Finding Match...',
    creating: 'Creating...',
    or: 'or',
    
    // Leaderboard
    topPlayers: 'Top Players',
    allTime: 'All Time',
    weekly: 'Weekly',
    monthly: 'Monthly',
    daily: 'Daily',
    yourHighScore: 'Your High Score',
    yourRank: 'Your Rank',
    rank: 'Rank',
    player: 'Player',
    attempts: 'Attempts',
    avgScore: 'Avg Score',
    
    // Common
    loading: 'Loading...',
    backToHome: 'Back to Home',
    signInRequired: 'Sign In Required',
    noData: 'No data available',
    error: 'Error',
    success: 'Success',
    
    // Messages
    copiedToClipboard: 'Room code copied!',
    finishBonus: 'Finished',
    bonus: 'Bonus',
  },
  
  hi: {
    // Navigation
    play: 'खेलें',
    multiplayer: 'मल्टीप्लेयर',
    leaderboard: 'लीडरबोर्ड',
    profile: 'प्रोफाइल',
    admin: 'एडमिन',
    signIn: 'Google से साइन इन करें',
    signOut: 'साइन आउट',
    myProfile: 'मेरा प्रोफाइल',
    
    // Home Page
    heroTitle: 'अरेबियन नाइट्स',
    heroSubtitle: 'क्विज़ चुनौती',
    heroDescription: 'एक हज़ार और एक रात की मनमोहक कहानियों के माध्यम से एक जादुई यात्रा पर निकलें। अपने ज्ञान का परीक्षण करें, दुनिया भर के खिलाड़ियों के साथ प्रतिस्पर्धा करें, और पौराणिक उपलब्धियां अनलॉक करें।',
    startQuiz: 'क्विज़ शुरू करें',
    viewLeaderboard: 'लीडरबोर्ड देखें',
    totalQuestions: 'प्रश्न',
    totalPlayers: 'सक्रिय खिलाड़ी',
    totalQuizzes: 'क्विज़ खेले गए',
    beginJourney: 'अपनी यात्रा शुरू करें',
    testYourKnowledge: 'हज़ार और एक कहानियों का अपना ज्ञान परखें',
    legendaryTales: 'पौराणिक कथाएं इंतजार में',
    
    // Quiz
    question: 'प्रश्न',
    score: 'स्कोर',
    timeLeft: 'समय बचा',
    submit: 'उत्तर सबमिट करें',
    nextQuestion: 'अगला प्रश्न',
    quizComplete: 'क्विज़ पूर्ण!',
    yourScore: 'आपका स्कोर',
    playAgain: 'फिर से खेलें',
    reviewAnswers: 'उत्तर देखें',
    selectDifficulty: 'कठिनाई चुनें',
    selectTheme: 'थीम चुनें',
    questionCount: 'प्रश्न',
    timedMode: 'समयबद्ध मोड',
    practiceMode: 'अभ्यास मोड',
    
    // Multiplayer
    globalMatch: 'ग्लोबल मैच',
    privateRoom: 'प्राइवेट रूम',
    findMatch: 'मैच खोजें',
    createRoom: 'रूम बनाएं',
    joinRoom: 'रूम में शामिल हों',
    enterRoomCode: 'रूम कोड डालें',
    roomCode: 'रूम कोड',
    copyCode: 'कॉपी करें',
    players: 'खिलाड़ी',
    waitingForPlayers: 'खिलाड़ियों की प्रतीक्षा में...',
    waitingForHost: 'होस्ट के गेम शुरू करने की प्रतीक्षा में...',
    startGame: 'गेम शुरू करें',
    gameOver: 'गेम समाप्त!',
    finalResults: 'अंतिम परिणाम',
    allPlayers: 'सभी खिलाड़ी',
    globalMatchDesc: 'दुनिया भर के खिलाड़ियों के साथ मैच खेलें',
    privateRoomDesc: 'एक रूम बनाएं और कोड से दोस्तों को आमंत्रित करें',
    findingMatch: 'मैच खोजा जा रहा है...',
    creating: 'बनाया जा रहा है...',
    or: 'या',
    
    // Leaderboard
    topPlayers: 'शीर्ष खिलाड़ी',
    allTime: 'सभी समय',
    weekly: 'साप्ताहिक',
    monthly: 'मासिक',
    daily: 'दैनिक',
    yourHighScore: 'आपका उच्चतम स्कोर',
    yourRank: 'आपकी रैंक',
    rank: 'रैंक',
    player: 'खिलाड़ी',
    attempts: 'प्रयास',
    avgScore: 'औसत स्कोर',
    
    // Common
    loading: 'लोड हो रहा है...',
    backToHome: 'होम पर वापस जाएं',
    signInRequired: 'साइन इन आवश्यक है',
    noData: 'कोई डेटा उपलब्ध नहीं',
    error: 'त्रुटि',
    success: 'सफलता',
    
    // Messages
    copiedToClipboard: 'रूम कोड कॉपी हो गया!',
    finishBonus: 'समाप्त',
    bonus: 'बोनस',
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('language')
    if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
      setLanguage(savedLang)
    }
  }, [])

  const switchLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
