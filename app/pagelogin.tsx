'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error.message}</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h1>
        <p className="text-center mb-6 text-gray-600">Log in to access your personalized experience</p>
        <div className="space-y-4">
          <Link href="/api/auth/login" className="w-full block">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Log In
            </button>
          </Link>
          <Link href="/api/auth/login" className="w-full block">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          By logging in, you agree to our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

