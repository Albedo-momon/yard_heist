import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalChat from "@/components/GlobalChat";
import TransactionsView from "@/components/TransactionsView";
import HistoryView from "@/components/HistoryView";
import SettingsView from "@/components/SettingsView";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Profile = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Transactions");

    const handleToggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    const userStats = {
        username: "adbedo",
        isNew: true,
        level: 0,
        totalXP: 100,
        currentXP: 0,
        memberSince: "8/26/2025",
        deposited: "0.00",
        withdrawn: "0.00",
        totalWagered: "0.00",
        netProfit: "0.00"
    };

    return (
        <div className="min-h-screen bg-background flex">
            <div className="flex-1">
                <Header onToggleChat={handleToggleChat} />
                <main className="py-8">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Profile Header - Desktop Only */}
                        <div className="hidden sm:flex flex-col gap-4 mb-6 sm:mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                                    🔰
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-white">Profile Page</h1>
                                    <Link to="/dashboard" className="text-xs sm:text-sm text-gray-400 hover:text-green-400 transition-colors">
                                        ← Back to Dashboard
                                    </Link>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 overflow-x-auto">
                                <Button
                                    variant="ghost"
                                    onClick={() => setActiveTab("Transactions")}
                                    className={`text-sm px-3 py-2 transition-colors whitespace-nowrap ${activeTab === "Transactions"
                                        ? "text-green-400 bg-green-400/10"
                                        : "text-gray-400 hover:text-green-400"
                                        }`}
                                >
                                    💰 Transactions
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setActiveTab("History")}
                                    className={`text-sm px-3 py-2 transition-colors whitespace-nowrap ${activeTab === "History"
                                        ? "text-green-400 bg-green-400/10"
                                        : "text-gray-400 hover:text-green-400"
                                        }`}
                                >
                                    📊 History
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setActiveTab("Settings")}
                                    className={`text-sm px-3 py-2 transition-colors whitespace-nowrap ${activeTab === "Settings"
                                        ? "text-green-400 bg-green-400/10"
                                        : "text-gray-400 hover:text-green-400"
                                        }`}
                                >
                                    ⚙️ Settings
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Header */}
                        <div className="sm:hidden flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
                                🔰
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Profile Page</h1>
                                <Link to="/dashboard" className="text-xs text-gray-400 hover:text-green-400 transition-colors">
                                    ← Back to Dashboard
                                </Link>
                            </div>
                        </div>

                        {/* User Profile Section */}
                        <Card className="bg-card border-border p-4 sm:p-6 mb-6 sm:mb-8">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
                                {/* Avatar and Basic Info */}
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-primary">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="bg-primary/20 text-primary text-lg sm:text-xl">
                                            😊
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                            <h2 className="text-lg sm:text-xl font-bold text-white">{userStats.username}</h2>
                                            {userStats.isNew && (
                                                <Badge className="bg-green-500 text-black text-xs">NEW</Badge>
                                            )}
                                            <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs">
                                                {userStats.level}
                                            </Badge>
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-400">
                                            {userStats.currentXP} XP / {userStats.totalXP} XP
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 flex-1">
                                    <div className="text-center p-2 sm:p-3 bg-gray-800/30 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-400 mb-1">MEMBER SINCE</div>
                                        <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">{userStats.memberSince}</div>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 bg-gray-800/30 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-400 mb-1">DEPOSITED</div>
                                        <div className="text-green-400 font-semibold text-xs sm:text-sm lg:text-base">🪙 {userStats.deposited}</div>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 bg-gray-800/30 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-400 mb-1">WITHDRAWN</div>
                                        <div className="text-green-400 font-semibold text-xs sm:text-sm lg:text-base">🪙 {userStats.withdrawn}</div>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 bg-gray-800/30 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-400 mb-1">TOTAL WAGERED</div>
                                        <div className="text-green-400 font-semibold text-xs sm:text-sm lg:text-base">🪙 {userStats.totalWagered}</div>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 border-2 border-green-500 rounded-lg bg-green-500/10 col-span-2 sm:col-span-3 lg:col-span-1">
                                        <div className="text-xs sm:text-sm text-gray-400 mb-1">NET PROFIT</div>
                                        <div className="text-green-400 font-semibold text-xs sm:text-sm lg:text-base">🪙 {userStats.netProfit}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Mobile Navigation Dropdown */}
                        <div className="sm:hidden mb-6 w-full flex justify-end">
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-[43%] justify-between border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                                    >
                                        <span className="flex items-center gap-2 ">
                                            {activeTab === "Transactions" && "💰 Transactions"}
                                            {activeTab === "History" && "📊 History"}
                                            {activeTab === "Settings" && "⚙️ Settings"}
                                        </span>
                                        <span>▼</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full bg-gray-800 border border-gray-600">
                                    <DropdownMenuItem
                                        onClick={() => setActiveTab("Transactions")}
                                        className={`cursor-pointer ${activeTab === "Transactions"
                                            ? "bg-green-500/20 text-green-400 "
                                            : "text-gray-300 hover:bg-green-500/10 hover:text-green-400 "
                                            }`}
                                    >
                                        💰 Transactions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setActiveTab("History")}
                                        className={`cursor-pointer ${activeTab === "History"
                                            ? "bg-green-500/20 text-green-400"
                                            : "text-gray-300 hover:bg-green-500/10 hover:text-green-400"
                                            }`}
                                    >
                                        📊 History
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setActiveTab("Settings")}
                                        className={`cursor-pointer ${activeTab === "Settings"
                                            ? "bg-green-500/20 text-green-400"
                                            : "text-gray-300 hover:bg-green-500/10 hover:text-green-400"
                                            }`}
                                    >
                                        ⚙️ Settings
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Dynamic Content Based on Active Tab */}
                        {activeTab === "Transactions" && <TransactionsView />}
                        {activeTab === "History" && <HistoryView />}
                        {activeTab === "Settings" && <SettingsView />}
                    </div>
                </main>
                <Footer />
            </div>
            <GlobalChat isOpen={isChatOpen} onClose={handleCloseChat} />
        </div>
    );
};

export default Profile;
