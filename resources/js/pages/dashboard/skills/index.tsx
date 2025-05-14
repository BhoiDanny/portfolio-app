import SlideSheet from '@/components/slide-sheet';
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
// import { skills } from '@/data/portfolio-mock-data';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/layouts/dashboard-layout';
import { getSkillLevelBgColor, getSkillLevelText } from '@/lib/utils';
import { CategoryItem, Skill, SkillsItem } from '@/types/custom';
import { useForm } from '@inertiajs/react';
import { PencilIcon, Plus, TrashIcon } from 'lucide-react';
import { FormEventHandler, useCallback, useState } from 'react';

interface SkillsProps {
    categories: CategoryItem;
    skills: SkillsItem;
}

type SkillForm = {
    name: string;
    level: number;
    category?: string;
    description?: string;
    published?: boolean;
};

interface SkillEditForm extends SkillForm {
    id?: string | null;
}

export default function Skills({ categories, skills }: SkillsProps) {
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [skillId, setSkillId] = useState<string | null>(null); 


    const { toast } = useToast();

    const {
        data,
        setData,
        processing,
        post: createSkill,
        delete: deleteSkill,
        reset,
    } = useForm<Required<SkillForm>>({
        name: '',
        level: 50,
        category: '',
        description: '',
        published: false,
    });

    const {
        data: currentSkill,
        setData: setCurrentSkill,
        processing: currentSkillProcessing,
        put: updateSkill,
        reset: resetCurrentSkill,
        // transform: transformCurrentSkill,
    } = useForm<Partial<SkillEditForm>>({
        //id: skillId,
        name: '',
        level: 50,
        category: '',
        description: '',
        published: false,
    });

    const handleCloseSheet = useCallback(() => {
        setIsSheetOpen(false);
        setIsEditing(false);
        reset();
        resetCurrentSkill();
    }, [isSheetOpen]);

    const editSkill = useCallback(
        async (skill: Skill) => {
            setIsEditing(true);
            const { id, category, ...rest } = skill;
            setCurrentSkill({
                ...rest,
                category: categories?.data?.find((cat) => cat.name === category)?.slug || '',
            });
            setSkillId(id || null);
            setIsSheetOpen(true);
        },
        [categories, setCurrentSkill, setSkillId, setIsSheetOpen, setIsEditing],
    );

    const handleSaveSkill: FormEventHandler = useCallback(
        (e) => {
            e.preventDefault();

            if (isEditing) {
                if (!currentSkill.name?.trim()) {
                    toast({
                        title: 'Error',
                        description: 'Please fill in all required fields.',
                        variant: 'destructive',
                    });
                    return;
                }
                updateSkill(route('dashboard.skills.update', skillId as string), {
                    preserveScroll: true,
                    onError(errors) {
                        for (const error in errors) {
                            toast({
                                title: 'Validation Error',
                                description: errors[error],
                                variant: 'destructive',
                            });
                        }
                    },
                    onSuccess() {
                        handleCloseSheet();
                        toast({
                            title: 'Success',
                            description: 'Skill updated successfully.',
                        });
                    },
                });
            } else {
                if (!data.name.trim()) {
                    toast({
                        title: 'Error',
                        description: 'Please fill in all required fields.',
                        variant: 'destructive',
                    });
                    return;
                }

                createSkill(route('dashboard.skills.create'), {
                    onError(errors) {
                        for (const error in errors) {
                            toast({
                                title: 'Validation Error',
                                description: errors[error],
                                variant: 'destructive',
                            });
                        }
                    },
                    onSuccess() {
                        handleCloseSheet();
                        toast({
                            title: 'Success',
                            description: 'Skill added successfully.',
                            variant: 'default',
                        });
                    },
                });
            }
        },
        [isEditing, currentSkill, skillId, data, createSkill, updateSkill, handleCloseSheet, toast],
    );

    const handleDeleteSkill = useCallback(
        (id: number | string) => {
            deleteSkill(route('dashboard.skills.delete', id), {
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
                        title: 'Project Deleted',
                        description: 'Project deleted successfully',
                    });
                },
            });
        },
        [deleteSkill, toast],
    );

    return (
        <DashboardLayout title="Skills Management">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Skills Management</h2>
                    <Button onClick={() => setIsSheetOpen(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Skill
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Skills</CardTitle>
                        <CardDescription>Manage your professional skills and expertise levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Skill</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Published</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {skills.data?.map((skill) => (
                                        <TableRow key={skill.name}>
                                            <TableCell className="font-medium">{skill.name}</TableCell>
                                            <TableCell className="capitalize">{skill.category ?? 'other'}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-muted h-2 w-24 overflow-hidden rounded-full">
                                                        <div
                                                            className={`${getSkillLevelBgColor(skill.level)} h-full rounded-full`}
                                                            style={{ width: `${skill.level}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-muted-foreground text-xs">{getSkillLevelText(skill.level)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {skill.published ? (
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                        Yes
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                        No
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => editSkill(skill)}
                                                        title={`Edit Skill: ${skill.name}`}
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
                                                                    This action cannot be undone. This will permanently delete the skill
                                                                    <span className="font-bold"> {skill.name}</span>.
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
                                                                        onClick={() => handleDeleteSkill(skill.id!)}
                                                                    >
                                                                        Yes, delete project
                                                                    </Button>
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {isEditing ? (
                    <SlideSheet
                        isOpen={isSheetOpen}
                        setIsOpen={setIsSheetOpen}
                        data={currentSkill as any}
                        setData={setCurrentSkill}
                        categories={categories}
                        processing={currentSkillProcessing}
                        handleSave={handleSaveSkill}
                        handleClose={handleCloseSheet}
                        btnTitle="Update Skill"
                        title="Edit Skill"
                        description="Update the skill details below"
                    />
                ) : (
                    <SlideSheet
                        isOpen={isSheetOpen}
                        setIsOpen={setIsSheetOpen}
                        data={data}
                        setData={setData}
                        categories={categories}
                        processing={processing}
                        handleSave={handleSaveSkill}
                        handleClose={handleCloseSheet}
                    />
                )}

                {/* <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <SheetContent className="sm:max-w-lg">
                        <SheetHeader>
                            <SheetTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</SheetTitle>
                            <SheetDescription>
                                {editingSkill ? 'Update your skill details below' : 'Enter the details for your new skill'}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="skill-name">Skill Name</Label>
                                <Input id="skill-name" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="skill-category">Category</Label>
                                <Select
                                    value={newSkill.category}
                                    onValueChange={(value) =>
                                        setNewSkill({
                                            ...newSkill,
                                            category: value as 'frontend' | 'backend' | 'tools' | 'other',
                                        })
                                    }
                                >
                                    <SelectTrigger id="skill-category">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="frontend">Frontend</SelectItem>
                                        <SelectItem value="backend">Backend</SelectItem>
                                        <SelectItem value="tools">Tools</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="skill-level">Skill Level: {getSkillLevelText(newSkill.level)}</Label>
                                    <span className="text-muted-foreground text-sm">{newSkill.level}%</span>
                                </div>
                                <Slider
                                    id="skill-level"
                                    min={1}
                                    max={100}
                                    step={1}
                                    value={[newSkill.level]}
                                    onValueChange={(value) => setNewSkill({ ...newSkill, level: value[0] })}
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <Button onClick={handleSaveSkill}>Save</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet> */}
            </div>
        </DashboardLayout>
    );
}
