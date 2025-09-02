import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const LiveBetsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const betsData = [
    {
      id: 1,
      game: "Gates of Olympus",
      gameIcon: "🏛️",
      user: "Raidex",
      userAvatar: "/placeholder.svg",
      time: "9/1/2025, 08:22 PM",
      betAmount: "12.50",
      multiplier: "0.00x",
      payout: "-12.50",
      isWin: false
    },
    {
      id: 2,
      game: "The Dog House",
      gameIcon: "🏠",
      user: "matyxbot",
      userAvatar: "/placeholder.svg",
      time: "9/1/2025, 08:22 PM",
      betAmount: "5.40",
      multiplier: "0.20x",
      payout: "-4.32",
      isWin: false
    },
    {
      id: 3,
      game: "Dragon Age: Hold & Win",
      gameIcon: "🐲",
      user: "JustinM",
      userAvatar: "/placeholder.svg",
      time: "9/1/2025, 08:22 PM",
      betAmount: "10.00",
      multiplier: "0.40x",
      payout: "-6.00",
      isWin: false
    },
    {
      id: 4,
      game: "Quantum Flip",
      gameIcon: "🪙",
      user: "CryptoKing",
      userAvatar: "/placeholder.svg",
      time: "9/1/2025, 08:21 PM",
      betAmount: "25.00",
      multiplier: "1.98x",
      payout: "+49.50",
      isWin: true
    },
    {
      id: 5,
      game: "Gold Rush with Johnny Cash",
      gameIcon: "💰",
      user: "Richtagesau",
      userAvatar: "/placeholder.svg",
      time: "9/1/2025, 08:20 PM",
      betAmount: "3.00",
      multiplier: "0.00x",
      payout: "-3.00",
      isWin: false
    },
    {
      id: 6,
      game: "The Dog House",
      gameIcon: "🏠",
      user: "matyxbot",
      userAvatar: "/placeholder.svg",
      time: "9/1/2025, 08:19 PM",
      betAmount: "5.40",
      multiplier: "10.00x",
      payout: "+48.60",
      isWin: true
    }
  ];

  const tabs = [
    { id: "all", label: "All" },
    { id: "whale", label: "Whale Wins" },
    { id: "lucky", label: "Lucky Wins" }
  ];

  const filteredBets = betsData.filter(bet => {
    if (activeTab === "whale") return bet.isWin && parseFloat(bet.betAmount) >= 10;
    if (activeTab === "lucky") return bet.isWin && parseFloat(bet.multiplier) >= 5;
    return true;
  });

  return (
    <section id="live-bets" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
              Live Bets
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Watch real-time betting action from players around the world
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-4 sm:p-6">
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 border-b border-border/30">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-none border-b-2 transition-all duration-200 text-sm sm:text-base ${activeTab === tab.id
                    ? "border-primary text-primary bg-primary/10"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Desktop Table View */}
            <ScrollArea className="h-[500px] hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-semibold">Game</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">User</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Time</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Bet amount</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Multiplier</TableHead>
                    <TableHead className="text-muted-foreground font-semibold text-right">Payout</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBets.map((bet) => (
                    <TableRow
                      key={bet.id}
                      className="border-border/20 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{bet.gameIcon}</span>
                          <span className="font-medium text-foreground">{bet.game}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={bet.userAvatar} />
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">
                              {bet.user.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground">{bet.user}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {bet.time}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="text-green-400">🪙</span>
                          <span className="font-medium text-foreground">{bet.betAmount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-border/50 text-muted-foreground">
                          {bet.multiplier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <span className="text-green-400">🪙</span>
                          <span className={`font-bold ${bet.isWin ? "text-green-400" : "text-red-400"
                            }`}>
                            {bet.payout}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            {/* Mobile Card View */}
            <ScrollArea className="h-[500px] md:hidden">
              <div className="space-y-3">
                {filteredBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="bg-muted/20 rounded-lg p-4 border border-border/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={bet.userAvatar} />
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {bet.user.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium text-foreground block">{bet.user}</span>
                          <span className="text-xs text-muted-foreground">{bet.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-green-400">🪙</span>
                        <span className={`font-bold ${bet.isWin ? "text-green-400" : "text-red-400"
                          }`}>
                          {bet.payout}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{bet.gameIcon}</span>
                        <span className="text-sm font-medium text-foreground">{bet.game}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-green-400">🪙</span>
                          <span className="text-sm font-medium text-foreground">{bet.betAmount}</span>
                        </div>
                        <Badge variant="outline" className="border-border/50 text-muted-foreground text-xs">
                          {bet.multiplier}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LiveBetsSection;