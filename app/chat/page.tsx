'use client'

import { useState } from 'react'
import RoomSelector from '../components/RoomSelector'
import ChatMessage from '../components/ChatMessage'
import MessageInput from '../components/MessageInput'
import dynamic from 'next/dynamic';

const DynamicVantaBackground = dynamic(() => import('../components/VantageBackground'), {
  ssr: false
});

// Mock data for rooms and messages
const rooms = ['General', 'Random', 'Tech Talk']
const mockMessages = [
  { id: 1, room: 'General', sender: 'Alice', content: 'Hello everyone!' },
  { id: 2, room: 'General', sender: 'Bob', content: 'Hi Alice, how are you?' },
  { id: 3, room: 'Random', sender: 'Charlie', content: 'Anyone up for a game night?' },
  { id: 4, room: 'Tech Talk', sender: 'David', content: 'What do you think about the new React updates?' },
]

export default function Chatroom() {
  const [currentRoom, setCurrentRoom] = useState(rooms[0])
  const [messages, setMessages] = useState(mockMessages)

  const filteredMessages = messages.filter(msg => msg.room === currentRoom)

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: messages.length + 1,
      room: currentRoom,
      sender: 'You',
      content,
    }
    setMessages([...messages, newMessage])
  }

  return (
    <DynamicVantaBackground>
    <div className="flex flex-col h-screen text-white p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <RoomSelector rooms={rooms} currentRoom={currentRoom} onRoomChange={setCurrentRoom} />
      <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
        {filteredMessages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
    </DynamicVantaBackground>
  )
}

