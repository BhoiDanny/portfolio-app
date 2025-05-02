import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { personalInfo as initialPersonalInfo, PersonalInfo } from '@/data/portfolio-mock-data';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/layouts/dashboard-layout';
import React, { useState } from 'react';

export default function Profile() {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
    const [isDirty, setIsDirty] = useState(false);
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
        setIsDirty(true);
    };

    const handleSaveChanges = () => {
        // In a real app, this would save to the backend
        toast({
            title: 'Profile Updated',
            description: 'Your profile information has been updated successfully.',
        });
        setIsDirty(false);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // In a real app, this would upload the file to a storage service
        // For now, we'll just create a local URL
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setPersonalInfo((prev) => ({
                    ...prev,
                    avatar: reader.result as string,
                }));
                setIsDirty(true);
            }
        };
        reader.readAsDataURL(file);
    };

    const discardChanges = () => {
        setPersonalInfo(initialPersonalInfo);
        setIsDirty(false);
        toast({
            title: 'Changes Discarded',
            description: 'Your changes have been discarded.',
        });
    };

    return (
        <DashboardLayout title="Profile">
            <div className="space-y-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Profile Management</h1>
                    {isDirty && (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={discardChanges}>
                                Discard Changes
                            </Button>
                            <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </div>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Full Name
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={personalInfo.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium">
                                    Professional Title
                                </label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={personalInfo.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Full Stack Developer"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bio" className="text-sm font-medium">
                                    Bio
                                </label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={personalInfo.bio}
                                    onChange={handleInputChange}
                                    placeholder="Write a short bio about yourself"
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Avatar</CardTitle>
                            <CardDescription>Upload a professional photo of yourself</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center space-y-4">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={personalInfo.avatar} alt="Profile" />
                                <AvatarFallback>{personalInfo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>

                            <div className="w-full">
                                <label htmlFor="avatar-upload" className="block w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full cursor-pointer"
                                        type="button"
                                        onClick={() => document.getElementById('avatar-upload')?.click()}
                                    >
                                        Change Avatar
                                    </Button>
                                    <Input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Resume</CardTitle>
                            <CardDescription>Upload your resume for download</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="resumeUrl" className="text-sm font-medium">
                                    Resume URL
                                </label>
                                <Input
                                    id="resumeUrl"
                                    name="resumeUrl"
                                    value={personalInfo.resumeUrl}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/resume.pdf"
                                />
                            </div>

                            <div className="bg-muted/50 flex items-center justify-between rounded-md border p-3">
                                <div className="text-sm">{personalInfo.resumeUrl === '#' ? 'No resume uploaded yet' : 'Current Resume'}</div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => document.getElementById('resume-upload')?.click()}
                                    >
                                        Upload New
                                    </Button>
                                    <Input
                                        id="resume-upload"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        // Handle resume upload in a real app
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your account settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </label>
                                <Input id="email" type="email" placeholder="your.email@example.com" disabled value="contact@example.com" />
                                <p className="text-muted-foreground text-xs">Email address cannot be changed here. Contact support for assistance.</p>
                            </div>

                            <Button className="w-full">Change Password</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
