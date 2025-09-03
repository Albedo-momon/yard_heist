import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Menu, X } from "lucide-react";
import logoName from "@/assets/background-removed.png";
import AuthDialog from "./AuthDialog";
import UserProfileButton from "./UserProfileButton";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Header = ({ onToggleChat }: { onToggleChat: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };

  const handleNavigation = (path: string, pageName: string) => {
    navigate(path);
    closeMobileMenu(); // Close mobile menu if open
    toast({
      title: `Welcome to ${pageName}`,
      description: `You've navigated to the ${pageName.toLowerCase()} section.`,
    });
  };

  const handleSectionNavigation = (sectionId: string, sectionName: string) => {
    // Navigate to dashboard first if not already there
    if (window.location.pathname !== '/dashboard') {
      navigate('/dashboard');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on dashboard, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    closeMobileMenu(); // Close mobile menu if open
    toast({
      title: `Navigating to ${sectionName}`,
      description: `Scrolling to the ${sectionName.toLowerCase()} section.`,
    });
  };

  const handleLogoClick = () => {
    // Navigate to dashboard if authenticated, otherwise to home
    const destination = isAuthenticated ? '/dashboard' : '/';
    const pageName = isAuthenticated ? 'Dashboard' : 'Home';
    handleNavigation(destination, pageName);
  };
  return (
    <header className="bg-black border-b border-border sticky top-0 z-50 yard-paint-stains">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <img
              src={logoName}
              alt="Yard Heist Logo"
              className="w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16 hover:scale-105 transition-transform duration-200"
            />
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-4 xl:gap-6">
            <button
              onClick={() => handleSectionNavigation('games', 'Games')}
              className="text-muted-foreground hover:text-neon-green transition-colors font-bold yard-paint-drip-green hover:yard-neon-glow px-2 xl:px-3 py-1 rounded text-sm xl:text-base cursor-pointer"
            >
              Games
            </button>
            <button
              onClick={() => handleSectionNavigation('live-bets', 'Live Bets')}
              className="text-muted-foreground hover:text-neon-purple transition-colors font-bold yard-paint-drip-purple hover:yard-neon-glow px-2 xl:px-3 py-1 rounded text-sm xl:text-base cursor-pointer"
            >
              Live Bets
            </button>
            <button
              onClick={() => handleSectionNavigation('leaderboard', 'Leaderboard')}
              className="text-muted-foreground hover:text-casino-gold transition-colors font-bold yard-paint-drip-yellow hover:yard-neon-glow px-2 xl:px-3 py-1 rounded text-sm xl:text-base cursor-pointer"
            >
              Leaderboard
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="lg:hidden hover:bg-gray-800 hover:text-green-400 transition-all duration-300 h-8 w-8 sm:h-10 sm:w-10"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleChat}
            className="hover:bg-gray-800 hover:text-green-400 transition-all duration-300 h-8 w-8 sm:h-10 sm:w-10"
          >
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* Conditional rendering based on authentication status */}
          {isAuthenticated ? (
            <UserProfileButton />
          ) : (
            <Button
              variant="default"
              onClick={openAuthDialog}
              className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2"
            >
              <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Sign In</span>
              <span className="sm:hidden">Sign</span>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black border-b border-border z-40">
          <nav className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleSectionNavigation('games', 'Games')}
                className="text-muted-foreground hover:text-green-400 transition-colors font-bold text-base py-2 px-3 rounded hover:bg-gray-800 text-left"
              >
                🎮 Games
              </button>
              <button
                onClick={() => handleSectionNavigation('live-bets', 'Live Bets')}
                className="text-muted-foreground hover:text-purple-400 transition-colors font-bold text-base py-2 px-3 rounded hover:bg-gray-800 text-left"
              >
                🎯 Live Bets
              </button>
              <button
                onClick={() => handleSectionNavigation('leaderboard', 'Leaderboard')}
                className="text-muted-foreground hover:text-yellow-400 transition-colors font-bold text-base py-2 px-3 rounded hover:bg-gray-800 text-left"
              >
                🏆 Leaderboard
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Auth Dialog */}
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
    </header>
  );
};

export default Header;