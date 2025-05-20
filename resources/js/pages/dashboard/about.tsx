import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast as toaster } from '@/components/ui/use-toast';
import DashboardLayout from '@/layouts/dashboard-layout';
import { SharedData } from '@/types';
import { About as AboutType } from '@/types/custom';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, SaveIcon, TrashIcon } from 'lucide-react';
import { ChangeEvent, ChangeEventHandler, FormEventHandler, useCallback, useRef, useState } from 'react';

interface AboutProps {
    about: AboutType;
}

type AboutForm = {
    title: string;
    description: string[];
    email?: string;
    phone?: string;
    address?: string;
    location?: string;
    profile_picture?: string | File | null;
    statistics?: {
        value?: string | number;
        label?: string;
    }[];
    social_links?: {
        platform: string;
        url?: string;
    }[];
    trusted_by?: {
        name: string;
        logo?: File | string | null;
        url?: string;
    }[];
};

export default function About({ about }: AboutProps) {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const [previewImage, setPreviewImage] = useState<string | null>((about.profile_picture as string) ?? null);
    const previewImageRef = useRef<HTMLImageElement>(null);
    const imageUploadRef = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        post: updateAbout,
        processing,
        progress,
        reset,
        isDirty,
        setDefaults,
    } = useForm<Partial<AboutForm>>({
        title: about.title,
        description: about.description,
        email: about.email,
        phone: about.phone,
        address: about.address,
        location: about.location,
        profile_picture: null,
        statistics: about.statistics,
        social_links: about.social_links,
        trusted_by: about.trusted_by?.map((company) => ({
            ...company,
            logo: null,
        })),
    });

    const removeParagraph = useCallback(
        (index: number) => {
            const newDescription = [...data.description!];
            newDescription.splice(index, 1);
            setData('description', newDescription);

            toast('Paragraph removed successfull!', {
                id: 'remove-paragraph',
                description: 'Your changes have been added.',
                duration: 3000,
                action: {
                    label: 'Undo',
                    onClick: () => {
                        const newDescription = [...data.description!];
                        newDescription.splice(index, 0);
                        setData('description', newDescription);
                        toast.dismiss();
                    },
                },
            });
        },
        [data.description, setData, toast],
    );

    const removeStatistic = useCallback(
        (index: number) => {
            const newStatistics = [...data.statistics!];
            newStatistics.splice(index, 1);
            setData('statistics', newStatistics);

            toast('Statistic removed successfull!', {
                id: 'remove-statistic',
                description: 'Your changes have been added.',
                duration: 3000,
                action: {
                    label: 'Undo',
                    onClick: () => {
                        const newStatistics = [...data.statistics!];
                        newStatistics.splice(index, 0);
                        setData('statistics', newStatistics);
                        toast.dismiss();
                    },
                },
            });
        },
        [data.statistics, setData, toast],
    );

    const removeSocial = useCallback(
        (index: number) => {
            const newSocialLinks = [...data.social_links!];
            newSocialLinks.splice(index, 1);
            setData('social_links', newSocialLinks);

            toast('Social link removed successfull!', {
                id: 'remove-social',
                description: 'Your changes have been added.',
                duration: 3000,
                action: {
                    label: 'Undo',
                    onClick: () => {
                        const newSocialLinks = [...data.social_links!];
                        newSocialLinks.splice(index, 0);
                        setData('social_links', newSocialLinks);
                        toast.dismiss();
                    },
                },
            });
        },
        [data.social_links, setData, toast],
    );

    const removeTrustedBy = useCallback(
        (index: number) => {
            const newTrustedBy = [...data.trusted_by!];
            newTrustedBy.splice(index, 1);
            setData('trusted_by', newTrustedBy);

            toast('Company removed successfull!', {
                id: 'remove-company',
                description: 'Your changes have been added.',
                duration: 3000,
                action: {
                    label: 'Undo',
                    onClick: () => {
                        const newTrustedBy = [...data.trusted_by!];
                        newTrustedBy.splice(index, 0);
                        setData('trusted_by', newTrustedBy);
                        toast.dismiss();
                    },
                },
            });
        },
        [data.trusted_by, setData, toast],
    );

    const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('profile_picture', file as File);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setPreviewImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCompanyLogoChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>, index: number) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const newTrustedBy = [...data.trusted_by!];
                newTrustedBy[index] = {
                    ...newTrustedBy[index],
                    logo: file as File,
                };
                setData('trusted_by', newTrustedBy);

                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        const companyLogo = document.getElementById(`company-logo-${index}`) as HTMLImageElement;
                        companyLogo.src = e.target.result as string;
                        // document.getElementById(`company-logo-${index}`)?.setAttribute('src', URL.createObjectURL(file));
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        [data.trusted_by, setData],
    );

    const handleClearPreviewImage = () => {
        // setPreviewImage(null);
        setData('profile_picture', null);
        if (imageUploadRef.current) {
            imageUploadRef.current.value = '';
        }
    };

    const handleSave: FormEventHandler = useCallback(
        (e) => {
            e.preventDefault();
            updateAbout(route('dashboard.about.update'), {
                preserveScroll: true,
                onError(errors) {
                    for (const error in errors) {
                        toaster({
                            title: 'Error',
                            description: errors[error],
                            variant: 'destructive',
                        });
                    }
                },
                onSuccess() {
                    handleClearPreviewImage();
                    setDefaults();
                },
            });
        },
        [data, updateAbout, route, reset, setData, toaster],
    );

    return (
        <DashboardLayout title="About Management">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">About Management</h2>
                    <div className="flex gap-2">
                        {isDirty && (
                            <Button className="cursor-pointer" onClick={handleSave} disabled={processing || !isDirty}>
                                {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SaveIcon className="h-4 w-4" />}
                                {processing ? 'Saving...' : 'Save Changes'}
                                {progress && ` (${progress.percentage}%)`}
                            </Button>
                        )}
                    </div>
                </div>

                {/* <form onSubmit={handleSave} encType="multipart/form-data"> */}
                <Tabs defaultValue="content" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="image">Profile Image</TabsTrigger>
                        <TabsTrigger value="statistics">Statistics</TabsTrigger>
                        <TabsTrigger value="social">Social Links</TabsTrigger>
                        <TabsTrigger value="trusted">Trusted Companies</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>About Content</CardTitle>
                                <CardDescription>Manage the content that appears in the about section of your portfolio</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Section Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter section title"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Paragraphs</Label>
                                        <Button
                                            size="sm"
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                const newDescription = [...data.description!];
                                                newDescription.push('');
                                                setData('description', newDescription);
                                            }}
                                        >
                                            Add Paragraph
                                        </Button>
                                    </div>

                                    {data.description!.length > 0 ? (
                                        data.description?.map((paragraph, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex items-end gap-2">
                                                    <Textarea
                                                        value={paragraph}
                                                        onChange={(e) => {
                                                            const newDescription = [...data.description!];
                                                            newDescription[index] = e.target.value;
                                                            setData('description', newDescription);
                                                        }}
                                                        placeholder={`Paragraph ${index + 1}`}
                                                        className="min-h-24"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        type="button"
                                                        variant="destructive"
                                                        className="mt-1"
                                                        onClick={() => removeParagraph(index)}
                                                        disabled={data.description!.length <= 1}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-muted-foreground text-center text-sm">
                                            No paragraphs added yet. Click "Add Paragraph" to create one.
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="resumeUrl">Resume URL</Label>
                                    <Input
                                        id="resumeUrl"
                                        name="resume_url"
                                        value={(user.resume_url as string) ?? '#Resume'}
                                        // onChange={handleResumeUrlChange}
                                        placeholder="Link to your resume"
                                        disabled={!!user.resume_url}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="image" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Image</CardTitle>
                                <CardDescription>Update your profile image that appears in the about section</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="h-48 w-48 overflow-hidden rounded-lg border-2">
                                            {previewImage ? (
                                                <img
                                                    ref={previewImageRef}
                                                    src={previewImage}
                                                    alt="Profile preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
                                                    No image selected
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-row-reverse items-center gap-3">
                                            <Label
                                                htmlFor="image-upload"
                                                className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-md px-4 py-2"
                                            >
                                                Upload New Image
                                            </Label>
                                            {data?.profile_picture && (
                                                <Label
                                                    className="text-primary-foreground cursor-pointer rounded-md bg-red-500 px-4 py-2 hover:bg-red-600"
                                                    onClick={() => {
                                                        imageUploadRef.current!.value = '';
                                                        setPreviewImage(about.profile_picture as string);
                                                        setData('profile_picture', null);
                                                    }}
                                                >
                                                    Remove Image
                                                </Label>
                                            )}
                                        </div>
                                        <Input
                                            ref={imageUploadRef}
                                            id="image-upload"
                                            name="profile_picture"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="statistics" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistics</CardTitle>
                                <CardDescription>Manage the statistics that appear in your about section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Statistics Items</Label>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        // onClick={addStatistic}
                                        onClick={() => {
                                            const newStatistics = [...data.statistics!];
                                            newStatistics.push({ value: '', label: '' });
                                            setData('statistics', newStatistics);
                                        }}
                                    >
                                        Add Statistic
                                    </Button>
                                </div>

                                <div className="grid gap-4">
                                    {data.statistics!.length > 0 ? (
                                        data.statistics?.map((stat, index) => (
                                            <div key={index} className="flex flex-col items-start gap-2 rounded-lg border p-3 sm:flex-row">
                                                <div className="w-full space-y-1 sm:w-1/3">
                                                    <Label htmlFor={`stat-value-${index}`}>Value</Label>
                                                    <Input
                                                        id={`stat-value-${index}`}
                                                        type="text"
                                                        name="statistics[value]"
                                                        value={stat.value}
                                                        onChange={(e) => {
                                                            const newStatistics = [...data.statistics!];
                                                            newStatistics[index] = {
                                                                ...newStatistics[index],
                                                                value: e.target.value,
                                                            };
                                                            setData('statistics', newStatistics);
                                                        }}
                                                        placeholder="e.g. 50+"
                                                    />
                                                </div>
                                                <div className="w-full space-y-1 sm:flex-1">
                                                    <Label htmlFor={`stat-label-${index}`}>Label</Label>
                                                    <Input
                                                        id={`stat-label-${index}`}
                                                        type="text"
                                                        name="statistics[label]"
                                                        value={stat.label}
                                                        onChange={(e) => {
                                                            const newStatistics = [...data.statistics!];
                                                            newStatistics[index] = {
                                                                ...newStatistics[index],
                                                                label: e.target.value,
                                                            };
                                                            setData('statistics', newStatistics);
                                                        }}
                                                        placeholder="e.g. Projects Completed"
                                                    />
                                                </div>
                                                <Button
                                                    size="sm"
                                                    type="button"
                                                    variant="destructive"
                                                    className="mt-6 self-start"
                                                    onClick={() => removeStatistic(index)}
                                                    // disabled={data.statistics!.length <= 1}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-muted-foreground text-center text-sm">
                                            No statistics added yet. Click "Add Statistic" to create one.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="social" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Social Link</CardTitle>
                                <CardDescription>Manage the social links that appear on page</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 flex items-center justify-between">
                                    <Label>Social Links</Label>
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            const newSocialLinks = [...data.social_links!];
                                            newSocialLinks.push({ platform: '', url: '' });
                                            setData('social_links', newSocialLinks);
                                        }}
                                    >
                                        Add Link
                                    </Button>
                                </div>

                                <div className="space-y-6 rounded-lg border p-6">
                                    <div>
                                        <p className="text-primary font-medium">Social Links</p>
                                        <h2 className="font-display mt-2 mb-6 text-xl font-bold md:text-2xl">Manage your social links</h2>
                                    </div>

                                    <div className="text-foreground/70 space-y-4">
                                        {data.social_links!.length > 0 ? (
                                            data.social_links?.map((link, index) => (
                                                <div key={index} className="flex flex-col items-start gap-2 rounded-lg border p-3 sm:flex-row">
                                                    <div className="w-full space-y-1 sm:w-1/5">
                                                        <Label htmlFor={`link-name-${index}`}>Platform</Label>
                                                        <Input
                                                            id={`link-name-${index}`}
                                                            type="text"
                                                            name="social_links[platform]"
                                                            value={link.platform}
                                                            onChange={(e) => {
                                                                const newSocialLinks = [...data.social_links!];
                                                                newSocialLinks[index] = {
                                                                    ...newSocialLinks[index],
                                                                    platform: e.target.value,
                                                                };
                                                                setData('social_links', newSocialLinks);
                                                            }}
                                                            placeholder={`e.g. LinkedIn ${index + 1}`}
                                                        />
                                                    </div>
                                                    <div className="w-full space-y-1 sm:flex-1">
                                                        <Label htmlFor={`link-url-${index}`}>Link URL</Label>
                                                        <Input
                                                            id={`link-url-${index}`}
                                                            type="text"
                                                            name="social_links[url]"
                                                            value={link.url}
                                                            onChange={(e) => {
                                                                const newSocialLinks = [...data.social_links!];
                                                                newSocialLinks[index] = {
                                                                    ...newSocialLinks[index],
                                                                    url: e.target.value,
                                                                };
                                                                setData('social_links', newSocialLinks);
                                                            }}
                                                            placeholder={`e.g. https://www.linkedin.com/in/yourprofile-${index + 1}`}
                                                        />
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        type="button"
                                                        variant="destructive"
                                                        className="mt-6 self-start"
                                                        onClick={() => removeSocial(index)}
                                                        // disabled={data.social_links!.length <= 1}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-muted-foreground text-center text-sm">
                                                No social links added yet. Click "Add Link" to create one.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="trusted" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Trusted Companies</CardTitle>
                                <CardDescription>Manage the trusted companies that appear on page</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 flex items-center justify-between">
                                    <Label>Trusted Companies</Label>
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            const newTrustedBy = [...data.trusted_by!];
                                            newTrustedBy.push({ name: '', logo: null, url: '' });
                                            setData('trusted_by', newTrustedBy);
                                        }}
                                    >
                                        Add Company
                                    </Button>
                                </div>

                                <div className="space-y-6 rounded-lg border p-6">
                                    <div>
                                        <p className="text-primary font-medium">Trusted Companies</p>
                                        <h2 className="font-display mt-2 mb-6 text-xl font-bold md:text-2xl">Manage your trusted companies</h2>
                                    </div>

                                    <div className="text-foreground/70 space-y-4">
                                        {data.trusted_by?.map((company, index) => (
                                            <div key={index} className="flex flex-col items-start gap-2 rounded-lg border p-3 sm:flex-row">
                                                {/* logo */}
                                                <div className="w-full space-y-1 self-center sm:w-1/5">
                                                    <Label htmlFor={`company-logo-${index}`}>Company Logo</Label>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-24 overflow-hidden rounded border-2 text-center">
                                                            <img
                                                                id={`company-logo-${index}`}
                                                                src={(about.trusted_by?.[index]?.logo as string) ?? '/placeholder.svg'}
                                                                alt={`Logo of ${company.name}`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <Label
                                                            htmlFor={`company-logo-input-${index}`}
                                                            className={`${about.trusted_by?.[index]?.logo || company.logo ? 'bg-primary' : 'bg-green-500'} text-primary-foreground ${about.trusted_by?.[index]?.logo || company.logo ? 'hover:bg-primary/90' : 'hover:bg-green-500/90'} cursor-pointer rounded-md px-3 py-1 text-xs`}
                                                        >
                                                            {about.trusted_by?.[index]?.logo || company.logo ? 'Change Logo' : 'Upload Logo'}
                                                        </Label>
                                                        <Input
                                                            id={`company-logo-input-${index}`}
                                                            type="file"
                                                            name="trusted_by[logo]"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleCompanyLogoChange(e, index)}
                                                            value={undefined}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full space-y-1 sm:w-1/4">
                                                    <Label htmlFor={`company-name-${index}`}>Company Name</Label>
                                                    <Input
                                                        id={`company-name-${index}`}
                                                        type="text"
                                                        name="trusted_by[name]"
                                                        value={company.name}
                                                        onChange={(e) => {
                                                            const newTrustedBy = [...data.trusted_by!];
                                                            newTrustedBy[index] = {
                                                                ...newTrustedBy[index],
                                                                name: e.target.value,
                                                            };
                                                            setData('trusted_by', newTrustedBy);
                                                        }}
                                                        placeholder={`e.g. Google ${index + 1}`}
                                                    />
                                                </div>
                                                <div className="w-full space-y-1 sm:flex-1">
                                                    <Label htmlFor={`company-url-${index}`}>Company URL</Label>
                                                    <Input
                                                        id={`company-url-${index}`}
                                                        type="text"
                                                        name="trusted_by[url]"
                                                        value={company.url}
                                                        onChange={(e) => {
                                                            const newTrustedBy = [...data.trusted_by!];
                                                            newTrustedBy[index] = {
                                                                ...newTrustedBy[index],
                                                                url: e.target.value,
                                                            };
                                                            setData('trusted_by', newTrustedBy);
                                                        }}
                                                        placeholder={`e.g. https://www.google.com/${index + 1}`}
                                                    />
                                                </div>
                                                <Button
                                                    size="sm"
                                                    type="button"
                                                    variant="destructive"
                                                    className="mt-6 self-start"
                                                    onClick={() => removeTrustedBy(index)}
                                                    // disabled={data.trusted_by!.length <= 1}
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="preview" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                                <CardDescription>Preview how your about section will appear on your portfolio</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid items-center sm:grid-cols-2">
                                    <div className="relative">
                                        <div className="aspect-square w-full overflow-hidden rounded-2xl">
                                            <img src={previewImage as string} alt="About me" className="h-full w-full object-cover" />
                                        </div>
                                        <div className="border-background absolute -right-8 -bottom-8 z-[-1] h-64 w-64 rounded-2xl border-8"></div>
                                    </div>
                                    <div className="space-y-6 p-6">
                                        <div>
                                            <p className="text-primary font-medium">About Me</p>
                                            <h2 className="font-display mt-2 mb-6 text-xl font-bold md:text-2xl">{data.title}</h2>
                                        </div>

                                        <div className="text-foreground/70 space-y-4">
                                            {data.description?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 pt-4">
                                            {data.statistics?.map((stat, index) => (
                                                <div key={index}>
                                                    <p className="text-3xl font-bold">{stat.value}</p>
                                                    <p className="text-foreground/70">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mt-4 flex justify-end">
                    {isDirty && (
                        <Button className="cursor-pointer" onClick={handleSave} disabled={processing || !isDirty}>
                            {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SaveIcon className="h-4 w-4" />}
                            {processing ? 'Saving...' : 'Save Changes'}
                            {progress && ` (${progress.percentage}%)`}
                        </Button>
                    )}
                </div>
                {/* </form> */}
            </div>
        </DashboardLayout>
    );
}
