import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const TransactionsView = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [allTransactions, setAllTransactions] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 5; // rows per page

    const filters = ["All", "Withdrawal", "Deposited"];

    // Simulate backend fetch with dummy API
    useEffect(() => {
        const fetchTransactions = async () => {
            // Dummy: pulling posts and mapping to your table format
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await res.json();

            // Format data into your table structure
            const formatted = data.slice(0, 20).map((item: any, index: number) => ({
                date: `2025-09-${(index % 30) + 1}`,
                type: index % 2 === 0 ? "Deposit" : "Withdrawal",
                method: index % 3 === 0 ? "UPI" : "Card",
                id: `TXN${1000 + item.id}`,
                amount: `$${(Math.random() * 500).toFixed(2)}`,
                status: index % 2 === 0 ? "Success" : "Pending",
            }));

            // Set the full data for filtering
            setAllTransactions(formatted);
        };

        fetchTransactions();
    }, []);
    useEffect(() => {
        if (allTransactions.length === 0) return; // Don't filter if no data loaded yet

        let filtered = allTransactions;

        if (activeFilter === "Withdrawal") {
            filtered = allTransactions.filter((t) => t.type === "Withdrawal");
        } else if (activeFilter === "Deposited") {
            filtered = allTransactions.filter((t) => t.type === "Deposit");
        }

        const startIndex = (currentPage - 1) * pageSize;
        const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

        setTransactions(paginatedData);
        setTotalPages(Math.max(1, Math.ceil(filtered.length / pageSize)));
    }, [allTransactions, activeFilter, currentPage]);


    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };


    return (
        <Card className="bg-card border-border">
            <div className="p-6">
                {/* Filter Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-gray-400 border shadow-lg hover:bg-primary/90 hover:text-black w-full sm:w-auto"
                                >
                                    Filter by: {activeFilter} ▼
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border flex flex-col gap-2 border-gray-600 text-white w-48">
                                {filters.map((filter) => (
                                    <DropdownMenuItem
                                        key={filter}
                                        onClick={() => {
                                            setCurrentPage(1);
                                            setActiveFilter(filter);
                                        }}
                                        className={`cursor-pointer ${activeFilter === filter
                                            ? "bg-primary text-black font-medium"
                                            : "text-gray-300 hover:bg-primary/90 hover:text-black"
                                            }`}
                                    >
                                        {filter}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block border border-gray-700 rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-700 hover:bg-transparent">
                                <TableHead className="text-gray-400 font-semibold">Date</TableHead>
                                <TableHead className="text-gray-400 font-semibold">Type</TableHead>
                                <TableHead className="text-gray-400 font-semibold">Method</TableHead>
                                <TableHead className="text-gray-400 font-semibold">Transaction</TableHead>
                                <TableHead className="text-gray-400 font-semibold">Amount</TableHead>
                                <TableHead className="text-gray-400 font-semibold">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12">
                                        <div className="text-gray-500 text-lg">NO TRANSACTIONS FOUND.</div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((t, index) => (
                                    <TableRow key={index} className="border-gray-700 hover:bg-gray-800/50">
                                        <TableCell className="text-gray-300">{t.date}</TableCell>
                                        <TableCell className="text-gray-300">{t.type}</TableCell>
                                        <TableCell className="text-gray-300">{t.method}</TableCell>
                                        <TableCell className="text-gray-300">{t.id}</TableCell>
                                        <TableCell className="text-gray-300">{t.amount}</TableCell>
                                        <TableCell className="text-gray-300">{t.status}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {transactions.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg">NO TRANSACTIONS FOUND.</div>
                        </div>
                    ) : (
                        transactions.map((t, index) => (
                            <div key={index} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-white font-medium">{t.type}</div>
                                        <div className="text-gray-400 text-sm">{t.date}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-medium">{t.amount}</div>
                                        <div className={`text-xs px-2 py-1 rounded ${t.status === "Success"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                            }`}>
                                            {t.status}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Method:</span>
                                    <span className="text-gray-300">{t.method}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Transaction ID:</span>
                                    <span className="text-gray-300 font-mono text-xs">{t.id}</span>
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
            </div>
        </Card>
    );
};

export default TransactionsView;
