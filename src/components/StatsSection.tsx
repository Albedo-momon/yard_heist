import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Users, Coins } from "lucide-react";

const StatsSection = () => {
  const leaderboard = [
    { rank: 1, username: "CyberKing", winnings: "125,450", avatar: "👑" },
    { rank: 2, username: "NeonQueen", winnings: "98,230", avatar: "⚡" },
    { rank: 3, username: "QuantumAce", winnings: "87,650", avatar: "🎯" },
    { rank: 4, username: "DigitalPro", winnings: "76,890", avatar: "🚀" },
    { rank: 5, username: "FutureGamer", winnings: "65,420", avatar: "💎" },
  ];

  const stats = [
    { label: "Total Players", value: "50,000+", icon: Users, color: "text-primary" },
    { label: "Games Played", value: "2.5M+", icon: TrendingUp, color: "text-secondary" },
    { label: "Total Winnings", value: "$10M+", icon: Coins, color: "text-primary" },
  ];

  return (
    <section id="leaderboard" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-foreground mb-4 sm:mb-6 text-center lg:text-left">
              Platform Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-card border-border p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-lg ${stat.color.includes('primary') ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                      <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-muted-foreground text-sm sm:text-base">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-primary/10 rounded-lg mx-auto sm:mx-0">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center sm:text-left">
                Top Winners Today
              </h2>
            </div>

            <Card className="bg-card border-border overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {leaderboard.map((player, index) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-gray-800/50 ${index < 3 ? 'bg-primary/5 border border-primary/20' : 'bg-muted/5'
                        }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold flex-shrink-0 ${index === 0 ? 'bg-gradient-to-br from-green-500 to-green-700 text-black' :
                          index === 1 ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-black' :
                            index === 2 ? 'bg-accent text-accent-foreground' :
                              'bg-muted text-muted-foreground'
                          }`}>
                          {player.rank}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <span className="text-lg sm:text-2xl flex-shrink-0">{player.avatar}</span>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground text-sm sm:text-base truncate">{player.username}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {index === 0 ? '🥇 Champion' :
                                index === 1 ? '🥈 Runner-up' :
                                  index === 2 ? '🥉 Third Place' : 'Top Player'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-sm sm:text-lg font-bold ${index < 3 ? 'text-primary' : 'text-foreground'
                          }`}>
                          ${player.winnings}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Credits</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;