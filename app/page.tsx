"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const smoothTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: smoothTransition
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
      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="logo mb-8"
          >
            <div className="logo-image" />
          </motion.div>
        )}
        {stage === 0 && (
          <motion.h1
            key="hello"
            {...fadeInUp}
            className="text-5xl font-bold mb-8"
          >
            Hello World
          </motion.h1>
        )}
        {stage >= 1 && (
          <motion.div
            key="perceptr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={smoothTransition}
            className="flex flex-col items-center"
          >
            <div className="flex items-baseline">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTransition, delay: 0.3 }}
                className="text-6xl font-bold"
              >
                Percept
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...smoothTransition, delay: 0.8 }}
                className="text-6xl font-bold"
                style={{ color: '#0059cc' }}
              >
                r
              </motion.span>
            </div>
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTransition, delay: 1 }}
                className="mt-8"
              >
                <Link href="/api/auth/login?prompt=login">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="text-lg px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Let&apos;s get started
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

