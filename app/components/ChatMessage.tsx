interface Message {
    id: number
    room: string
    sender: string
    content: string
  }
  
  interface ChatMessageProps {
    message: Message
  }
  
  export default function ChatMessage({ message }: ChatMessageProps) {
    return (
      <div className="mb-4">
        <div className="font-bold text-gray-300">{message.sender}</div>
        <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg mt-1">{message.content}</div>
      </div>
    )
  }
  
  