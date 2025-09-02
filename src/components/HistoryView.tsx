import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface HistoryItem {
    id: string;
    date: string;
    game: string;
    betAmount: string;
    payout: string;
    profit: number;
    multiplier: string;
    fairnessHash: string;
    status: "win" | "loss";
}

const HistoryView = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [allHistory, setAllHistory] = useState<HistoryItem[]>([]);
    const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFairnessDialog, setShowFairnessDialog] = useState(false);
    const [selectedBet, setSelectedBet] = useState<HistoryItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const pageSize = 10; // rows per page
    const filters = ["All", "Today", "Yesterday", "This Week", "This Month", "Wins", "Losses"];

    // Generate dummy betting history data
    const generateHistoryData = (): HistoryItem[] => {
        const games = ["Coin Toss", "Dice Roll", "Roulette", "Blackjack", "Slots", "Crash"];
        const data: HistoryItem[] = [];

        for (let i = 1; i <= 50; i++) {
            const isWin = Math.random() > 0.4; // 60% win rate for demo
            const betAmount = (Math.random() * 100 + 10).toFixed(2);
            const multiplier = isWin ? (Math.random() * 5 + 1).toFixed(2) : "0.00";
            const payout = isWin ? (parseFloat(betAmount) * parseFloat(multiplier)).toFixed(2) : "0.00";
            const profit = parseFloat(payout) - parseFloat(betAmount);

            const daysAgo = Math.floor(Math.random() * 30);
            const date = new Date();
            date.setDate(date.getDate() - daysAgo);

            data.push({
                id: `BET${1000 + i}`,
                date: date.toISOString().split('T')[0],
                game: games[Math.floor(Math.random() * games.length)],
                betAmount: `$${betAmount}`,
                payout: `$${payout}`,
                profit: profit,
                multiplier: `${multiplier}x`,
                fairnessHash: `0x${Math.random().toString(16).substring(2, 18)}...`,
                status: isWin ? "win" : "loss"
            });
        }

        return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    // Fetch history data on component mount
    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                const data = generateHistoryData();
                setAllHistory(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    // Filter and paginate data
    useEffect(() => {
        if (allHistory.length === 0) return;

        let filtered = allHistory;
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const thisWeek = new Date(today);
        thisWeek.setDate(thisWeek.getDate() - 7);
        const thisMonth = new Date(today);
        thisMonth.setDate(thisMonth.getDate() - 30);

        switch (activeFilter) {
            case "Today":
                filtered = allHistory.filter(item =>
                    new Date(item.date).toDateString() === today.toDateString()
                );
                break;
            case "Yesterday":
                filtered = allHistory.filter(item =>
                    new Date(item.date).toDateString() === yesterday.toDateString()
                );
                break;
            case "This Week":
                filtered = allHistory.filter(item =>
                    new Date(item.date) >= thisWeek
                );
                break;
            case "This Month":
                filtered = allHistory.filter(item =>
                    new Date(item.date) >= thisMonth
                );
                break;
            case "Wins":
                filtered = allHistory.filter(item => item.status === "win");
                break;
            case "Losses":
                filtered = allHistory.filter(item => item.status === "loss");
                break;
            default:
                filtered = allHistory;
        }

        const startIndex = (currentPage - 1) * pageSize;
        const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

        setHistoryData(paginatedData);
        setTotalPages(Math.max(1, Math.ceil(filtered.length / pageSize)));
    }, [allHistory, activeFilter, currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const handleVerifyFairness = (bet: HistoryItem) => {
        setSelectedBet(bet);
        setShowFairnessDialog(true);
    };

    const formatProfit = (profit: number) => {
        const sign = profit >= 0 ? "+" : "";
        return `${sign}$${profit.toFixed(2)}`;
    };

    return (
        <>
            <Card className="bg-card border-border">
                <div className="p-6">
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {filters.map((filter) => (
                            <Button
                                key={filter}
                                variant={activeFilter === filter ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleFilterChange(filter)}
                                className={`mb-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${activeFilter === filter
                                    ? "bg-green-500 text-black hover:bg-green-600"
                                    : "border-gray-600 text-gray-300 hover:text-green-400 hover:border-green-500"
                                    }`}
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>

                    {/* Loading State */}
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg">Loading betting history...</div>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden lg:block border border-gray-700 rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-gray-700 hover:bg-transparent">
                                            <TableHead className="text-gray-400 font-semibold">ID</TableHead>
                                            <TableHead className="text-gray-400 font-semibold">Date</TableHead>
                                            <TableHead className="text-gray-400 font-semibold">Game</TableHead>
                                            <TableHead className="text-gray-400 font-semibold">Bet Amount</TableHead>
                                            <TableHead className="text-gray-400 font-semibold">Multiplier</TableHead>
                                            <TableHead className="text-gray-400 font-semibold">Payout</TableHead>
                                            <TableHead className="text-gray-400 font-semibold">Profit</TableHead>
                                            <TableHead className="text-gray-400 font-semibold">Fairness</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {historyData.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-center py-12">
                                                    <div className="text-gray-500 text-lg">
                                                        NO BETS FOUND.
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            historyData.map((bet) => (
                                                <TableRow key={bet.id} className="border-gray-700 hover:bg-gray-800/50">
                                                    <TableCell className="text-gray-300 font-mono text-sm">{bet.id}</TableCell>
                                                    <TableCell className="text-gray-300">{bet.date}</TableCell>
                                                    <TableCell className="text-gray-300">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg">🎮</span>
                                                            {bet.game}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-gray-300 font-medium">{bet.betAmount}</TableCell>
                                                    <TableCell className="text-gray-300 font-medium">{bet.multiplier}</TableCell>
                                                    <TableCell className="text-gray-300 font-medium">{bet.payout}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className={`font-medium ${bet.profit >= 0
                                                                ? "border-green-500 text-green-400"
                                                                : "border-red-500 text-red-400"
                                                                }`}
                                                        >
                                                            {formatProfit(bet.profit)}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleVerifyFairness(bet)}
                                                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                                                        >
                                                            🎲 Verify
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden space-y-4">
                                {historyData.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-gray-500 text-lg">NO BETS FOUND.</div>
                                    </div>
                                ) : (
                                    historyData.map((bet) => (
                                        <div key={bet.id} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-lg">🎮</span>
                                                        <span className="text-white font-medium">{bet.game}</span>
                                                    </div>
                                                    <div className="text-gray-400 text-sm font-mono">{bet.id}</div>
                                                    <div className="text-gray-400 text-sm">{bet.date}</div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge
                                                        variant="outline"
                                                        className={`font-medium mb-2 ${bet.profit >= 0
                                                            ? "border-green-500 text-green-400"
                                                            : "border-red-500 text-red-400"
                                                            }`}
                                                    >
                                                        {formatProfit(bet.profit)}
                                                    </Badge>
                                                    <div className="text-white font-medium">{bet.payout}</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Bet:</span>
                                                    <span className="text-gray-300 font-medium">{bet.betAmount}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Multiplier:</span>
                                                    <span className="text-gray-300 font-medium">{bet.multiplier}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                                                <span className="text-gray-400 text-sm">Fairness:</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleVerifyFairness(bet)}
                                                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 text-sm px-3 py-1"
                                                >
                                                    🎲 Verify
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-6">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                    className="text-gray-400 hover:text-gray-300 disabled:opacity-50"
                                >
                                    ←
                                </Button>
                                <div className="text-gray-400 text-sm">
                                    Page <span className="text-white">{currentPage}</span> / {totalPages}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="text-gray-400 hover:text-gray-300 disabled:opacity-50"
                                >
                                    →
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Card>

            {/* Fairness Verification Dialog */}
            <Dialog open={showFairnessDialog} onOpenChange={setShowFairnessDialog}>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-white">🎲 Fairness Verification</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Verify the fairness of your bet using cryptographic proof
                        </DialogDescription>
                    </DialogHeader>
                    {selectedBet && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium">Bet ID</label>
                                    <div className="bg-gray-800 p-3 rounded border border-gray-600">
                                        <code className="text-green-400 text-sm">{selectedBet.id}</code>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium">Game</label>
                                    <div className="bg-gray-800 p-3 rounded border border-gray-600">
                                        <span className="text-white text-sm">{selectedBet.game}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium">Bet Amount</label>
                                    <div className="bg-gray-800 p-3 rounded border border-gray-600">
                                        <span className="text-white text-sm font-medium">{selectedBet.betAmount}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium">Result</label>
                                    <div className="bg-gray-800 p-3 rounded border border-gray-600">
                                        <Badge
                                            variant="outline"
                                            className={`${selectedBet.status === "win"
                                                ? "border-green-500 text-green-400"
                                                : "border-red-500 text-red-400"
                                                }`}
                                        >
                                            {selectedBet.status.toUpperCase()}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium">Server Seed Hash</label>
                                <div className="bg-gray-800 p-3 rounded border border-gray-600">
                                    <code className="text-blue-400 text-xs break-all">{selectedBet.fairnessHash}</code>
                                </div>
                            </div>

                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-green-400">✅</span>
                                    <span className="text-green-400 font-medium">Verification Successful</span>
                                </div>
                                <p className="text-gray-300 text-sm">
                                    This bet has been cryptographically verified as provably fair.
                                    The outcome was determined using verifiable randomness.
                                </p>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            onClick={() => setShowFairnessDialog(false)}
                            className="bg-green-500 hover:bg-green-600 text-black"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default HistoryView;
