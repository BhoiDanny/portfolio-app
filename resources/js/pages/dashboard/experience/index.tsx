import ExperienceSlideSheet from '@/components/experience-slide-sheet';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/layouts/dashboard-layout';
import { formatDate } from '@/lib/utils';
import { Experience, ExperienceItem } from '@/types/custom';
import { useForm } from '@inertiajs/react';
import { PencilIcon, Plus, TrashIcon } from 'lucide-react';
import { FormEventHandler, useCallback, useState } from 'react';
import EmptyImage from '/public/empty.svg';

type ExperienceForm = {
    job_title: string;
    company: string;
    location: string;
    start_date: string;
    end_date?: string;
    description?: string;
    website?: string;
    logo?: File | string | null;
    achievements?: string[];
    type?: 'job' | 'internship' | 'volunteer';
    published?: boolean;
};

interface EditExperienceForm extends ExperienceForm {
    id?: string;
}

export default function Experiences({ experiences }: { experiences: ExperienceItem }) {
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [experienceId, setExperienceId] = useState<string | null>(null);

    const { toast } = useToast();

    const {
        data,
        setData,
        post: createExperience,
        delete: deleteExperience,
        processing,
        reset,
    } = useForm<Required<ExperienceForm>>({
        job_title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        description: '',
        website: '',
        logo: null,
        achievements: [],
        type: 'job',
        published: false,
    });

    const {
        data: currentExperience,
        setData: setCurrentExperience,
        post: updateExperience,
        processing: currentExperienceProcessing,
        reset: resetCurrentExperience,
        transform: transfromCurrentExperience,
    } = useForm<Partial<EditExperienceForm>>({
        id: '',
        job_title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        description: '',
        website: '',
        logo: null,
        achievements: [],
        type: 'job',
        published: false,
    });

    const handleCloseSheet = useCallback(() => {
        setIsSheetOpen(false);
        setIsEditing(false);
        reset();
        resetCurrentExperience();
    }, [setIsSheetOpen, setIsEditing, reset, resetCurrentExperience]);

    const editExperience = useCallback(
        (experience: Experience) => {
            setIsEditing(true);
            const { id, logo, ...rest } = experience;
            setCurrentExperience({
                ...rest,
            });
            setExperienceId(id || null);
            setIsSheetOpen(true);
        },
        [setIsEditing, setCurrentExperience, setExperienceId, setIsSheetOpen],
    );

    const handleSaveExperience: FormEventHandler = useCallback(
        (e) => {
            e.preventDefault();

            if (isEditing) {
                if (!currentExperience.job_title!.trim() || !currentExperience.company!.trim() || !currentExperience.start_date!.trim()) {
                    toast({
                        title: 'Error',
                        description: 'Please fill in all required fields.',
                        variant: 'destructive',
                    });
                    return;
                }
                transfromCurrentExperience((data) => ({
                    ...data,
                    _method: 'put',
                }));
                updateExperience(route('dashboard.experiences.update', experienceId as string), {
                    preserveScroll: true,
                    onError(errors) {
                        for (const key in errors) {
                            toast({
                                title: 'Error',
                                description: errors[key],
                                variant: 'destructive',
                            });
                        }
                    },
                    onSuccess() {
                        handleCloseSheet();
                        toast({
                            title: 'Success',
                            description: 'Experience updated successfully.',
                        });
                    },
                });
            } else {
                if (!data.job_title.trim() || !data.company.trim() || !data.start_date.trim()) {
                    toast({
                        title: 'Error',
                        description: 'Please fill in all required fields.',
                        variant: 'destructive',
                    });
                    return;
                }

                createExperience(route('dashboard.experiences.create'), {
                    onError(errors) {
                        for (const key in errors) {
                            toast({
                                title: 'Error',
                                description: errors[key],
                                variant: 'destructive',
                            });
                        }
                    },
                    onSuccess() {
                        handleCloseSheet();
                        toast({
                            title: 'Success',
                            description: 'Experience created successfully.',
                            variant: 'default',
                        });
                    },
                });
            }
        },
        [isEditing, currentExperience, data, updateExperience, createExperience, experienceId, handleCloseSheet, toast],
    );

    const handleDeleteExperience = useCallback(
        (id: string | number) => {
            deleteExperience(route('dashboard.experiences.delete', id), {
                onError(errors) {
                    for (const error in errors) {
                        toast({
                            title: 'Error',
                            description: errors[error],
                            variant: 'destructive',
                        });
                    }
                },
                onSuccess() {
                    toast({
                        title: 'Success',
                        description: 'Experience deleted successfully.',
                    });
                },
            });
        },
        [deleteExperience, toast],
    );

    return (
        <DashboardLayout title="Experience Management">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Experience Management</h2>
                    <Button onClick={() => setIsSheetOpen(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Experience
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription>Manage your professional work history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Logo</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Work Type</TableHead>
                                        <TableHead>Published</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {experiences.data?.length! > 0 ? (
                                        experiences.data?.map((experience) => (
                                            <TableRow key={experience.id}>
                                                <TableCell className="font-medium">{experience.job_title}</TableCell>
                                                <TableCell>{experience.company}</TableCell>
                                                <TableCell>
                                                    <img
                                                        className="h-16 w-16 rounded-full object-cover"
                                                        src={experience?.logo as string}
                                                        alt={experience.job_title}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(experience.start_date)} - {formatDate(experience.end_date || null)}
                                                </TableCell>
                                                <TableCell>{experience.location}</TableCell>
                                                <TableCell>
                                                    {experience.type === 'job' ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            Job
                                                        </span>
                                                    ) : experience.type === 'volunteer' ? (
                                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                            Volunteer
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                                            Internship
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {experience.published ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                            UnPublished
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => editExperience(experience)}
                                                            title={`Edit Skill: ${experience.job_title}`}
                                                        >
                                                            <PencilIcon className="h-4 w-4 text-yellow-500" />
                                                        </Button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button size="icon" variant="ghost" title="Delete Skill">
                                                                    <TrashIcon className="h-4 w-4 text-red-500" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently delete the experience{' '}
                                                                        <span className="font-bold">{experience.job_title}</span>.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel asChild>
                                                                        <Button variant="outline">Cancel</Button>
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction asChild>
                                                                        <Button
                                                                            className="bg-red-500 text-white hover:bg-red-600"
                                                                            variant="destructive"
                                                                            onClick={() => handleDeleteExperience(experience.id!)}
                                                                        >
                                                                            Yes, delete experience
                                                                        </Button>
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center">
                                                <div className="flex flex-col items-center">
                                                    <img className="mx-auto mt-4 h-58 w-58" src={EmptyImage} alt="Empty" />
                                                    <p className="mt-4 text-lg font-semibold">No Experiences Added Yet</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {isEditing ? (
                    <ExperienceSlideSheet
                        title="Edit Experience"
                        description="Update your work experience details below"
                        btnTitle="Update Experience"
                        isOpen={isSheetOpen}
                        setIsOpen={setIsSheetOpen}
                        data={currentExperience as EditExperienceForm}
                        setData={setCurrentExperience}
                        processing={currentExperienceProcessing}
                        handleClose={handleCloseSheet}
                        handleSave={handleSaveExperience}
                    />
                ) : (
                    <ExperienceSlideSheet
                        isOpen={isSheetOpen}
                        setIsOpen={setIsSheetOpen}
                        data={data}
                        setData={setData}
                        processing={processing}
                        handleClose={handleCloseSheet}
                        handleSave={handleSaveExperience}
                    />
                )}

                {/* <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <SheetContent className="max-w-2xl overflow-y-auto sm:max-w-2xl">
                        <SheetHeader>
                            <SheetTitle>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</SheetTitle>
                            <SheetDescription>
                                {editingExperience ? 'Update your work experience details below' : 'Enter the details for your new work experience'}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="job-title">Job Title</Label>
                                <Input
                                    id="job-title"
                                    value={newExperience.title}
                                    onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    value={newExperience.company}
                                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={newExperience.location}
                                    onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="start-date">Start Date (MM/YYYY)</Label>
                                    <Input
                                        id="start-date"
                                        type="month"
                                        value={newExperience.startDate}
                                        onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="end-date">End Date (MM/YYYY)</Label>
                                    <Input
                                        id="end-date"
                                        type="month"
                                        value={newExperience.endDate || ''}
                                        onChange={(e) =>
                                            setNewExperience({
                                                ...newExperience,
                                                endDate: e.target.value || null,
                                            })
                                        }
                                        placeholder="Present"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Job Description</Label>
                                <Textarea
                                    id="description"
                                    value={newExperience.description}
                                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label>Achievements</Label>
                                    <Button type="button" variant="outline" size="sm" onClick={addAchievement}>
                                        Add Achievement
                                    </Button>
                                </div>

                                {newExperience.achievements.map((achievement, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={achievement}
                                            onChange={(e) => updateAchievement(index, e.target.value)}
                                            placeholder={`Achievement ${index + 1}`}
                                        />
                                        {newExperience.achievements.length > 1 && (
                                            <Button type="button" variant="destructive" size="sm" onClick={() => removeAchievement(index)}>
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SheetFooter className="mt-4">
                            <Button onClick={handleSaveExperience}>Save</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet> */}
            </div>
        </DashboardLayout>
    );
}
