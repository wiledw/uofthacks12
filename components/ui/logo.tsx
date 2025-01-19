"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const smoothTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.7
}

export default function Home() {
  const { user, error } = useUser();
  const [stage, setStage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/survey');
      return;
    }

    const timer1 = setTimeout(() => setStage(1), 2000)
    const timer2 = setTimeout(() => setStage(2), 4000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [user, router]);

  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <div className="logo logo-inverted"></div>
      <motion.div 
        layout
        transition={smoothTransition}
        className="flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.h1
              key="hello"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={smoothTransition}
              className="text-5xl font-bold mb-8"
            >
              Hello World
            </motion.h1>
          )}
          {stage >= 1 && (
            <motion.h1
              key="perceptr"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...smoothTransition,
                delay: stage === 1 ? 0.3 : 0
              }}
              className="text-6xl font-bold mb-8"
            >
              <div className='flex flex-col items-center gap-8'>
                Perceptr
                <Link href="/api/auth/login?prompt=login">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="text-lg px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Let&apos;s get started
                  </Button>
                </Link>
              </div>
            </motion.h1>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

