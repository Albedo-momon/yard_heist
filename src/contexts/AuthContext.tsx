import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: number;
    username: string;
    email?: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        // Generate a random avatar URL for demo purposes
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

        const userWithAvatar = {
            ...userData,
            avatar: avatarUrl
        };

        setUser(userWithAvatar);

        // In a real app, you'd also store the token in localStorage/sessionStorage
        localStorage.setItem('user', JSON.stringify(userWithAvatar));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Check for existing user on app load
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

