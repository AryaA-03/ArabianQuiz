// Test script for authentication system
// Run with: node scripts/test-auth.js

const baseUrl = 'http://localhost:3000'

async function testAuth() {
  console.log('🧪 Testing Arabian Nights Quiz Authentication System\n')

  try {
    // Test 1: Sign Up
    console.log('1️⃣  Testing Sign Up...')
    const signupRes = await fetch(`${baseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'TestUser',
        email: 'test@example.com',
        password: 'password123'
      })
    })
    const signupData = await signupRes.json()
    console.log(signupRes.ok ? '✅ Sign up successful' : '❌ Sign up failed')
    console.log('Response:', signupData, '\n')

    // Test 2: Sign In
    console.log('2️⃣  Testing Sign In...')
    const signinRes = await fetch(`${baseUrl}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    })
    const signinData = await signinRes.json()
    console.log(signinRes.ok ? '✅ Sign in successful' : '❌ Sign in failed')
    console.log('Token:', signinData.token?.substring(0, 20) + '...', '\n')

    // Test 3: Get User Info
    console.log('3️⃣  Testing Get User Info...')
    const meRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { 
        'Authorization': `Bearer ${signinData.token}`
      }
    })
    const meData = await meRes.json()
    console.log(meRes.ok ? '✅ Get user info successful' : '❌ Get user info failed')
    console.log('User:', meData.user, '\n')

    // Test 4: Forgot Password
    console.log('4️⃣  Testing Forgot Password...')
    const forgotRes = await fetch(`${baseUrl}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    })
    const forgotData = await forgotRes.json()
    console.log(forgotRes.ok ? '✅ Forgot password successful' : '❌ Forgot password failed')
    console.log('Response:', forgotData, '\n')

    console.log('🎉 All authentication tests completed!')
    console.log('\n💡 Note: Check your console for password reset email (if SMTP not configured)')

  } catch (error) {
    console.error('❌ Error during tests:', error.message)
    console.log('\n💡 Make sure the dev server is running: npm run dev')
  }
}

testAuth()
