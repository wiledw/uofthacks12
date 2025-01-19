// app/home/page.tsx
'use client'
import React, { useState } from 'react'
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ClientScatter from '@/app/components/clientScatter'
import { useCheckUser } from '../hooks/useCheckUser'
import LoadingScreen from '../components/loadingScreen'

export default function HomePage() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { isLoading } = useCheckUser();
  const { user, error, isLoading: authLoading } = useUser();

  if (isLoading || authLoading) return <LoadingScreen />;
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
    <div className="h-screen bg-black">
      <div className="h-full">
        <div className="h-full relative overflow-hidden border-2 border-cyan-400/30 shadow-xl 
        shadow-cyan-400/10 bg-black">
          {/* Profile controls - stays in top-right */}
          <div className="absolute top-4 right-4 z-50">
            <div className="relative">
              {user.picture && (
                <Image
                  src={user.picture}
                  width={48}
                  height={48}
                  alt="Profile"
                  className="rounded-full cursor-pointer border-2"
                  onClick={() => setShowMenu(!showMenu)}
                />
              )}
              {showMenu && (
                <div className="absolute mt-2 right-0 w-36 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
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
          <ClientScatter />
        </div>
      </div>
    </div>
  );
}
