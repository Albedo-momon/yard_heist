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
    <div className="fixed right-0 top-0 h-full w-80 bg-sidebar border-l border-sidebar-border z-50 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-sidebar-border bg-sidebar-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-sidebar-primary" />
            <h3 className="font-semibold text-sidebar-foreground">Global Chat</h3>
            <span className="text-xs bg-sidebar-primary text-sidebar-primary-foreground px-2 py-1 rounded-full">
              247 online
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 hover:bg-green-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-3 rounded-lg ${msg.isSystem
              ? 'bg-sidebar-primary/10 border border-sidebar-primary/20'
              : 'bg-sidebar-accent'
              }`}>
              <div className="flex items-center  mb-1 gap-3">
                <CircleUser className={`h-6 w-6 ${msg.isSystem ? ' hidden' : 'block'}`} />
                <span className={`text-sm font-medium ${msg.isSystem ? 'text-sidebar-primary' : 'text-sidebar-foreground'
                  }`}>
                  {msg.username}
                </span>
              </div>
              <p className="text-sm text-sidebar-foreground/90">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/60"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            className="bg-sidebar-primary hover:bg-sidebar-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;