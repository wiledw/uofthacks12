// app/home/page.tsx
'use client'
import React, { useState } from 'react'
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ClientScatter from '@/app/components/clientScatter'

export default function HomePage() {
  const router = useRouter();
  const {user, error, isLoading} = useUser();
  const [showMenu, setShowMenu] = useState(false)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    router.push('/');
    return null;
  }

  const handleLogout = () => {
    window.location.href = `/api/auth/logout`;
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user.name}!
          </h1>
          <div className="relative">
            {user.picture && (
              <Image
                src={user.picture}
                width={60}
                height={60}
                alt="Profile"
                className="rounded-full cursor-pointer border-2"
                onClick={() => setShowMenu(!showMenu)}
              />
            )}
            {showMenu && (
            <div className="absolute mt-2 right-0 z-50 w-36 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
            <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 
                hover:text-cyan-600 transition-colors"
                onClick={handleProfile}
            >
                Profile
            </Button>
            <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 
                hover:text-cyan-600 transition-colors"
                onClick={handleLogout}
            >
                Logout
            </Button>
            </div>
        )}
          </div>
        </div>

        {/* Graph Section */}
        <div className="rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-xl 
        shadow-cyan-400/10 bg-gradient-to-b from-black to-gray-900">
          <ClientScatter />
        </div>
      </div>
    </div>
  );
}
