import { useState } from 'react'

interface MessageInputProps {
  onSendMessage: (content: string) => void
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow bg-gray-700 bg-opacity-50 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        className="bg-white text-gray-900 rounded-full px-6 py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Send
      </button>
    </form>
  )
}

