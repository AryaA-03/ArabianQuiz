import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'
import AnimatedBackground from '../components/AnimatedBackground'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { AuthProvider } from '../contexts/FirebaseAuthContext'
import { LanguageProvider } from '../contexts/LanguageContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Head>
          <title>Arabian Nights Quiz - Test Your Knowledge</title>
          <meta name="description" content="Explore the legendary tales of One Thousand and One Nights through interactive quizzes" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AnimatedBackground />
        <Header />
        <LanguageSwitcher />
        <main className="container mx-auto px-4 py-8 relative z-10">
          <Component {...pageProps} />
        </main>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default MyApp
