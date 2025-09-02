import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

const SettingsView = () => {
    // State for all settings
    const [hiddenBets, setHiddenBets] = useState(false);
    const [sfxVolume, setSfxVolume] = useState([75]);
    const [email, setEmail] = useState("rautkaveri60@gmail.com");
    const [username, setUsername] = useState("adbedo");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [profilePic, setProfilePic] = useState<string>("/placeholder.svg");

    // Dialog states
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [showChangeUsername, setShowChangeUsername] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeProfilePic, setShowChangeProfilePic] = useState(false);

    // Form states
    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Loading states - individual for each setting
    const [loadingStates, setLoadingStates] = useState({
        hiddenBets: false,
        sfxVolume: false,
        email: false,
        username: false,
        password: false,
        profilePic: false
    });

    // Dummy API calls with individual loading states
    const updateSetting = async (settingName: keyof typeof loadingStates, value: any) => {
        setLoadingStates(prev => ({ ...prev, [settingName]: true }));
        try {
            // Simulate API call
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [settingName]: value })
            });

            if (response.ok) {
                console.log(`${settingName} updated successfully:`, value);
                return true;
            }
        } catch (error) {
            console.error(`Error updating ${settingName}:`, error);
        } finally {
            setLoadingStates(prev => ({ ...prev, [settingName]: false }));
        }
        return false;
    };

    const handleToggleHiddenBets = async (checked: boolean) => {
        setHiddenBets(checked);
        await updateSetting('hiddenBets', checked);
    };

    const handleVolumeChange = async (value: number[]) => {
        setSfxVolume(value);
        await updateSetting('sfxVolume', value[0]);
    };

    const handleVerifyEmail = async () => {
        const success = await updateSetting('email', email);
        if (success) {
            setIsEmailVerified(true);
            alert('Verification email sent!');
        }
    };

    const handleChangeEmail = async () => {
        if (!newEmail || newEmail === email) return;

        const success = await updateSetting('email', newEmail);
        if (success) {
            setEmail(newEmail);
            setIsEmailVerified(false);
            setNewEmail("");
            setShowChangeEmail(false);
            alert('Email updated successfully!');
        }
    };

    const handleChangeUsername = async () => {
        if (!newUsername || newUsername === username) return;

        const success = await updateSetting('username', newUsername);
        if (success) {
            setUsername(newUsername);
            setNewUsername("");
            setShowChangeUsername(false);
            alert('Username updated successfully!');
        }
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
            alert('Please fill all fields correctly and ensure passwords match');
            return;
        }

        const success = await updateSetting('password', {
            currentPassword,
            newPassword
        });

        if (success) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowChangePassword(false);
            alert('Password updated successfully!');
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            setSelectedFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadProfilePic = async () => {
        if (!selectedFile) return;

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('profilePic', selectedFile);

        setLoadingStates(prev => ({ ...prev, profilePic: true }));
        try {
            // Simulate file upload to API
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // In real implementation, you'd get the uploaded image URL from response
                setProfilePic(previewUrl);
                setSelectedFile(null);
                setPreviewUrl("");
                setShowChangeProfilePic(false);
                alert('Profile picture updated successfully!');
                return true;
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert('Failed to upload profile picture');
        } finally {
            setLoadingStates(prev => ({ ...prev, profilePic: false }));
        }
        return false;
    };

    const handleRemoveProfilePic = async () => {
        const success = await updateSetting('profilePic', null);
        if (success) {
            setProfilePic("/placeholder.svg");
            alert('Profile picture removed successfully!');
        }
    };

    const settingsData = [
        {
            id: "profile-picture",
            icon: "🖼️",
            label: "Profile Picture",
            type: "image" as const,
            value: profilePic,
            actions: [
                {
                    label: "Change",
                    onClick: () => setShowChangeProfilePic(true)
                },
                {
                    label: "Remove",
                    onClick: handleRemoveProfilePic,
                    disabled: profilePic === "/placeholder.svg"
                }
            ]
        },
        {
            id: "hidden-bets",
            icon: "👁️",
            label: "Hidden Bets",
            type: "toggle" as const,
            value: hiddenBets,
            onToggleChange: handleToggleHiddenBets
        },
        {
            id: "sfx-volume",
            icon: "🔊",
            label: "SFX Volume",
            type: "slider" as const,
            value: sfxVolume,
            onSliderChange: handleVolumeChange
        },
        {
            id: "email",
            icon: "📧",
            label: "Email",
            type: "input" as const,
            value: email,
            actions: [
                {
                    label: isEmailVerified ? "Verified ✓" : "Verify",
                    onClick: handleVerifyEmail,
                    disabled: isEmailVerified
                },
                {
                    label: "Change",
                    onClick: () => setShowChangeEmail(true)
                }
            ]
        },
        {
            id: "change-username",
            label: "Change Username",
            type: "input" as const,
            value: username,
            actions: [
                {
                    label: "Change",
                    onClick: () => setShowChangeUsername(true)
                }
            ]
        },
        {
            id: "change-password",
            label: "Change Password",
            type: "action" as const,
            actions: [
                {
                    label: "Change",
                    onClick: () => setShowChangePassword(true)
                }
            ]
        }
    ];

    return (
        <>
            <Card className="bg-card border-border w-full max-w-full overflow-hidden">
                <div className="p-4 sm:p-6 w-full max-w-full">

                    {/* Desktop Table View */}
                    <div className="hidden md:block border border-gray-700 rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-700 hover:bg-transparent">
                                    <TableHead className="text-gray-400 font-semibold">Settings</TableHead>
                                    <TableHead className="text-gray-400 font-semibold text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {settingsData.map((setting) => (
                                    <TableRow key={setting.id} className="border-gray-700 hover:bg-gray-800/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {setting.type === "image" ? (
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={setting.value as string} alt="Profile" />
                                                        <AvatarFallback>👤</AvatarFallback>
                                                    </Avatar>
                                                ) : setting.icon && (
                                                    <span className="text-lg">{setting.icon}</span>
                                                )}
                                                <span className="text-gray-300">{setting.label}</span>
                                                {setting.type === "input" && setting.value && (
                                                    <span className="text-gray-500 ml-2">{setting.value}</span>
                                                )}
                                                {setting.type === "slider" && (
                                                    <span className="text-gray-500 ml-2">{setting.value[0]}%</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {setting.type === "toggle" && (
                                                    <Switch
                                                        checked={setting.value as boolean}
                                                        onCheckedChange={setting.onToggleChange}
                                                        className="data-[state=checked]:bg-green-500"
                                                        disabled={loadingStates.hiddenBets}
                                                    />
                                                )}
                                                {setting.type === "slider" && (
                                                    <div className="w-24">
                                                        <Slider
                                                            value={setting.value as number[]}
                                                            onValueChange={setting.onSliderChange}
                                                            max={100}
                                                            step={1}
                                                            className="w-full"
                                                            disabled={loadingStates.sfxVolume}
                                                        />
                                                    </div>
                                                )}
                                                {setting.actions && setting.actions.map((action, index) => (
                                                    <Button
                                                        key={index}
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={action.onClick}
                                                        disabled={action.disabled ||
                                                            (setting.id === "email" && loadingStates.email) ||
                                                            (setting.id === "profile-picture" && loadingStates.profilePic)
                                                        }
                                                        className={`
                                                        ${action.label.includes("Verify")
                                                                ? action.disabled
                                                                    ? "border-green-500 text-green-400 bg-green-500/10"
                                                                    : "border-green-500 text-green-400 hover:bg-green-500/10"
                                                                : action.label === "Remove"
                                                                    ? "border-red-500 text-red-400 hover:bg-red-500/10"
                                                                    : "border-blue-500 text-blue-400 hover:bg-blue-500/10"
                                                            }
                                                    `}
                                                    >
                                                        {((setting.id === "email" && loadingStates.email) ||
                                                            (setting.id === "profile-picture" && loadingStates.profilePic))
                                                            ? "..." : action.label}
                                                    </Button>
                                                ))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3 w-full">
                        {settingsData.map((setting) => (
                            <div
                                key={setting.id}
                                className="bg-gray-800/40 border border-gray-600/50 rounded-xl p-3 backdrop-blur-sm w-full max-w-full overflow-hidden"
                            >
                                {/* Special layout for email card with two rows */}
                                {setting.id === "email" ? (
                                    <div className="space-y-2">
                                        {/* First row: Icon + Label + Email */}
                                        <div className="flex items-center gap-2">
                                            {setting.icon && (
                                                <span className="text-base flex-shrink-0">{setting.icon}</span>
                                            )}
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                <div className="text-white font-medium text-sm truncate">
                                                    {setting.label}
                                                </div>
                                                <div className="text-gray-400 text-xs truncate">
                                                    {setting.value}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Second row: Action buttons */}
                                        <div className="flex gap-2 justify-end">
                                            {setting.actions && setting.actions.map((action, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={action.onClick}
                                                    disabled={
                                                        action.disabled ||
                                                        loadingStates.email
                                                    }
                                                    className={`text-xs px-3 py-1 whitespace-nowrap ${action.label.includes("Verify")
                                                        ? action.disabled
                                                            ? "border-green-500 text-green-400 bg-green-500/10"
                                                            : "border-green-500 text-green-400 hover:bg-green-500/10"
                                                        : "border-blue-500 text-blue-400 hover:bg-blue-500/10"
                                                        }`}
                                                >
                                                    {loadingStates.email ? "..." : action.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* Single row layout for all other cards */
                                    <div className="flex items-center justify-between gap-2 w-full min-w-0">
                                        {/* Left side: Icon + Label */}
                                        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
                                            {setting.type === "image" ? (
                                                <Avatar className="h-7 w-7 flex-shrink-0">
                                                    <AvatarImage src={setting.value as string} alt="Profile" />
                                                    <AvatarFallback>👤</AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                setting.icon && (
                                                    <span className="text-base flex-shrink-0">{setting.icon}</span>
                                                )
                                            )}
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                <div className="text-white font-medium text-sm truncate">
                                                    {setting.label}
                                                </div>
                                                {setting.type === "input" && setting.value && (
                                                    <div className="text-gray-400 text-xs truncate">
                                                        {setting.value}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right side: Controls + Actions */}
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            {/* Toggle */}
                                            {setting.type === "toggle" && (
                                                <Switch
                                                    checked={setting.value as boolean}
                                                    onCheckedChange={setting.onToggleChange}
                                                    className="data-[state=checked]:bg-green-500"
                                                    disabled={loadingStates.hiddenBets}
                                                />
                                            )}

                                            {/* Slider with percentage */}
                                            {setting.type === "slider" && (
                                                <div className="flex items-center gap-1">
                                                    <div className="w-16">
                                                        <Slider
                                                            value={setting.value as number[]}
                                                            onValueChange={setting.onSliderChange}
                                                            max={100}
                                                            step={1}
                                                            disabled={loadingStates.sfxVolume}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action buttons */}
                                            {setting.actions && (
                                                <div className="flex gap-1">
                                                    {setting.actions.map((action, index) => (
                                                        <Button
                                                            key={index}
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={action.onClick}
                                                            disabled={
                                                                action.disabled ||
                                                                (setting.id === "profile-picture" && loadingStates.profilePic)
                                                            }
                                                            className={`text-xs px-2 py-1 whitespace-nowrap ${action.label === "Remove"
                                                                ? "border-red-500 text-red-400 hover:bg-red-500/10"
                                                                : "border-blue-500 text-blue-400 hover:bg-blue-500/10"
                                                                }`}
                                                        >
                                                            {(setting.id === "profile-picture" && loadingStates.profilePic)
                                                                ? "..."
                                                                : action.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>



                </div>
            </Card>

            {/* Change Email Dialog */}
            <Dialog open={showChangeEmail} onOpenChange={setShowChangeEmail}>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">Change Email</DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                            Enter your new email address. You'll need to verify it again.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-300 text-sm block mb-1">Current Email</label>
                            <Input
                                value={email}
                                disabled
                                className="bg-gray-800 border-gray-600 text-gray-400 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 text-sm block mb-1">New Email</label>
                            <Input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Enter new email"
                                className="bg-gray-800 border-gray-600 text-white w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowChangeEmail(false)}
                            className="border-gray-600 text-gray-300 w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleChangeEmail}
                            disabled={!newEmail || newEmail === email || loadingStates.email}
                            className="bg-green-500 hover:bg-green-600 text-black w-full sm:w-auto"
                        >
                            {loadingStates.email ? "Updating..." : "Update Email"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Username Dialog */}
            <Dialog open={showChangeUsername} onOpenChange={setShowChangeUsername}>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">Change Username</DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                            Choose a new username for your account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-300 text-sm block mb-1">Current Username</label>
                            <Input
                                value={username}
                                disabled
                                className="bg-gray-800 border-gray-600 text-gray-400 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 text-sm block mb-1">New Username</label>
                            <Input
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="Enter new username"
                                className="bg-gray-800 border-gray-600 text-white w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowChangeUsername(false)}
                            className="border-gray-600 text-gray-300 w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleChangeUsername}
                            disabled={!newUsername || newUsername === username || loadingStates.username}
                            className="bg-green-500 hover:bg-green-600 text-black w-full sm:w-auto"
                        >
                            {loadingStates.username ? "Updating..." : "Update Username"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">Change Password</DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                            Enter your current password and choose a new one.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-300 text-sm block mb-1">Current Password</label>
                            <Input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="bg-gray-800 border-gray-600 text-white w-full"
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 text-sm block mb-1">New Password</label>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="bg-gray-800 border-gray-600 text-white w-full"
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 text-sm block mb-1">Confirm New Password</label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="bg-gray-800 border-gray-600 text-white w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowChangePassword(false)}
                            className="border-gray-600 text-gray-300 w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleChangePassword}
                            disabled={!currentPassword || !newPassword || !confirmPassword || loadingStates.password}
                            className="bg-green-500 hover:bg-green-600 text-black w-full sm:w-auto"
                        >
                            {loadingStates.password ? "Updating..." : "Update Password"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Profile Picture Dialog */}
            <Dialog open={showChangeProfilePic} onOpenChange={setShowChangeProfilePic}>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">Change Profile Picture</DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                            Upload a new profile picture. Supported formats: JPG, PNG, GIF (max 5MB)
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                        {/* Current Profile Picture */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-center">
                                <label className="text-gray-300 text-sm block mb-2">Current Profile Picture</label>
                                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto">
                                    <AvatarImage src={profilePic} alt="Current Profile" />
                                    <AvatarFallback className="text-xl sm:text-2xl">👤</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="text-gray-300 text-sm block mb-1">Select New Picture</label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="bg-gray-800 border-gray-600 text-white cursor-pointer w-full"
                            />
                        </div>

                        {/* Preview */}
                        {previewUrl && (
                            <div className="flex flex-col items-center gap-2">
                                <label className="text-gray-300 text-sm">Preview</label>
                                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                                    <AvatarImage src={previewUrl} alt="Preview" />
                                    <AvatarFallback className="text-xl sm:text-2xl">👤</AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowChangeProfilePic(false);
                                setSelectedFile(null);
                                setPreviewUrl("");
                            }}
                            className="border-gray-600 text-gray-300 w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUploadProfilePic}
                            disabled={!selectedFile || loadingStates.profilePic}
                            className="bg-green-500 hover:bg-green-600 text-black disabled:cursor-not-allowed w-full sm:w-auto"
                        >
                            {loadingStates.profilePic ? "Uploading..." : "Update Picture"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SettingsView;
