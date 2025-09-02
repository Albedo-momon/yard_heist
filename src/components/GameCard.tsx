import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";

interface GameCardProps {
  title: string;
  image: string;
  category: string;
  rating?: number;
  isHot?: boolean;
  isNew?: boolean;
  isComingSoon?: boolean;
}

const GameCard = ({ title, image, category, rating, isHot, isNew, isComingSoon }: GameCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,255,0,0.3)] hover:-translate-y-2 hover:scale-105">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="bg-gradient-to-r from-green-500/90 to-green-400/70 text-black/90 text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {isHot && (
            <span className="bg-gradient-to-r from-purple-600/90 to-purple-400/70 text-black/90 text-xs font-bold px-2 py-1 rounded-full">
              HOT
            </span>
          )}
          {isComingSoon && (
            <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded-full">
              COMING SOON
            </span>
          )}
        </div>

        {/* Coming soon overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground font-bold text-lg">Coming Soon</p>
            </div>
          </div>
        )}

        {/* Play button overlay */}
        {!isComingSoon && (
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-700/90 to-green-500/70 hover:bg-green-600 text-black font-bold hover:scale-110 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Play Now
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">{rating}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
    </Card>
  );
};

export default GameCard;