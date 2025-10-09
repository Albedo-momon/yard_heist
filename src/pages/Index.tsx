import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, XIcon, Github, Mail, Wallet, Play, Lock, Zap, Target } from "lucide-react";

// Import assets
import logoImage from "@/assets/logo-yardhiest.jpg";
import logoNameImage from "@/assets/background-removed.png";
import homePageVideo from "@/assets/home page video.mp4";
import backgroundVideo from "@/assets/background 2.mp4";
import fenceBreakImage from "@/assets/fence-break-roulette.jpg";
import coinTossImage from "@/assets/coin-toss.jpg";
import getawayCrashImage from "@/assets/getaway-crash.jpg";
import shadowDiceImage from "@/assets/shadow-dice-raid.jpg";
import highStakeImage from "@/assets/high-stake-heist.jpg";
import cryptographImage from "@/assets/cryptograph.jpg";
import solanaLogo from "@/assets/solana.png";

interface Game {
  id: string;
  title: string;
  tagline: string;
  image: string;
  glowColor: string;
  description: string;
  playStyle: string;
  features: string[];
}

const games: Game[] = [
  {
    id: 'fence-break',
    title: 'Fence Break Roulette',
    tagline: 'Spin the tools of escape',
    image: fenceBreakImage,
    glowColor: 'purple',
    description: 'A high-stakes roulette variant where you spin prison tools instead of numbers. Land on the right combination to break free with massive multipliers.',
    playStyle: 'Chance-based with strategic betting',
    features: ['Unique tool-themed wheel', '35:1 maximum payout', 'Progressive jackpot rounds']
  },
  {
    id: 'coin-toss',
    title: 'Coin Toss',
    tagline: 'Classic flip: double or nothing',
    image: coinTossImage,
    glowColor: 'green',
    description: 'The simplest yet most intense game in the yard. Call heads or tails and watch your crypto double instantly or disappear forever.',
    playStyle: 'Pure chance, instant results',
    features: ['50/50 odds', 'Instant payouts', 'Streak bonuses']
  },
  {
    id: 'getaway-crash',
    title: 'Getaway Crash',
    tagline: 'Outrun the guard dogs â€” jump the fence before the crash',
    image: getawayCrashImage,
    glowColor: 'red',
    description: 'Time your escape perfectly. Watch the multiplier climb as you run, but cash out before the guards catch you or lose everything.',
    playStyle: 'Timing and nerve',
    features: ['Real-time multipliers', 'Auto-cashout options', 'Leaderboard competitions']
  },
  {
    id: 'shadow-dice',
    title: 'Shadow Dice Raid',
    tagline: 'Sneak deeper into the yard with each dice roll',
    image: shadowDiceImage,
    glowColor: 'blue',
    description: 'Navigate through the prison yard by rolling dice. Safe zones give loot and multipliers, alarm zones cause setbacks, treasure chests unlock massive rewards.',
    playStyle: 'Strategic risk management',
    features: ['Multi-level progression', 'Treasure chest bonuses', 'Safe zone multipliers']
  },
  {
    id: 'high-stake',
    title: 'High Stake Heist',
    tagline: 'Jackpot draw â€” crack the vault for the score',
    image: highStakeImage,
    glowColor: 'yellow',
    description: 'The ultimate heist challenge. Crack the vault combination to access progressive jackpots that grow with every failed attempt.',
    playStyle: 'Progressive jackpot system',
    features: ['Growing jackpots', 'Combination puzzles', 'Bonus vault rounds']
  },
  {
    id: 'cryptograph',
    title: 'CryptoGraph',
    tagline: '24-slot market simulation â€” predict up/down and cash out anytime',
    image: cryptographImage,
    glowColor: 'green',
    description: 'Trade like you\'re on the outside. Predict market movements across 24 slots with live mini-charts. Cash out anytime or let it ride.',
    playStyle: 'Skill-based trading simulation',
    features: ['Live price feeds', 'Multiple timeframes', 'Social trading features']
  }
];



