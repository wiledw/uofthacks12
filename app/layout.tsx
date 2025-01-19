'use client'
// import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import Script from "next/script";
import { AudioButton } from "./components/audio-button";
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const isChatroom = pathname === '/chat'

  return (
    <html lang="en">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js" strategy="beforeInteractive" />
      </head>
      <UserProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AudioButton />
          {children}
          {!isChatroom && (
            <Link 
              href="/chat" 
              className="fixed bottom-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-200"
              aria-label="Go to Chatroom"
            >
              <MessageCircle className="w-6 h-6 text-black" />
            </Link>
          )}
        </body>
      </UserProvider>
    </html>
  );
}

