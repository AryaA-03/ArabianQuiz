// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABix-IrIpyFutZfJp4RPUBJbD_j9_UwVM",
  authDomain: "arabian-quiz.firebaseapp.com",
  projectId: "arabian-quiz",
  storageBucket: "arabian-quiz.firebasestorage.app",
  messagingSenderId: "442726296632",
  appId: "1:442726296632:web:c1e31b5d7b999231c98acd",
  measurementId: "G-SBEWYBM52J"
}

// Initialize Firebase (only once)
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account' // Always show account selection
})

export default app
