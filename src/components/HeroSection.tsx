import { Button } from "@/components/ui/button";
import { Play, Zap } from "lucide-react";
import logo from "@/assets/logo-yardhiest.jpg";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#10141A]/90 via-[#10141A]/70 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            {/* <img src={logo} alt="" className="h-5 w-5" /> */}
            <span className="text-foreground">Play, Heist.</span>
            <br />
            <div className="mt-10">
              <span className="bg-primary p-2 pt-0 bg-clip-text text-transparent shadow-glow neon-glow">
                Crypto. Repeat.
              </span>
            </div>

          </h1>

          <p className="text-xl text-foreground mt-10 mb-10 max-w-2xl">
            Experience next-level gameplay with instant crypto rewards, provably fair systems, and endless fun.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#games">
              <Button
                size="lg"
                className="bg-primary hover:shadow-glow hover:scale-105 transition-all hover:bg-primary/90  duration-300 text-lg px-8 py-6 "
              >
                <Play className="mr-2 h-5 w-5" />
                Start Playing
              </Button>
            </a>
            <a href="#games">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
              >
                <Zap className="mr-2 h-5 w-5" />
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