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
    <section id="leaderboard" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Platform Stats
            </h2>
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border-border p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.color.includes('primary') ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Top Winners Today
              </h2>
            </div>

            <Card className="bg-card border-border overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  {leaderboard.map((player, index) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:bg-gray-800/50 ${index < 3 ? 'bg-primary/5 border border-primary/20' : 'bg-muted/5'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${index === 0 ? 'bg-gradient-to-br from-green-500 to-green-700 text-black' :
                          index === 1 ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-black' :
                            index === 2 ? 'bg-accent text-accent-foreground' :
                              'bg-muted text-muted-foreground'
                          }`}>
                          {player.rank}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{player.avatar}</span>
                          <div>
                            <p className="font-semibold text-foreground">{player.username}</p>
                            <p className="text-sm text-muted-foreground">
                              {index === 0 ? '🥇 Champion' :
                                index === 1 ? '🥈 Runner-up' :
                                  index === 2 ? '🥉 Third Place' : 'Top Player'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${index < 3 ? 'text-primary' : 'text-foreground'
                          }`}>
                          ${player.winnings}
                        </p>
                        <p className="text-sm text-muted-foreground">Credits</p>
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