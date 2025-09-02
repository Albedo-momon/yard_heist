import { Button } from "@/components/ui/button";
import { MessageSquare, User, Settings } from "lucide-react";
import logoName from "@/assets/background-removed.png";

const Header = ({ onToggleChat }: { onToggleChat: () => void }) => {
  return (
    <header className="bg-black border-b border-border sticky top-0 z-50 yard-paint-stains">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center ">
            <img
              src={logoName}
              alt="Yard Heist Logo"
              className="w-24 h-16 "
            />
          </div>
          <div className="mx-auto px-4 py-3 flex items-center justify-between">
            <nav className="hidden md:flex gap-6">
              <a
                href="#games"
                className="text-muted-foreground hover:text-neon-green transition-colors font-bold yard-paint-drip-green hover:yard-neon-glow px-3 py-1 rounded"
              >
                Games
              </a>
              <a
                href="#live-bets"
                className="text-muted-foreground hover:text-neon-purple transition-colors font-bold yard-paint-drip-purple hover:yard-neon-glow px-3 py-1 rounded"
              >
                Live Bets
              </a>
              <a
                href="#leaderboard"
                className="text-muted-foreground hover:text-casino-gold transition-colors font-bold yard-paint-drip-yellow hover:yard-neon-glow px-3 py-1 rounded"
              >
                Leaderboard
              </a>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleChat}
            className="hover:bg-dark-surface hover:text-neon-green yard-casino-button "
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            className="yard-choice-highlight transition-all duration-300"
          >
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;