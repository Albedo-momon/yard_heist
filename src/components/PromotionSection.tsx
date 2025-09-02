import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Clock, Zap } from "lucide-react";

const PromotionsSection = () => {
    return (
        <section id="promotions" className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Exclusive Promotions
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Don't miss out on these limited-time offers and massive rewards
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Welcome Bonus */}
                    <Card className="relative overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
                        <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground px-3 py-1 text-sm font-bold">
                            HOT
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Gift className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Welcome Bonus</h3>
                            </div>
                            <p className="text-3xl font-bold text-primary mb-2">200% + 50 Spins</p>
                            <p className="text-muted-foreground mb-6">
                                Get up to $1,000 bonus on your first deposit plus 50 free spins
                            </p>
                            <Button
                                className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300"
                            >
                                Claim Now
                            </Button>
                        </div>
                    </Card>

                    {/* Daily Rewards */}
                    <Card className="bg-gradient-card border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-purple-glow group">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-secondary/10 rounded-lg">
                                    <Clock className="h-6 w-6 text-secondary" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Daily Rewards</h3>
                            </div>
                            <p className="text-3xl font-bold text-secondary mb-2">500 Credits</p>
                            <p className="text-muted-foreground mb-6">
                                Login daily to claim your free credits and build your streak
                            </p>
                            <Button
                                variant="outline"
                                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:shadow-purple-glow transition-all duration-300"
                            >
                                Collect Daily
                            </Button>
                        </div>
                    </Card>

                    {/* VIP Program */}
                    <Card className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group md:col-span-2 lg:col-span-1">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">VIP Program</h3>
                            </div>
                            <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                                Elite Status
                            </p>
                            <p className="text-muted-foreground mb-6">
                                Unlock exclusive perks, higher limits, and personal account manager
                            </p>
                            <Button
                                variant="outline"
                                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-glow transition-all duration-300"
                            >
                                Learn More
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default PromotionsSection;