import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GamesSection from "@/components/GamesSection";
import PromotionsSection from "@/components/PromotionSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import GlobalChat from "@/components/GlobalChat";
import LiveBetsSection from "@/components/LiveBetsSection";

const Dashboard = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleToggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    return (
        <div className="min-h-screen bg-background flex">
            <div className="flex-1">
                <Header onToggleChat={handleToggleChat} />
                <main>
                    <HeroSection />
                    <div id="games">
                        <GamesSection />
                    </div>
                    {/* <PromotionsSection /> */}
                    <div id="live-bets">
                        <LiveBetsSection />
                    </div>
                    <StatsSection />
                    <Footer />
                </main>
            </div>
            <GlobalChat isOpen={isChatOpen} onClose={handleCloseChat} />
        </div>
    );
};

export default Dashboard;
