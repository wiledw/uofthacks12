'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const questions = [
  {
    id: 1,
    question: "Tell me about yourself.",
    maxWords: 500
  },
  {
    id: 2,
    question: "What are some key aspects of your culture or upbringing that shaped your perspective?",
    maxWords: 500
  },
  {
    id: 3,
    question: "What hobbies, interests, or passions do you have that influence how you see the world?",
    maxWords: 500
  },
  {
    id: 4,
    question: "Have you ever had an experience that changed the way you view life or people around you?",
    maxWords: 500
  },
  {
    id: 5,
    question: "What is your greatest accomplishment?",
    maxWords: 500
  }
]

const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.95
    }
};

const textareaVariants = {
hover: {
    scale: 1.01,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: {
    duration: 0.2,
    type: "spring",
    stiffness: 300
    }
}
};

export default function SurveyForm() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<{ [key: number]: string }>({})
    const [direction, setDirection] = useState(0)
    const [showLogout, setShowLogout] = useState(false)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!user) {
        router.push('/');
        return null;
    }

    const handleLogout = () => {
        window.location.href = `/api/auth/logout`;
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
        setDirection(1)
        setCurrentQuestion(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
        setDirection(-1)
        setCurrentQuestion(prev => prev - 1)
        }
    }

    const handleAnswerChange = (value: string) => {
        setAnswers(prev => ({
        ...prev,
        [currentQuestion]: value
        }))
    }

    const countWords = (text: string) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length
    }

    const currentAnswer = answers[currentQuestion] || ''
    const wordCount = countWords(currentAnswer)
    const isOverLimit = wordCount > questions[currentQuestion].maxWords

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl mx-auto mb-6  p-4">
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                    {user.picture && (
                        <Image
                        src={user.picture}
                        width={60}
                        height={60}
                        alt="Profile"
                        className="rounded-full cursor-pointer"
                        onClick={() => setShowLogout(!showLogout)}
                        />
                    )}
                    {showLogout && (
                        <Button
                        variant="outline"
                        className="absolute mt-1 left-0 right-0 z-10 shadow-lg"
                        onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                    </div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</h1>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 md:p-8">
                <div className="mb-8">
                    <div className="h-1 w-full bg-gray-200 rounded-full">
                        <div 
                        className="h-1 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                 </div>

                <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ 
                    x: direction * 50,
                    opacity: 0 
                    }}
                    animate={{ 
                    x: 0,
                    opacity: 1 
                    }}
                    exit={{ 
                    x: direction * -50,
                    opacity: 0 
                    }}
                    transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                    }}
                    className="space-y-4"
                >
                    <h2 className="text-xl font-semibold text-gray-900">
                        {questions[currentQuestion].question}
                    </h2>
                    <p className="text-sm text-gray-500">
                        (max {questions[currentQuestion].maxWords} words)
                    </p>
                    <motion.div
                            variants={textareaVariants}
                            whileHover="hover"
                            className="relative"
                     >
                        <Textarea
                        value={currentAnswer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        placeholder="Type your answer here..."
                        className="min-h-[200px] resize-none"
                        />
                    </motion.div>
                    <div className="flex justify-between items-center text-sm">
                        <span className={`${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                            {wordCount} / {questions[currentQuestion].maxWords} words
                        </span>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        variant="outline"
                        className="transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>
                </motion.div>

                <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Button
                        onClick={handleNext}
                        disabled={currentQuestion === questions.length - 1 || isOverLimit}
                        className="transition-colors duration-200"
                    >
                        {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

