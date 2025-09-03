import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Zap, Crown, Medal } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Achievements = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { user } = useAuth();

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const achievements = [
        {
            id: 1,
            title: "First Win",
            description: "Win your first game",
            icon: Trophy,
            completed: true,
            progress: 100,
            rarity: "Common",
            points: 10,
            unlockedAt: "2024-01-15"
        },
        {
            id: 2,
            title: "Lucky Streak",
            description: "Win 5 games in a row",
            icon: Star,
            completed: true,
            progress: 100,
            rarity: "Rare",
            points: 50,
            unlockedAt: "2024-01-20"
        },
        {
            id: 3,
            title: "High Roller",
            description: "Bet over 1000 coins in a single game",
            icon: Crown,
            completed: false,
            progress: 65,
            rarity: "Epic",
            points: 100,
            unlockedAt: null
        },
        {
            id: 4,
            title: "Speed Demon",
            description: "Complete 10 games in under 5 minutes",
            icon: Zap,
            completed: false,
            progress: 30,
            rarity: "Rare",
            points: 75,
            unlockedAt: null
        },
        {
            id: 5,
            title: "Perfectionist",
            description: "Win 100 games without losing",
            icon: Target,
            completed: false,
            progress: 12,
            rarity: "Legendary",
            points: 500,
            unlockedAt: null
        },
        {
            id: 6,
            title: "Coin Master",
            description: "Accumulate 10,000 coins",
            icon: Medal,
            completed: false,
            progress: 0,
            rarity: "Epic",
            points: 200,
            unlockedAt: null
        }
    ];

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "Common": return "bg-gray-600 text-gray-100";
            case "Rare": return "bg-blue-600 text-blue-100";
            case "Epic": return "bg-purple-600 text-purple-100";
            case "Legendary": return "bg-yellow-600 text-yellow-100";
            default: return "bg-gray-600 text-gray-100";
        }
    };

    const completedAchievements = achievements.filter(a => a.completed);
    const totalPoints = completedAchievements.reduce((sum, a) => sum + a.points, 0);

    return (
        <div className="min-h-screen bg-black text-white">
            <Header onToggleChat={toggleChat} />

            <main className="container mx-auto px-4 sm:px-6 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                        🏆 Achievements
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Track your progress and unlock rewards
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-gray-900 border-gray-700">
                        <CardContent className="p-6 text-center">
                            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                            <div className="text-2xl font-bold text-white">{completedAchievements.length}</div>
                            <div className="text-sm text-gray-400">Unlocked</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-700">
                        <CardContent className="p-6 text-center">
                            <Star className="h-8 w-8 mx-auto mb-2 text-green-500" />
                            <div className="text-2xl font-bold text-white">{totalPoints}</div>
                            <div className="text-sm text-gray-400">Total Points</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-700">
                        <CardContent className="p-6 text-center">
                            <Target className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                            <div className="text-2xl font-bold text-white">
                                {Math.round((completedAchievements.length / achievements.length) * 100)}%
                            </div>
                            <div className="text-sm text-gray-400">Completion</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                            <Card
                                key={achievement.id}
                                className={`bg-gray-900 border-gray-700 transition-all duration-300 hover:scale-105 ${achievement.completed ? 'ring-2 ring-green-500/50' : ''
                                    }`}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className={`p-2 rounded-full ${achievement.completed ? 'bg-green-600' : 'bg-gray-700'}`}>
                                            <Icon className={`h-6 w-6 ${achievement.completed ? 'text-white' : 'text-gray-400'}`} />
                                        </div>
                                        <Badge className={`${getRarityColor(achievement.rarity)} text-xs`}>
                                            {achievement.rarity}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg font-bold text-white">
                                        {achievement.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        {achievement.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    {!achievement.completed && (
                                        <div className="mb-3">
                                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                <span>Progress</span>
                                                <span>{achievement.progress}%</span>
                                            </div>
                                            <Progress
                                                value={achievement.progress}
                                                className="h-2 bg-gray-700"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm font-medium text-yellow-500">
                                                {achievement.points} pts
                                            </span>
                                        </div>

                                        {achievement.completed && achievement.unlockedAt && (
                                            <div className="text-xs text-green-400">
                                                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Coming Soon Section */}
                <div className="mt-12 text-center">
                    <div className="inline-block p-6 bg-gray-900 border border-gray-700 rounded-lg">
                        <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                        <h3 className="text-xl font-bold text-white mb-2">More Coming Soon!</h3>
                        <p className="text-gray-400">
                            We're working on adding more achievements and rewards. Stay tuned!
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Achievements;
