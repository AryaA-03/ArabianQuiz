import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage()

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex items-center gap-2 parchment border border-arabian-gold/30 shadow-xl p-2 rounded-full">
        <button
          onClick={() => switchLanguage('en')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            language === 'en'
              ? 'bg-gradient-to-r from-arabian-gold to-yellow-600 text-arabian-indigo shadow-lg scale-110'
              : 'text-arabian-sand hover:text-arabian-gold'
          }`}
          title="English"
        >
          EN
        </button>
        <button
          onClick={() => switchLanguage('hi')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            language === 'hi'
              ? 'bg-gradient-to-r from-arabian-gold to-yellow-600 text-arabian-indigo shadow-lg scale-110'
              : 'text-arabian-sand hover:text-arabian-gold'
          }`}
          title="हिंदी"
        >
          हिं
        </button>
      </div>
    </div>
  )
}
