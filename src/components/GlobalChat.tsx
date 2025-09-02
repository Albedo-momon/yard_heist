import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Users, CircleUser } from "lucide-react";

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  isSystem?: boolean;
}

interface GlobalChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalChat = ({ isOpen, onClose }: GlobalChatProps) => {
  const [message, setMessage] = useState("");
  const [messages] = useState<ChatMessage[]>([
    {
      id: 1,
      username: "CyberGamer",
      message: "Just hit a massive win on Neon Slots! 🎰⚡",
      timestamp: "2m ago"
    },
    {
      id: 2,
      username: "System",
      message: "Player 'NeonRider' won 50,000 credits!",
      timestamp: "3m ago",
      isSystem: true
    },
    {
      id: 3,
      username: "QuantumPlayer",
      message: "Anyone up for some Cyber Poker?",
      timestamp: "5m ago"
    },
    {
      id: 4,
      username: "DigitalDreamer",
      message: "The new Future Roulette is amazing! 🚀",
      timestamp: "7m ago"
    },
    {
      id: 5,
      username: "System",
      message: "Welcome bonus active for new players!",
      timestamp: "10m ago",
      isSystem: true
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the server
      setMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-96 lg:w-80 bg-black border-l border-gray-800 z-50 flex flex-col">
      {/* Chat Header */}
      <div className="p-3 sm:p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
            <h3 className="font-semibold text-white text-sm sm:text-base truncate">Global Chat</h3>
            <span className="text-xs bg-green-500 text-black px-2 py-1 rounded-full font-bold flex-shrink-0">
              247
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 hover:bg-gray-800 text-gray-400 hover:text-white flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-2 sm:p-3 rounded-lg ${msg.isSystem
              ? 'bg-green-500/10 border border-green-500/20'
              : 'bg-gray-800'
              }`}>
              <div className="flex items-center mb-1 gap-2 sm:gap-3">
                <CircleUser className={`h-4 w-4 sm:h-5 sm:w-5 ${msg.isSystem ? 'hidden' : 'block text-gray-400'}`} />
                <span className={`text-xs sm:text-sm font-medium ${msg.isSystem ? 'text-green-400' : 'text-white'
                  }`}>
                  {msg.username}
                </span>
                <span className="text-xs text-gray-500 ml-auto">{msg.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-3 sm:p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            className="bg-green-500 hover:bg-green-600 text-black h-9 w-9 sm:h-10 sm:w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;