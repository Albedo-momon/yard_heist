import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import logoName from "@/assets/background-removed.png";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface FormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { login } = useAuth();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Dummy API simulation
    const simulateAPI = (endpoint: string, data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate different responses based on input
                if (endpoint === "login") {
                    if (data.loginField === "wrong@email.com" || data.loginField === "wronguser") {
                        reject({ message: "Invalid email or username" });
                    } else if (data.password === "wrongpassword") {
                        reject({ message: "Incorrect password" });
                    } else if (!data.loginField || !data.password) {
                        reject({ message: "Please fill in all fields" });
                    } else {
                        resolve({ token: "dummy-jwt-token", user: { id: 1, username: data.loginField } });
                    }
                } else if (endpoint === "register") {
                    if (data.email === "existing@email.com") {
                        reject({ message: "Email already exists" });
                    } else if (data.username === "existinguser") {
                        reject({ message: "Username already taken" });
                    } else if (!data.email || !data.username || !data.password) {
                        reject({ message: "Please fill in all fields" });
                    } else {
                        resolve({ message: "Registration successful", user: { id: 2, username: data.username } });
                    }
                }
            }, 1500); // Simulate network delay
        });
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (isLogin) {
            const loginField = formData.email || formData.username;
            if (!loginField) {
                newErrors.general = "Please enter your email or username";
            }
            if (!formData.password) {
                newErrors.password = "Password is required";
            }
        } else {
            if (!formData.email) {
                newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Please enter a valid email";
            }

            if (!formData.username) {
                newErrors.username = "Username is required";
            } else if (formData.username.length < 3) {
                newErrors.username = "Username must be at least 3 characters";
            }

            if (!formData.password) {
                newErrors.password = "Password is required";
            } else if (formData.password.length < 6) {
                newErrors.password = "Password must be at least 6 characters";
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Please confirm your password";
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            if (isLogin) {
                const loginField = formData.email || formData.username;
                const response = await simulateAPI("login", {
                    loginField,
                    password: formData.password,
                });

                // Login user with response data
                login({
                    id: response.user.id,
                    username: response.user.username,
                    email: loginField.includes('@') ? loginField : undefined,
                });

                toast({
                    title: "Login Successful",
                    description: "Welcome back to Yard Heist!",
                });

                // Reset form and close dialog
                setFormData({ email: "", username: "", password: "", confirmPassword: "" });
                onOpenChange(false);
            } else {
                await simulateAPI("register", {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                });

                toast({
                    title: "Registration Successful",
                    description: "Your account has been created successfully!",
                });

                // Reset form and switch to login
                setFormData({ email: "", username: "", password: "", confirmPassword: "" });
                setIsLogin(true);
            }
        } catch (error: any) {
            setErrors({ general: error.message });
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear errors when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
        if (errors.general) {
            setErrors(prev => ({ ...prev, general: undefined }));
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setFormData({ email: "", username: "", password: "", confirmPassword: "" });
        setErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-gray-700 w-[95vw] max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                <DialogHeader className="text-center">
                    <div className="flex justify-center mb-2 sm:mb-4">
                        <img src={logoName} alt="Yard Heist Logo" className="w-32 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32" />
                    </div>
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                        {isLogin ? "Sign In" : "Register"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 px-1 sm:px-0">
                    {/* General Error */}
                    {errors.general && (
                        <div className="flex items-center gap-2 p-2 sm:p-3 bg-red-900/20 border border-red-500/50 rounded-md">
                            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                            <span className="text-red-400 text-xs sm:text-sm">{errors.general}</span>
                        </div>
                    )}

                    {/* Login Mode - Single field for username or email */}
                    {isLogin ? (
                        <div className="space-y-1 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-medium text-gray-300">
                                Username or Email
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Enter your username or email"
                                    value={formData.email || formData.username}
                                    onChange={(e) => {
                                        // For login, we store in email field but it can be either
                                        handleInputChange("email", e.target.value);
                                    }}
                                    className="pl-10 h-10 sm:h-11 text-sm sm:text-base bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Register Mode - Separate email and username fields */}
                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className={`pl-10 h-10 sm:h-11 text-sm sm:text-base bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 ${errors.email ? "border-red-500" : ""
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="text-red-400 text-xs block">{errors.email}</span>
                                )}
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-gray-300">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        onChange={(e) => handleInputChange("username", e.target.value)}
                                        className={`pl-10 h-10 sm:h-11 text-sm sm:text-base bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 ${errors.username ? "border-red-500" : ""
                                            }`}
                                    />
                                </div>
                                {errors.username && (
                                    <span className="text-red-400 text-xs block">{errors.username}</span>
                                )}
                            </div>
                        </>
                    )}

                    {/* Password Field */}
                    <div className="space-y-1 sm:space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className={`pl-10 pr-10 h-10 sm:h-11 text-sm sm:text-base bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 ${errors.password ? "border-red-500" : ""
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white touch-manipulation"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-red-400 text-xs block">{errors.password}</span>
                        )}
                    </div>

                    {/* Confirm Password Field (Register only) */}
                    {!isLogin && (
                        <div className="space-y-1 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-medium text-gray-300">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                    className={`pl-10 pr-10 h-10 sm:h-11 text-sm sm:text-base bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 ${errors.confirmPassword ? "border-red-500" : ""
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white touch-manipulation"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <span className="text-red-400 text-xs block">{errors.confirmPassword}</span>
                            )}
                        </div>
                    )}

                    {/* Terms Agreement (Register only) */}
                    {!isLogin && (
                        <div className="text-xs sm:text-sm text-gray-400 text-center px-2 leading-relaxed">
                            By accessing this site, I confirm that I am at least 18 years old and have read and
                            agree with the{" "}
                            <a href="#" className="text-green-400 hover:underline">
                                Terms of Service
                            </a>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 sm:h-12 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold text-sm sm:text-base touch-manipulation"
                    >
                        {isLoading ? "Loading..." : isLogin ? "Sign In" : "Register"}
                    </Button>

                    {/* Switch Mode */}
                    <div className="text-center pt-2">
                        <span className="text-gray-400 text-xs sm:text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            type="button"
                            onClick={switchMode}
                            className="text-green-400 hover:underline text-xs sm:text-sm font-medium touch-manipulation"
                        >
                            {isLogin ? "Register" : "Sign In"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
