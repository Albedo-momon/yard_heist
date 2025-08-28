import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Wallet, Plus, TrendingUp, Coins, Zap, Trophy, Target, ArrowLeft, Flame } from 'lucide-react';
import headImg from "@/assets/head.png";
import tailImg from "@/assets/tail.png";
import logo from "@/assets/logo-yardhiest.jpg";
import websitename from "@/assets/background-removed.png";
import bg from "@/assets/cointoss_bg.png";

const CoinToss: React.FC = () => {
  const [wallet, setWallet] = useState(12450);
  const [prediction, setPrediction] = useState<'Heads' | 'Tails' | null>(null);
  const [betAmount, setBetAmount] = useState<string>('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [gameResult, setGameResult] = useState<{
    result: 'H' | 'T';
    won: boolean;
    payout: number;
  } | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [winStreak, setWinStreak] = useState(3);
  const [totalGames, setTotalGames] = useState(247);
  const [winRate, setWinRate] = useState(68.4);
  const [flipTarget, setFlipTarget] = useState<'H' | 'T' | null>(null);
  const [coinTargets, setCoinTargets] = useState<Array<'H' | 'T'>>([]);
  const FLIP_DURATION_S = 4;
  const POPUP_DELAY_S = 0.35;
  const [numCoins, setNumCoins] = useState<number>(1);
  const [numChoice, setNumChoice] = useState<number>(1);


  // Betting ratios with their multipliers
  const bettingRatios = [
    { ratio: "10:5", multiplier: 1.57, display: "10:5 (x1.57)" },
    { ratio: "1:1", multiplier: 1.96, display: "1:1 (x1.96)" },
    { ratio: "4:3", multiplier: 3.14, display: "4:3 (x3.14)" },
    { ratio: "6:5", multiplier: 8.96, display: "6:5 (x8.96)" },
    { ratio: "9:8", multiplier: 50.18, display: "9:8 (x50.18)" }
  ];

  const [selectedRatio, setSelectedRatio] = useState(bettingRatios[1]); // Default to 1:1

  // Calculate minimum choice based on numCoins
  const getMinChoice = (coins: number): number => {
    if (coins <= 5) return 1;
    if (coins <= 8) return 2;
    return 3;
  };

  // Effect to reset numChoice when numCoins changes below threshold
  useEffect(() => {
    const minChoice = getMinChoice(numCoins);
    if (numChoice < minChoice) {
      setNumChoice(minChoice);
    }
  }, [numCoins, numChoice]);

  // Calculate win amount based on bet and selected ratio
  const calculateWinAmount = (): number => {
    const bet = parseInt(betAmount) || 0;
    return Math.round(bet * selectedRatio.multiplier);
  };

  const handleQuickChip = (amount: number) => {
    setBetAmount(amount.toString());
  };


  const getCurrentFace = (): 'H' | 'T' => {
    if (isFlipping && flipTarget) return flipTarget;
    if (gameResult) return gameResult.result;
    return prediction === 'Tails' ? 'T' : 'H';
  };
  const coinImage = getCurrentFace() === "T" ? tailImg : headImg;

  const coinGlowShadow = getCurrentFace() === 'T'
    ? '0 0 12px rgba(192,192,192,0.35), 0 0 24px rgba(192,192,192,0.2)'
    : '0 0 12px rgba(212,175,55,0.35), 0 0 24px rgba(212,175,55,0.2)';

  // Coin size scales with count: larger up to 3, smaller beyond
  const coinSizeClass = numCoins <= 3 ? 'w-24 h-24 md:w-36 md:h-36' : 'w-16 h-16 md:w-28 md:h-28';

  const selectionGoldGlow = '0 0 10px rgba(212,175,55,0.35), 0 0 18px rgba(212,175,55,0.2)';
  const selectionSilverGlow = '0 0 10px rgba(192,192,192,0.35), 0 0 18px rgba(192,192,192,0.2)';
  const selectionNeutralGlow = '0 0 6px rgba(255,255,255,0.07)';

  const simulateFlip = async () => {
    if (isFlipping || !betAmount || parseInt(betAmount) <= 0 || !prediction) return;

    setIsFlipping(true);
    setGameResult(null);

    // Decide results upfront so animation can end on the correct side for each coin
    const total = Math.min(10, Math.max(1, numCoins));
    const results: Array<'H' | 'T'> = Array.from({ length: total }, () => (Math.random() < 0.5 ? 'H' : 'T'));
    setCoinTargets(results);
    // Keep single flipTarget for compatibility (use first coin's result)
    const result: 'H' | 'T' = results[0];
    setFlipTarget(result);

    // Let the animation play (fast then slow easing handled by transition below)
    await new Promise(resolve => setTimeout(resolve, FLIP_DURATION_S * 1000));

    const won = (prediction === 'Heads' && result === 'H') || (prediction === 'Tails' && result === 'T');
    const bet = parseInt(betAmount);
    const payout = won ? bet * selectedRatio.multiplier : -bet;

    setGameResult({ result, won, payout });
    setWallet(prev => prev + payout);
    setTotalGames(prev => prev + 1);

    if (won) {
      setWinStreak(prev => prev + 1);
      setWinRate(prev => Math.min(99.9, prev + 0.1));
    } else {
      setWinStreak(0);
      setWinRate(prev => Math.max(0.1, prev - 0.1));
    }

    setIsFlipping(false);
    // small pause after the coin settles before showing popup
    setTimeout(() => setShowResultDialog(true), POPUP_DELAY_S * 1000);
  };

  const playAgain = () => {
    setGameResult(null);
    setPrediction(null);
    setShowResultDialog(false);
    setCoinTargets([]);
  };

  const resetBet = () => {
    setBetAmount('');
    setPrediction(null);
  };

  return (
    <div className=" relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden bg-slate-950">

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 coin-3d text-casino-gold text-xs flex items-center justify-center font-bold opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotateY: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            ₿
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 ">

        {/* Header */}
        <div className="flex items-center justify-between p-2 md:p-6 border-b border-casino-gold/20 backdrop-blur-sm">

          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-casino-gold hover:text-black font-bold text-lg"
          >
            <img src={logo} alt="logo" className="w-10 h-10 md:w-16 md:h-16 " />
            <img src={websitename} alt="website name" className="w-15 h-10 md:w-24 md:h-24" />
          </Button>

          <div className="flex items-center gap-6">
            {/* Wallet */}
            <Card className="bg-gradient-to-r from-casino-gold/20 to-casino-silver/20 border-casino-gold/50 backdrop-blur-sm">
              <CardContent className="flex items-center gap-3 p-2 md:p-3 ">
                <Wallet className="w-5 h-5 text-casino-gold" />
                <div className="text-casino-gold font-bold text-sm md:text-lg hidden">₡{wallet.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
        </div>


        {/*betting panel */}
        <div className="relative h-auto overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 w-full md:h-full">
            <img
              src={bg}
              alt="cyber punk background"
              className="w-full h-full object-cover opacity-60" />
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>


          {/* Betting panel/content above bg */}
          <div className="relative w-full z-10 flex flex-col items-center justify-center md:gap-20 md:min-h-[80vh] md:h-4/5 py-8 md:py-0">

            <div className="relative z-10">

              {/* Center Panel - Main Game */}

              <div className=" ">
                {/* Coin Animation - supports multiple coins */}
                <div className="flex justify-center items-center min-h-[200px] md:min-h-[300px]">
                  {(() => {
                    const total = Math.min(10, Math.max(1, numCoins));
                    const topCount = total <= 3 ? total : Math.ceil(total / 2);
                    const bottomCount = total <= 3 ? 0 : (total - topCount);
                    return (
                      <div className="flex flex-col items-center gap-6">
                        <div className="flex justify-center gap-2 md:gap-6">
                          {Array.from({ length: topCount }).map((_, i) => (
                            <motion.div
                              key={`top-${i}`}
                              className={`${coinSizeClass} rounded-full relative cursor-pointer shadow-2xl`}
                              style={{ transformStyle: 'preserve-3d' as any, boxShadow: coinGlowShadow }}
                              initial={{ scale: 0.8, opacity: 0, y: -10 }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                rotateY: isFlipping
                                  ? (360 * 3) + ((coinTargets[i] || flipTarget) === 'T' ? 180 : 0)
                                  : (gameResult
                                    ? (gameResult.result === 'T' ? 180 : 0)
                                    : (prediction === 'Tails' ? 180 : 0))
                              }}
                              onClick={simulateFlip}
                              transition={{
                                duration: isFlipping ? FLIP_DURATION_S : (gameResult ? 0 : 0.6),
                                ease: isFlipping ? [0.15, 0.85, 0.25, 1] : 'easeOut',
                                repeat: 0,
                                delay: isFlipping ? i * 0.08 : 0
                              }}
                            >
                              <div
                                className="absolute inset-0  flex items-center justify-center overflow-hidden"
                                style={{ backfaceVisibility: 'hidden' }}
                              >
                                <img
                                  src={isFlipping ? headImg : ((coinTargets[i] || (prediction === 'Tails' ? 'T' : 'H')) === 'H' ? headImg : tailImg)}
                                  alt={(coinTargets[i] || (prediction === 'Tails' ? 'T' : 'H')) === 'H' ? 'Heads' : 'Tails'}
                                  className={`${coinSizeClass} rounded-full object-cover select-none pointer-events-none`}
                                />
                              </div>
                              <div
                                className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
                                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                              >
                                <img
                                  src={isFlipping ? tailImg : ((coinTargets[i] || (prediction === 'Tails' ? 'T' : 'H')) === 'T' ? tailImg : headImg)}
                                  alt={(coinTargets[i] || (prediction === 'Tails' ? 'T' : 'H')) === 'T' ? 'Tails' : 'Heads'}
                                  className={`${coinSizeClass} rounded-full object-cover select-none pointer-events-none`}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        {bottomCount > 0 && (
                          <div className="flex justify-center gap-2 md:gap-6">
                            {Array.from({ length: bottomCount }).map((_, j) => (
                              <motion.div
                                key={`bot-${j}`}
                                className={`${coinSizeClass} rounded-full relative cursor-pointer shadow-2xl`}
                                style={{ transformStyle: 'preserve-3d' as any, boxShadow: coinGlowShadow }}
                                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                                animate={{
                                  scale: 1,
                                  opacity: 1,
                                  y: 0,
                                  rotateY: isFlipping
                                    ? (360 * 3) + ((coinTargets[topCount + j] || flipTarget) === 'T' ? 180 : 0)
                                    : (gameResult
                                      ? (gameResult.result === 'T' ? 180 : 0)
                                      : (prediction === 'Tails' ? 180 : 0))
                                }}
                                onClick={simulateFlip}
                                transition={{
                                  duration: isFlipping ? FLIP_DURATION_S : (gameResult ? 0 : 0.6),
                                  ease: isFlipping ? [0.15, 0.85, 0.25, 1] : 'easeOut',
                                  repeat: 0,
                                  delay: isFlipping ? (topCount + j) * 0.08 : 0
                                }}
                              >
                                <div
                                  className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
                                  style={{ backfaceVisibility: 'hidden' }}
                                >
                                  <img
                                    src={isFlipping ? headImg : ((coinTargets[topCount + j] || 'H') === 'H' ? headImg : tailImg)}
                                    alt={(coinTargets[topCount + j] || 'H') === 'H' ? 'Heads' : 'Tails'}
                                    className={`${coinSizeClass} rounded-full object-cover select-none pointer-events-none`}
                                  />
                                </div>
                                <div
                                  className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
                                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                                >
                                  <img
                                    src={isFlipping ? tailImg : ((coinTargets[topCount + j] || 'H') === 'T' ? tailImg : headImg)}
                                    alt={(coinTargets[topCount + j] || 'H') === 'T' ? 'Tails' : 'Heads'}
                                    className={`${coinSizeClass} rounded-full object-cover select-none pointer-events-none`}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>


              </div>

            </div>
            <div className=" flex w-screen  md:w-fit md:space-y-6 ">


              {/* Right Panel - Betting Controls */}
              <div className='w-full'>
                <Card className="w-full px-0 lg:px-10 bg-transparent border-none md:border lg:border-white/30 lg:shadow-lg lg:bg-white/10 lg:rounded-2xl  relative overflow-hidden ">
                  <div className="pointer-events-none absolute lg:inset-0 rounded-2xl" />
                  <CardHeader>
                    <CardTitle className=" text-casino-gold rounded-lg text-xl md:text-3xl font-bold flex items-center gap-2">
                      <Target className="md:w-5 md:h-5 w-4 h-4" />
                      Betting Panel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Bet Amount */}
                    <div className='flex  gap-7 items-center justify-between'>
                      <div className='flex flex-col md:flex-row gap-2 md:gap-7 md:items-center md:w-full'>
                        <label className="text-casino-silver font-bold text-lg flex  md:w-fit">Bet Amount <span className="hidden md:block">:</span></label>
                        <div className='flex flex-col gap-2'>
                          <div className="relative flex flex-row ">
                            <Input
                              type="number"
                              placeholder="Enter amount..."
                              value={betAmount}
                              onChange={(e) => setBetAmount(e.target.value)}
                              className={`bg-black/40 border text-lg h-10 pr-12 font-bold placeholder:text-casino-silver/50 focus:ring-casino-gold/20
        ${(!betAmount || parseInt(betAmount) <= 0)
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-casino-gold/50 text-casino-gold focus:border-casino-gold"
                                }`}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-casino-gold text-sm font-bold">
                              $
                            </div>
                          </div>

                        </div>
                        <div className='flex md:gap-2 gap-7 items-center pt-2 md:pt-0'>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              onClick={() => handleQuickChip(Math.max(parseInt(betAmount) * 2, 1))}
                              className="w-20 bg-casino-royal-purple/60 border border-casino-silver/40 
                   text-casino-silver hover:bg-casino-silver/20 
                   hover:border-casino-silver hover:text-white font-bold"
                              size="sm"
                            >
                              2x
                            </Button>
                          </motion.div>

                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              onClick={() => handleQuickChip(Math.max(Math.floor(parseInt(betAmount) / 2), 1))}
                              className="w-20 bg-casino-royal-purple/60 border border-casino-silver/40 
                   text-casino-silver hover:bg-casino-silver/20 
                   hover:border-casino-silver hover:text-white font-bold"
                              size="sm"
                            >
                              1/2
                            </Button>
                          </motion.div>
                        </div>

                      </div>
                    </div>

                    {/* coin selections */}

                    <div className='flex flex-col md:flex-row w-full gap-5'>
                      {/* Number of coins */}
                      <div className="w-full md:w-1/2 mt-6">
                        <div className="flex items-center justify-between mb-2 pr-2">
                          <label className="text-casino-silver font-bold text-lg">Number of Coins</label>
                          <span className="text-casino-gold font-bold text-lg">{numCoins}</span>
                        </div>
                        <div className='p-5 bg-black/40 rounded-lg'>
                          <Slider value={[numCoins]} min={1} max={10} step={1} onValueChange={(val) => setNumCoins(val[0])} />
                        </div>
                      </div>

                      {/* Number of Heads/Tails */}
                      <div className="w-full md:w-1/2 mt-6">
                        <div className="flex items-center justify-between mb-2 pr-2">
                          <label className="text-casino-silver font-bold text-lg">Number of {prediction || 'Heads/Tails'}</label>
                          <span className="text-casino-gold font-bold text-lg">{numChoice}</span>
                        </div>
                        <div className='p-5 bg-black/40 rounded-lg'>
                          <Slider
                            value={[numChoice]}
                            min={getMinChoice(numCoins)}
                            max={numCoins}
                            step={1}
                            onValueChange={(val) => setNumChoice(val[0])}
                          />
                        </div>
                      </div>
                    </div>






                    {/* Betting Ratio Selection */}
                    <div className=''>
                      <div className='flex flex-col md:flex-row gap-3 justify-between'>
                        <div className='flex flex-col'>
                          <label className="text-casino-silver font-bold text-lg block">Betting Ratio</label>
                          <Select
                            value={selectedRatio.ratio}
                            onValueChange={(value) => {
                              const ratio = bettingRatios.find(r => r.ratio === value);
                              if (ratio) setSelectedRatio(ratio);
                            }}
                          >
                            <SelectTrigger className="w-full md:w-fit h-12 bg-black/40 border-casino-gold/50 text-casino-gold font-bold text-lg focus:border-casino-gold focus:ring-casino-gold/20">
                              <SelectValue placeholder="Select ratio..." />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-casino-gold/50 backdrop-blur-md">
                              {bettingRatios.map((ratio) => (
                                <SelectItem
                                  key={ratio.ratio}
                                  value={ratio.ratio}
                                  className="text-casino-silver hover:bg-casino-gold/20 hover:text-casino-gold focus:bg-casino-gold/20 focus:text-casino-gold font-medium"
                                >
                                  {ratio.display}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className='flex flex-col'>
                          <label className="text-casino-silver font-bold text-lg">Potential Win</label>
                          <span className="text-casino-neon-green font-bold text-2xl border border-green-500 bg-black/40 rounded-lg px-4 py-2">₡{calculateWinAmount().toLocaleString()}</span>
                        </div>

                        {/* head or tail selection */}
                        <div className='flex gap-2 md:gap-4 justify-center md:justify-start'>
                          <img
                            src={headImg}
                            alt="head"
                            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-full cursor-pointer transition-all duration-300 ${prediction === 'Heads'
                              ? 'ring-4 ring-casino-gold shadow-lg shadow-casino-gold/50 scale-110'
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                              }`}
                            onClick={() => setPrediction('Heads')}
                            style={{
                              boxShadow: prediction === 'Heads' ? selectionGoldGlow : 'none'
                            }}
                          />
                          <img
                            src={tailImg}
                            alt="tail"
                            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-full cursor-pointer transition-all duration-300 ${prediction === 'Tails'
                              ? 'ring-4 ring-casino-silver shadow-lg shadow-casino-silver/50 scale-110'
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                              }`}
                            onClick={() => setPrediction('Tails')}
                            style={{
                              boxShadow: prediction === 'Tails' ? selectionSilverGlow : 'none'
                            }}
                          />
                        </div>

                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        onClick={simulateFlip}
                        disabled={!betAmount || parseInt(betAmount) <= 0 || !prediction || isFlipping}
                        className="w-full md:w-40 text-xl md:text-2xl font-black tracking-widest 
              bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 
              text-black hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-600 
              shadow-2xl shadow-yellow-500/40 transition-all duration-300 
              relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      >

                        {isFlipping ? (
                          <div className="flex items-center gap-4">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Coins className="w-8 h-8" />
                            </motion.div>
                            <span className="tracking-widest">FLIPPING...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <Zap className="w-8 h-8" />
                            <span className="tracking-widest">FLIP NOW</span>
                            <Zap className="w-8 h-8" />
                          </div>
                        )}

                        {!isFlipping && betAmount && parseInt(betAmount) > 0 && prediction && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          />
                        )}
                      </Button>
                    </motion.div>

                  </CardContent>
                </Card>












              </div>

            </div>
          </div >

        </div >
        <div className="flex flex-col gap-6 p-6 md:max-w-7xl md:mx-auto h-auto lg:h-full ">



          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-black/60 to-casino-royal-purple/40 border-casino-silver/40 backdrop-blur-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-casino-silver text-lg">Recent Flips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden -ms-overflow-style-none scrollbar-width-none">
                  {[
                    { result: 'H', amount: 500, won: true, time: '2s ago' },
                    { result: 'T', amount: 250, won: false, time: '45s ago' },
                    { result: 'H', amount: 1000, won: true, time: '1m ago' },
                    { result: 'T', amount: 750, won: true, time: '2m ago' }
                  ].map((flip, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-casino-silver/10 last:border-b-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-3 ">
                        <div className={`w-6 h-6 rounded-full coin-3d text-xs flex items-center justify-center font-bold text-casino-deep-blue`}>
                          ₿
                        </div>
                        <div>
                          <div className="text-casino-silver text-sm font-medium">
                            {flip.result === 'H' ? 'Heads' : 'Tails'}
                          </div>
                          <div className="text-casino-silver/60 text-xs">{flip.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-sm ${flip.won ? 'text-casino-neon-green' : 'text-red-400'}`}>
                          {flip.won ? '+' : '-'}₡{flip.amount}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Game Stats & Leaderboard */}
          <div className="flex flex-col  md:grid md:grid-cols-2 h-screen gap-6 ">

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className=''
            >
              <Card className="bg-gradient-to-br  from-black/60 to-casino-deep-blue/40 border-casino-gold/40 backdrop-blur-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-casino-gold text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-casino-silver/70">Win Rate</span>
                      <span className="text-casino-neon-green font-bold text-xl">{winRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-casino-silver/70">Win Streak</span>
                      <span className="text-casino-gold font-bold text-xl">{winStreak}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-casino-silver/70">Total Games</span>
                      <span className="text-casino-silver font-bold text-xl">{totalGames}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-casino-gold/20">
                    <div className="flex justify-between items-center">
                      <span className="text-casino-silver/70">Profit</span>
                      <span className="text-casino-neon-green font-bold text-xl">+₡12,430</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}

            >
              <Card className="bg-gradient-to-br  from-black/60 to-casino-royal-purple/40 border-casino-silver/40 backdrop-blur-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-casino-silver text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "BitcoinKing", profit: "+₡847K", rate: "94.2%" },
                    { name: "CoinMaster", profit: "+₡623K", rate: "91.8%" },
                    { name: "FlipLord", profit: "+₡456K", rate: "89.3%" }
                  ].map((player, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-casino-gold text-black' :
                          i === 1 ? 'bg-casino-silver text-black' :
                            'bg-casino-royal-purple text-white'
                          }`}>
                          {i + 1}
                        </div>
                        <span className="text-casino-silver font-medium text-sm">{player.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-casino-neon-green text-sm font-bold">{player.profit}</div>
                        <div className="text-casino-silver/60 text-xs">{player.rate}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Game Result Dialog */}
        <AnimatePresence>
          {
            showResultDialog && gameResult && (
              <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
                <DialogContent className="bg-gradient-to-br from-casino-deep-blue via-black to-casino-royal-purple border-2 border-casino-gold max-w-md backdrop-blur-md">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0, rotateY: -180 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    exit={{ scale: 0.7, opacity: 0, rotateY: 180 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <DialogHeader>
                      <DialogTitle className="text-center space-y-4">
                        <motion.div
                          initial={{ y: -30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className={`text-4xl font-black tracking-wider ${gameResult.won ? 'text-casino-neon-green' : 'text-red-400'}`}
                        >
                          {gameResult.won ? '🎊 VICTORY! 🎊' : '💥 DEFEAT 💥'}
                        </motion.div>
                      </DialogTitle>
                    </DialogHeader>

                    <div className="text-center space-y-6 py-8">
                      {/* Coin Result with Animation */}
                      <motion.div
                        initial={{ rotateY: 0, scale: 0 }}
                        animate={{
                          rotateY: gameResult.result === 'H' ? 0 : 180,
                          scale: 1
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="flex justify-center"
                      >
                        <div className="w-32 h-32 rounded-full relative shadow-2xl overflow-hidden">
                          {gameResult.result === 'H' ? (
                            <img src={headImg} alt="Heads" className="w-full h-full object-cover" />
                          ) : (
                            <img src={tailImg} alt="Tails" className="w-full h-full object-cover" />
                          )}
                        </div>
                      </motion.div>

                      {/* Result Details */}
                      <motion.div
                        className="space-y-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-casino-silver text-lg">
                          Result: <span className="font-bold text-casino-gold text-xl">
                            {gameResult.result === 'H' ? 'HEADS' : 'TAILS'}
                          </span>
                        </p>
                        <p className="text-casino-silver text-lg">
                          Your Choice: <span className="font-bold text-casino-neon-green text-xl">
                            {prediction?.toUpperCase()}
                          </span>
                        </p>
                      </motion.div>

                      {/* Payout Display */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.7,
                          type: "spring",
                          stiffness: 200,
                          damping: 10
                        }}
                        className="py-6"
                      >
                        <div className={`text-5xl font-black tracking-wider ${gameResult.won ? 'text-casino-neon-green' : 'text-red-400'}`}>
                          {gameResult.won ? '+' : ''}₡{Math.abs(gameResult.payout).toLocaleString()}
                        </div>
                        <div className="text-casino-silver mt-3 text-lg">
                          New Balance: <span className="text-casino-gold font-bold text-xl">₡{wallet.toLocaleString()}</span>
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex gap-4 justify-center"
                      >
                        <Button
                          onClick={playAgain}
                          className="bg-gradient-to-r from-casino-neon-green to-green-400 text-black font-bold px-8 py-3 hover:from-casino-neon-green/90 hover:to-green-400/90 shadow-lg shadow-casino-neon-green/30"
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          FLIP AGAIN
                        </Button>
                        <Button
                          onClick={() => setShowResultDialog(false)}
                          variant="outline"
                          className="border-casino-silver text-casino-silver hover:bg-casino-silver hover:text-casino-deep-blue px-8 py-3 font-bold"
                        >
                          CLOSE
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </DialogContent>
              </Dialog>
            )
          }
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CoinToss;