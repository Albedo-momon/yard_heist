import { Button } from "@/components/ui/button";
import { Play, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] xl:h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#10141A]/95 via-[#10141A]/80 to-transparent" />

      <div className="relative z-10 container mx-auto lg:mx-0 px-4 sm:px-6 lg:px-0 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl lg:max-w-none mx-auto text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-foreground block">Play, Heist.</span>
            <div className="mt-4 w-full sm:mt-6 lg:mt-10">
              <span className="bg-primary p-1 sm:p-2 pt-0 bg-clip-text text-transparent shadow-glow neon-glow text-center">
                Crypto. Repeat.
              </span>
            </div>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-foreground mt-6 sm:mt-8 lg:mt-10 mb-8 sm:mb-10 max-w-2xl mx-auto sm:mx-0">
            Experience next-level gameplay with instant crypto rewards, provably fair systems, and endless fun.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start">
            <a href="#games" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] hover:scale-105 transition-all hover:bg-primary/90 duration-300 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Start Playing
              </Button>
            </a>
            <a href="#games" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                See What's New
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;