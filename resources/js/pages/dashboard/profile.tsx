import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/layouts/dashboard-layout';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, SaveIcon } from 'lucide-react';
import React, { FormEventHandler, useRef } from 'react';

interface ProfileForm {
    name: string;
    email: string;
    occupation: string;
    bio?: string;
    avatar?: File | string | null;
    resume_url?: File | string | null;
}

export default function Profile() {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const avatarRef = useRef<HTMLInputElement>(null);
    const resumeRef = useRef<HTMLInputElement>(null);
    const [avatarImage, setAvatarImage] = React.useState<string | null>(user.avatar as string | null);
    const [isPasswordOpen, setIsPasswordOpen] = React.useState(false);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const { toast } = useToast();

    let initialData: ProfileForm = {
        name: user.name,
        email: user.email,
        occupation: user.occupation,
        avatar: null,
        bio: user.bio,
        resume_url: null,
    };

    const { data, setData, post: updateProfile, isDirty, errors, processing, transform, setDefaults } = useForm<Partial<ProfileForm>>(initialData);

    const handleSaveChanges = () => {
        transform((data) => ({
            ...data,
            _method: 'patch',
        }));
        updateProfile(route('dashboard.profile.update'), {
            only: ['auth'],
            onSuccess: () => {
                toast({
                    title: 'Profile Updated',
                    description: 'Your profile has been updated successfully.',
                });
                setDefaults();
            },
            onFinish: () => {
                if (avatarRef.current) {
                    avatarRef.current.value = '';
                }
                if (resumeRef.current) {
                    resumeRef.current.value = '';
                    data.resume_url = null;
                }
            },
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // In a real app, this would upload the file to a storage service
        // For now, we'll just create a local URL
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setAvatarImage(reader.result);
                setData('avatar', file);
            }
        };
        reader.readAsDataURL(file);
    };

    const discardChanges = () => {
        setData({
            ...initialData,
        });
        if (avatarRef.current) {
            avatarRef.current.value = '';
            setAvatarImage(user.avatar as string | null);
        }
        if (resumeRef.current) {
            resumeRef.current.value = '';
            setData('resume_url', null);
        }
        toast({
            title: 'Changes Discarded',
            description: 'Your changes have been discarded.',
        });
    };

    const {
        data: passwordData,
        setData: setPasswordData,
        put: updatePassword,
        errors: passwordErrors,
        processing: passwordProcessing,
        reset: resetPassword,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleUpdatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        updatePassword(route('dashboard.profile.password.update'), {
            only: ['auth', 'flash'],
            onSuccess() {
                resetPassword();
                setIsPasswordOpen(false);
            },
            onError(errors) {
                if (errors.password) {
                    resetPassword('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    resetPassword('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    const handleCloseDialog = () => {
        setIsPasswordOpen(false);
        resetPassword();
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
                            <Button onClick={handleSaveChanges} disabled={processing}>
                                {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SaveIcon className="h-4 w-4" />}
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
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
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter your full name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium">
                                    Professional Title
                                </label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={data.occupation}
                                    onChange={(e) => setData('occupation', e.target.value)}
                                    placeholder="e.g. Full Stack Developer"
                                />
                                <InputError message={errors.occupation} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bio" className="text-sm font-medium">
                                    Bio
                                </label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    placeholder="Write a short bio about yourself"
                                    rows={4}
                                />
                                <InputError message={errors.bio} className="mt-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Avatar</CardTitle>
                            <CardDescription>Upload a professional photo of yourself</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center space-y-4">
                            <Avatar className="h-54 w-54">
                                <AvatarImage src={avatarImage as string} alt="Profile" />
                                <AvatarFallback>{data.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <InputError message={errors.avatar} className="mt-2" />

                            <div className="w-full text-center">
                                {avatarRef.current?.files?.[0] && (
                                    <label htmlFor="avatar-remove">
                                        <Button
                                            variant="destructive"
                                            className="mr-4 cursor-pointer"
                                            type="button"
                                            onClick={() => {
                                                setData('avatar', null);
                                                avatarRef.current!.value = '';
                                                setAvatarImage(user.avatar as string | null);
                                            }}
                                        >
                                            Remove Avatar
                                        </Button>
                                    </label>
                                )}
                                <label htmlFor="avatar-upload" className="">
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer"
                                        type="button"
                                        onClick={() => document.getElementById('avatar-upload')?.click()}
                                    >
                                        Change Avatar
                                    </Button>
                                    <Input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                        ref={avatarRef}
                                    />
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
                                    Resume
                                </label>
                                <Input
                                    id="resumeUrl"
                                    name="resumeUrl"
                                    value={data.resume_url instanceof File ? data.resume_url?.name : (user.resume_url as string)}
                                    //onChange={(e) => setData('resume_url', e.target.value as string)}
                                    disabled
                                    placeholder="https://example.com/resume.pdf"
                                />
                                <InputError message={errors.resume_url} className="mt-2" />
                            </div>

                            <div className="bg-muted/50 flex items-center justify-between rounded-md border p-3">
                                <div className="text-sm">{data.resume_url === '#' ? 'No resume uploaded yet' : 'Current Resume'}</div>
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
                                        ref={resumeRef}
                                        id="resume-upload"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        value={undefined}
                                        onChange={(e) => setData('resume_url', e.target.files?.[0] as File)}
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
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your.email@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                                {/* <p className="text-muted-foreground text-xs">Email address cannot be changed here. Contact support for assistance.</p> */}
                                <p className="text-muted-foreground text-xs">
                                    This email address is used for account verification and password recovery. Please ensure it is correct.
                                </p>
                            </div>

                            <Button
                                className="w-full"
                                type="button"
                                onClick={() => setIsPasswordOpen(true)}
                                // className="w-full"
                            >
                                Change Password
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto" onCloseAutoFocus={handleCloseDialog}>
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                            To update your password, please enter your current password and the new password you would like to set.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdatePassword}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="current_password" className="text-sm font-medium">
                                    Password
                                </label>
                                <Input
                                    ref={currentPasswordInput}
                                    id="current_password"
                                    type="password"
                                    name="current_password"
                                    placeholder="Enter your current password"
                                    className="w-full"
                                    autoComplete="current-password"
                                    value={passwordData.current_password}
                                    onChange={(e) => setPasswordData('current_password', e.target.value)}
                                />
                                <InputError message={passwordErrors.current_password} className="mt-2" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="newPassword" className="text-sm font-medium">
                                    New Password
                                </label>
                                <Input
                                    ref={passwordInput}
                                    id="newPassword"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your new password"
                                    className="w-full"
                                    autoComplete="new-password"
                                    value={passwordData.password}
                                    onChange={(e) => setPasswordData('password', e.target.value)}
                                />
                                <InputError message={passwordErrors.password} className="mt-2" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password_confirmation" className="text-sm font-medium">
                                    Confirm New Password
                                </label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Confirm your new password"
                                    className="w-full"
                                    autoComplete="new-password"
                                    value={passwordData.password_confirmation}
                                    onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                />
                                <InputError message={passwordErrors.password_confirmation} className="mt-2" />
                            </div>
                            <Button type="submit" className="w-full cursor-pointer" disabled={passwordProcessing}>
                                {passwordProcessing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SaveIcon className="h-4 w-4" />}
                                {passwordProcessing ? 'Updating...' : 'Update Password'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
