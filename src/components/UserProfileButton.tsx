import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, Trophy, Wallet, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const UserProfileButton = () => {
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
    };

    const handleNavigation = (path: string, itemName: string) => {
        navigate(path);
        setIsOpen(false); // Close dropdown after navigation
        toast({
            title: `Navigating to ${itemName}`,
            description: `Taking you to your ${itemName.toLowerCase()} page.`,
        });
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 h-8 sm:h-10 px-2 sm:px-3 hover:bg-gray-800 hover:text-green-400 transition-all duration-300"
                >
                    {/* User Avatar */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                            src={user.avatar}
                            alt={`${user.username}'s avatar`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback to default avatar if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${user.username}&background=10b981&color=fff&size=128`;
                            }}
                        />
                    </div>

                    {/* Username - Hidden on very small screens */}
                    <span className="hidden xs:inline text-xs sm:text-sm font-medium text-white truncate max-w-20 sm:max-w-32">
                        {user.username}
                    </span>

                    {/* Dropdown Arrow */}
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 transition-transform duration-200" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-48 sm:w-56 bg-gray-900 border-gray-700 text-white"
                sideOffset={5}
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.username}</p>
                        {user.email && (
                            <p className="text-xs leading-none text-gray-400 truncate">
                                {user.email}
                            </p>
                        )}
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-700" />

                <DropdownMenuItem
                    className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                    onClick={() => handleNavigation('/profile', 'Profile')}
                >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                    onClick={() => handleNavigation('/dashboard', 'Dashboard')}
                >
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                    onClick={() => handleNavigation('/achievements', 'Achievements')}
                >
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>Achievements</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-700" />

                <DropdownMenuItem
                    className="hover:bg-red-900/20 focus:bg-red-900/20 cursor-pointer text-red-400"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfileButton;
