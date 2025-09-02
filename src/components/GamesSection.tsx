import GameCard from "./GameCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gameCard1 from "@/assets/game-card-1.jpg";
import gameCard2 from "@/assets/game-card-2.jpg";
import gameCard3 from "@/assets/game-card-3.jpg";
import gameCard4 from "@/assets/game-card-4.jpg";
import gameCoin from "@/assets/game-card-coin.jpg";

const GamesSection = () => {
  const games = [
    {
      title: "Quantum Flip",
      image: gameCoin,
      category: "Coin Toss",
      rating: 4.5,
      isNew: true,
    },
    {
      title: "Neon Slots",
      image: gameCard1,
      category: "Slots",
      rating: 4.8,
      isNew: true,
    },
    {
      title: "Cyber Poker",
      image: gameCard2,
      category: "Table Games",
      rating: 4.7,
      isHot: true,
    },
    {
      title: "Future Roulette",
      image: gameCard3,
      category: "Roulette",
      rating: 4.9,
    },

    {
      title: "Matrix Blackjack",
      image: gameCard1,
      category: "Table Games",
      isComingSoon: true,
    },
    {
      title: "Digital Dreams",
      image: gameCard2,
      category: "Slots",
      isComingSoon: true,
    },
  ];

  return (
    <section id="games" className="py-16 bg-darker-surface">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Featured Games
            </h2>
            <p className="text-muted-foreground">
              Discover our most popular gaming experiences
            </p>
          </div>

          {/* <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-primary/50 hover:bg-primary hover:border-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-primary/50 hover:bg-primary hover:border-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div> */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>

        <div className="text-center mt-12">
          {/* <Button 
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-glow transition-all duration-300"
          >
            View All Games
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;