const GameCard = ({ game }: { game: Game }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [notifyEnabled, setNotifyEnabled] = useState(false);

  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`relative overflow-hidden transition-all duration-300 ${isHovered ? `paint-splatter-${game.glowColor}` : 'border-border'
        }`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className={`text-lg font-bold paint-drip-${game.glowColor} mb-1`}>
              {game.title}
            </h3>
            <p className="text-sm text-muted-foreground">{game.tagline}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Preview Game
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className={`paint-drip-${game.glowColor}`}>{game.title}</DialogTitle>
                <DialogDescription>{game.tagline}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{game.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Play Style</h4>
                  <Badge variant="secondary">{game.playStyle}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {game.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm">Notify me when this game launches</span>
                  <Button
                    variant={notifyEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifyEnabled(!notifyEnabled)}
                  >
                    {notifyEnabled ? 'Notifications On' : 'Notify Me'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="paint-stains absolute inset-0" />
      <div className="concrete-texture absolute inset-0" />
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const TheYardHeist = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logoImage}
              alt="Yard Heist Logo"
              className="w-10 h-10 md:w-10 md:h-10 rounded-lg"
            />
            <img
              src={logoNameImage}
              alt="Yard Heist Name"
              className="h-10 md:h-10 object-contain"
            />
           
          </div>
          <div className='flex items-center gap-4'>
          <Button variant="outline" className="paint-splatter-green" onClick={() => setOpen(true)}>
            <Wallet className="w-4 h-4" />
            <span className='hidden sm:inline'>Connect</span>  Wallet
          </Button>
          <Button
            variant="outline"
            className='hover:text-black text-sm md:text-base text-white '
            onClick={() => navigate('/docs')}
          >
            Docs
          </Button>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Coming Soon ðŸš€</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-500">Wallet connection feature will be available soon.</p>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen mx-auto px-4 py-20 text-center mb-20 overflow-hidden flex items-center justify-center">
          {/* Hero Background Video */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80"
            >
              <source src={homePageVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex items-center flex-col relative z-10 gap-20'
          >
          <div className='flex items-center flex-col'>
             <motion.h1
              className="text-5xl md:text-9xl font-bold mb-6 glitch-text"
              animate={{
                filter: [
                  "drop-shadow(0 2px 4px var(--accent-purple))",
                  "drop-shadow(0 4px 8px var(--accent-purple))",
                  "drop-shadow(0 2px 4px var(--accent-purple))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              COMING SOON
            </motion.h1>
            <p className="text-xl md:text-5xl mb-12 text-muted-foreground w-[70%]">
              Your <span className="paint-drip-orange">Game</span>, Your <span className='paint-drip-orange'>Skill</span>, Your <span className='paint-drip-orange'>Future</span>.
            </p>
          </div>
           

            {/* Timer removed */}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Button size="lg" variant="outline" className="paint-splatter-green text-lg px-8">
                <Lock className="w-5 h-5 mr-2" />
                Join Beta (Whishlist)
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="paint-splatter-purple text-lg px-8">
                    <Mail className="w-5 h-5 mr-2" />
                    Notify Me
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="paint-drip-purple">Join the Heist </DialogTitle>
                    <DialogDescription>
                      Be the first to know when The Yard Heist launches and win rewards
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>


            </div>
          </motion.div>
        </section>



        {/* Games Showcase */}
        {/* <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 paint-drip-green">
              Choose Your Game
            </h2>
            <p className="text-xl text-muted-foreground">
              Six unique ways to risk it all in the yard and win big
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section> */}

        {/* Crypto Section */}
        <section className="container mx-auto px-4 py-20 bg-card/20 backdrop-blur rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 paint-drip-green">
              Crypto Gaming Revolution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 bg-card/50 backdrop-blur paint-splatter-purple">
                <div className="mb-4">
                  <img src={solanaLogo} alt="Solana Logo" className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="font-semibold mb-2">Solana Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Deposit & withdraw Solana instantly with lightning-fast transactions
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur paint-splatter-green">
                <div className="text-3xl mb-4">💎</div>               <h3 className="font-semibold mb-2">Privacy Swap</h3>
                <p className="text-sm text-muted-foreground">
                  Solana and 20+ major cryptocurrencies accepted
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur paint-splatter-blue">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="font-semibold mb-2">Decentralized Gaming</h3>
                <p className="text-sm text-muted-foreground">
                  Smart contracts ensure transparent, tamper-proof gaming
                </p>
              </Card>
            </div>

            <div className="bg-card/30 backdrop-blur rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-bold mb-4 paint-drip-yellow">Why Crypto Gaming ?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">💰 Instant Payouts</h4>
                  <p className="text-sm text-muted-foreground">
                    Win and withdraw your crypto instantly - no waiting, no banks, just pure profit
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">🌍 Global Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Play from anywhere in the world with just your crypto wallet
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">🎯 Lower House Edge</h4>
                  <p className="text-sm text-muted-foreground">
                    Crypto gaming means lower fees and better odds for players
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">🔐 Anonymous Play</h4>
                  <p className="text-sm text-muted-foreground">
                    Your identity stays private - just connect wallet and play
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works / Fairness */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 paint-drip-green">
              Provably Fair Gaming
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center p-6 bg-card/50 backdrop-blur">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Provably Fair RNG</h3>
                <p className="text-sm text-muted-foreground">
                  ServerSeed hash revealed before each game
                </p>
              </Card>

              <Card className="text-center p-6 bg-card/50 backdrop-blur">
                <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">House Edge Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Clear odds displayed for every game
                </p>
              </Card>

              <Card className="text-center p-6 bg-card/50 backdrop-blur">
                <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Instant Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Verify any result independently
                </p>
              </Card>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mx-auto block">
                  Learn More About Fair Gaming
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Provably Fair Gaming Explained</DialogTitle>
                  <DialogDescription>
                    Understanding how we ensure fair play in The Yard Heist
                  </DialogDescription>
                </DialogHeader>
                <Accordion type="single" collapsible>
                  <AccordionItem value="server-seed">
                    <AccordionTrigger>ServerSeed & ClientSeed</AccordionTrigger>
                    <AccordionContent>
                      Each game uses a combination of our server-generated seed (revealed as a hash before the game)
                      and your client seed to create truly random, verifiable results.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="nonce">
                    <AccordionTrigger>Nonce System</AccordionTrigger>
                    <AccordionContent>
                      Every bet increments a nonce counter, ensuring each result is unique and cannot be predicted
                      or manipulated by either party.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="verification">
                    <AccordionTrigger>Result Verification</AccordionTrigger>
                    <AccordionContent>
                      After each game, you can verify the result using our open-source verification tools.
                      The server seed is revealed, allowing you to reproduce the exact same result.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex items-center justify-center flex-col overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-fit z-10"
          >
            <div className="relative border-animated rounded-2xl">
              <Button
                size="lg"
                className="
          relative
          text-lg sm:text-xl md:text-2xl
          px-8 sm:px-12 md:px-16
          py-4 sm:py-6 md:py-8
          w-fit h-auto
          text-white
          bg-black
          shadow-2xl
          transition-all
          duration-300
          rounded-2xl
          hover:bg-[.paint-drip-green]
        "
              >
                <div className="flex  xs:flex-row items-center gap-4 justify-center">
                  <span className="text-2xl sm:text-3xl mr-0 xs:mr-4 mb-2 xs:mb-0">💀</span>
                  <div className="flex flex-col items-center xs:items-start">
                    <span className="font-black tracking-wider leading-none">BREAK INTO</span>
                    <span className="font-black tracking-wider leading-none">THE YARD</span>
                  </div>
                  <span className="text-2xl sm:text-3xl ml-0 xs:ml-4 mt-2 xs:mt-0">💰</span>
                </div>
              </Button>
            </div>
          </motion.div>

          {/* Subtitle */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-muted-foreground paint-drip-red px-2 max-w-md sm:max-w-xl">
            The heist begins soon. Prepare your crypto. 💀💰
          </p>
        </section>


      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/20 backdrop-blur">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={logoImage}
                  alt="The Yard Heist"
                  className="w-12 h-12 rounded"
                />
                <img
                  src={logoNameImage}
                  alt="The Yard Heist Name"
                  className="h-20 object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                High-stakes crypto gaming in the darkest corners of the web. Win big or lose it all.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <a
                    href="https://x.com/YardHeist"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>

                </Button>
                <Button variant="ghost" size="sm">
                  <a
                    href="https://github.com/Albedo-momon/yard_heist"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </Button>

              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4> {/* after adding other chane it to the legal */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm">
                  <a
                    href="mailto:info@yardheist.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
                {/* <p>18+ only â€¢ Gamble responsibly</p>
                <p>Terms â€¢ Privacy â€¢ Contact</p> */}
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
            © 2025 The Yard Heist. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TheYardHeist;
