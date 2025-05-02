import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/layouts/dashboard-layout';
import { useState } from 'react';

export default function Settings() {
    const { toast } = useToast();
    const [settings, setSettings] = useState({
        appearance: {
            theme: 'system', // system, light, dark
            animations: true,
            reducedMotion: false,
        },
        notifications: {
            email: true,
            desktop: true,
            messagingAlerts: true,
            updateAlerts: true,
        },
        privacy: {
            showEmail: false,
            showPhone: false,
            allowMessaging: true,
            showLocation: true,
        },
        security: {
            twoFactorAuth: false,
            sessionTimeout: '30',
            saveLoginInfo: true,
        },
    });

    const handleSwitchChange = (section: keyof typeof settings, setting: string, checked: boolean) => {
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [setting]: checked,
            },
        }));
    };

    const handleSelectChange = (section: keyof typeof settings, setting: string, value: string) => {
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [setting]: value,
            },
        }));
    };

    const handleInputChange = (section: keyof typeof settings, setting: string, value: string) => {
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [setting]: value,
            },
        }));
    };

    const handleSaveSettings = () => {
        toast({
            title: 'Settings Saved',
            description: 'Your settings have been updated successfully.',
        });
    };

    const exportData = () => {
        // In a real app, this would generate and download the user's data
        toast({
            title: 'Data Export Requested',
            description: 'Your data export is being prepared and will be emailed to you.',
        });
    };

    const deleteAccount = () => {
        // In a real app, this would show a confirmation dialog
        toast({
            title: 'Delete Account',
            description: 'This feature is disabled in the demo.',
            variant: 'destructive',
        });
    };
    return (
        <DashboardLayout title="Settings">
            <div className="space-y-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Settings</h1>
                    <Button onClick={handleSaveSettings}>Save All Settings</Button>
                </div>

                <Tabs defaultValue="appearance" className="w-full">
                    <TabsList className="mb-6 grid grid-cols-4">
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="appearance" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Theme Preferences</CardTitle>
                                <CardDescription>Customize how the dashboard looks for you</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <label htmlFor="theme" className="text-sm font-medium">
                                        Theme
                                    </label>
                                    <Select
                                        value={settings.appearance.theme}
                                        onValueChange={(value) => handleSelectChange('appearance', 'theme', value)}
                                    >
                                        <SelectTrigger id="theme">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="system">System</SelectItem>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="animations" className="text-sm font-medium">
                                            Enable animations
                                        </label>
                                        <p className="text-muted-foreground text-xs">Show animations throughout the interface</p>
                                    </div>
                                    <Switch
                                        id="animations"
                                        checked={settings.appearance.animations}
                                        onCheckedChange={(checked) => handleSwitchChange('appearance', 'animations', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="reducedMotion" className="text-sm font-medium">
                                            Reduced motion
                                        </label>
                                        <p className="text-muted-foreground text-xs">Reduce the amount of animations</p>
                                    </div>
                                    <Switch
                                        id="reducedMotion"
                                        checked={settings.appearance.reducedMotion}
                                        onCheckedChange={(checked) => handleSwitchChange('appearance', 'reducedMotion', checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>Manage how you receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="email-notifications" className="text-sm font-medium">
                                            Email notifications
                                        </label>
                                        <p className="text-muted-foreground text-xs">Receive notifications via email</p>
                                    </div>
                                    <Switch
                                        id="email-notifications"
                                        checked={settings.notifications.email}
                                        onCheckedChange={(checked) => handleSwitchChange('notifications', 'email', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="desktop-notifications" className="text-sm font-medium">
                                            Desktop notifications
                                        </label>
                                        <p className="text-muted-foreground text-xs">Show notifications in your browser</p>
                                    </div>
                                    <Switch
                                        id="desktop-notifications"
                                        checked={settings.notifications.desktop}
                                        onCheckedChange={(checked) => handleSwitchChange('notifications', 'desktop', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="messaging-alerts" className="text-sm font-medium">
                                            Messaging alerts
                                        </label>
                                        <p className="text-muted-foreground text-xs">Receive alerts for new messages</p>
                                    </div>
                                    <Switch
                                        id="messaging-alerts"
                                        checked={settings.notifications.messagingAlerts}
                                        onCheckedChange={(checked) => handleSwitchChange('notifications', 'messagingAlerts', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="update-alerts" className="text-sm font-medium">
                                            Update alerts
                                        </label>
                                        <p className="text-muted-foreground text-xs">Receive notifications about system updates</p>
                                    </div>
                                    <Switch
                                        id="update-alerts"
                                        checked={settings.notifications.updateAlerts}
                                        onCheckedChange={(checked) => handleSwitchChange('notifications', 'updateAlerts', checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="privacy" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy Settings</CardTitle>
                                <CardDescription>Control what personal information is visible to visitors</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="show-email" className="text-sm font-medium">
                                            Display email address
                                        </label>
                                        <p className="text-muted-foreground text-xs">Show your email address on your public profile</p>
                                    </div>
                                    <Switch
                                        id="show-email"
                                        checked={settings.privacy.showEmail}
                                        onCheckedChange={(checked) => handleSwitchChange('privacy', 'showEmail', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="show-phone" className="text-sm font-medium">
                                            Display phone number
                                        </label>
                                        <p className="text-muted-foreground text-xs">Show your phone number on your public profile</p>
                                    </div>
                                    <Switch
                                        id="show-phone"
                                        checked={settings.privacy.showPhone}
                                        onCheckedChange={(checked) => handleSwitchChange('privacy', 'showPhone', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="allow-messaging" className="text-sm font-medium">
                                            Allow messaging
                                        </label>
                                        <p className="text-muted-foreground text-xs">Let visitors contact you through the contact form</p>
                                    </div>
                                    <Switch
                                        id="allow-messaging"
                                        checked={settings.privacy.allowMessaging}
                                        onCheckedChange={(checked) => handleSwitchChange('privacy', 'allowMessaging', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="show-location" className="text-sm font-medium">
                                            Show location
                                        </label>
                                        <p className="text-muted-foreground text-xs">Display your location on your public profile</p>
                                    </div>
                                    <Switch
                                        id="show-location"
                                        checked={settings.privacy.showLocation}
                                        onCheckedChange={(checked) => handleSwitchChange('privacy', 'showLocation', checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Data Management</CardTitle>
                                <CardDescription>Control your data and account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button variant="outline" onClick={exportData} className="w-full">
                                    Export Your Data
                                </Button>
                                <Button variant="destructive" onClick={deleteAccount} className="w-full">
                                    Delete Account
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your account security</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="two-factor" className="text-sm font-medium">
                                            Two-factor authentication
                                        </label>
                                        <p className="text-muted-foreground text-xs">Add an extra layer of security to your account</p>
                                    </div>
                                    <Switch
                                        id="two-factor"
                                        checked={settings.security.twoFactorAuth}
                                        onCheckedChange={(checked) => handleSwitchChange('security', 'twoFactorAuth', checked)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="session-timeout" className="text-sm font-medium">
                                        Session timeout (minutes)
                                    </label>
                                    <Input
                                        id="session-timeout"
                                        type="number"
                                        value={settings.security.sessionTimeout}
                                        onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
                                        min="5"
                                        max="120"
                                    />
                                    <p className="text-muted-foreground text-xs">Automatically log out after inactivity</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label htmlFor="save-login" className="text-sm font-medium">
                                            Remember me
                                        </label>
                                        <p className="text-muted-foreground text-xs">Stay logged in on this device</p>
                                    </div>
                                    <Switch
                                        id="save-login"
                                        checked={settings.security.saveLoginInfo}
                                        onCheckedChange={(checked) => handleSwitchChange('security', 'saveLoginInfo', checked)}
                                    />
                                </div>

                                <Button className="w-full">Change Password</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>View your recent account activity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { activity: 'Login', device: 'Chrome on Windows', time: 'Today, 10:30 AM', location: 'San Francisco, CA' },
                                        {
                                            activity: 'Password Changed',
                                            device: 'Firefox on macOS',
                                            time: 'Yesterday, 4:20 PM',
                                            location: 'San Francisco, CA',
                                        },
                                        {
                                            activity: 'Login',
                                            device: 'Safari on iPhone',
                                            time: 'Apr 27, 2025, 9:10 AM',
                                            location: 'San Francisco, CA',
                                        },
                                    ].map((item, index) => (
                                        <div key={index} className="flex justify-between border-b py-2 last:border-0">
                                            <div>
                                                <div className="font-medium">{item.activity}</div>
                                                <div className="text-muted-foreground text-sm">{item.device}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm">{item.time}</div>
                                                <div className="text-muted-foreground text-sm">{item.location}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    View All Activity
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
