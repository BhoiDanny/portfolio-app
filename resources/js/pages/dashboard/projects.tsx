import FormRow from '@/components/form-row';
import ProjectCard from '@/components/project-card';
import TagInput from '@/components/taginput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Project, ProjectItem } from '@/types/custom';
import { useForm } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import EmptyImage from '/public/empty.svg';

type ProjectForm = {
    title: string;
    description: string;
    image: null | string | File;
    tags: string[];
    featured: boolean;
    details: string;
    demoLink: string;
    githubLink: string;
};

export default function Projects({ projects: projectItems }: { projects: ProjectItem }) {
    const { data: projects } = projectItems;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projectId, setProjectId] = useState<number | string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const { toast } = useToast();
    const isMobile = useIsMobile();

    const {
        data,
        setData,
        post,
        delete: destroy,
        transform,
        processing,
        reset
    } = useForm<Required<ProjectForm>>({
        title: '',
        description: '',
        image: '',
        tags: [],
        featured: false,
        details: '',
        demoLink: '',
        githubLink: ''
    });

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsEditing(false);
        setProjectId(null);
        setTagInput('');
        reset();
    };

    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        if (data?.tags?.includes(tagInput.trim())) {
            toast({
                title: 'Tag Already Exists',
                description: 'This tag is already added to the project.'
            });
            return;
        }
        setData('tags', [...data.tags, tagInput.trim()]);
        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setData(
            'tags',
            data.tags.filter((tag) => tag !== tagToRemove)
        );
    };

    const handleEditProject = (project: Project) => {
        setIsEditing(true);
        const { tags, demoLink, githubLink, details, id, ...rest } = project;
        setData({
            ...data,
            ...rest,
            tags: tags || [],
            demoLink: demoLink || '',
            githubLink: githubLink || '',
            details: details || '',
            image: null
        });
        setProjectId(id);
        setIsDialogOpen(true);
    };

    const handleSaveProject: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.title || !data.description) {
            toast({
                title: 'Validation Error',
                description: 'Please fill in all required fields.',
                variant: 'destructive'
            });
            return;
        }

        if (!isEditing) {
            if (data.image === null || data.image === undefined) {
                toast({
                    title: 'Validation Error',
                    description: 'Please upload an image for the project.',
                    variant: 'destructive'
                });
                return;
            }
            post(route('dashboard.projects.create'), {
                onError(errors) {
                    for (const error in errors) {
                        toast({
                            title: 'Validation Error',
                            description: errors[error],
                            variant: 'destructive'
                        });
                    }
                },
                onSuccess() {
                    handleCloseDialog();
                    toast({
                        title: 'Project Created',
                        description: 'Your new project has been created successfully.'
                    });
                }
            });
        } else {
            transform((data) => ({
                ...data,
                _method: 'put'
            }));
            post(route('dashboard.projects.update', projectId as string), {
                onError(errors) {
                    for (const error in errors) {
                        toast({
                            title: 'Validation Error',
                            description: errors[error],
                            variant: 'destructive'
                        });
                    }
                },
                onSuccess() {
                    handleCloseDialog();
                    toast({
                        title: 'Project Updated',
                        description: 'Project updated successfully'
                    });
                }
            });
        }
    };

    const handleDeleteProject = (id: string | number) => {
        //? delete project
        destroy(route('dashboard.projects.delete', id), {
            onError(errors) {
                for (const error in errors) {
                    toast({
                        title: 'Error',
                        description: errors[error],
                        variant: 'destructive'
                    });
                }
            },
            onSuccess() {
                toast({
                    title: 'Project Deleted',
                    description: 'Project deleted successfully'
                });
            }
        });
    };

    return (
        <DashboardLayout title="Projects Management">
            <div className="space-y-6">
                <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
                    <h1 className="mb-4 text-2xl font-semibold sm:mb-0">Projects Management</h1>
                    <Button onClick={() => setIsDialogOpen(true)} className="flex w-full items-center gap-2 sm:w-auto">
                        <PlusIcon className="h-4 w-4" />
                        Add New Project
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>My Projects</CardTitle>
                        <CardDescription>Manage your portfolio projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isMobile ? (
                            // Mobile view - card layout
                            <div className="space-y-4">
                                {projects!.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        handleEditDialog={handleEditProject}
                                        handleDeleteProject={handleDeleteProject}
                                    />
                                ))}
                            </div>
                        ) : (
                            // Desktop view - table layout
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Tags</TableHead>
                                            <TableHead>Featured</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projects!.length > 0 ? (projects!.map((project) => (
                                            <TableRow key={project.id}>
                                                <TableCell className="font-medium">{project.title}</TableCell>
                                                <TableCell
                                                    className="max-w-xs truncate">{project.description}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {project.tags.length < 1 &&
                                                            <span className="text-gray-500">No Tags</span>}
                                                        {project.tags &&
                                                            project.tags.slice(0, 2).map((tag) => (
                                                                <Badge key={tag} variant="outline">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        {project.tags.length > 2 &&
                                                            <Badge variant="outline">+{project.tags.length - 2}</Badge>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {project.featured ? (
                                                        <span
                                                            className="</div>rounded-full inline-flex items-center bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            Yes
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                            No
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button size="icon" variant="ghost"
                                                                onClick={() => handleEditProject(project)}>
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button size="icon" variant="ghost">
                                                                    <TrashIcon className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will
                                                                        permanently delete the project.
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
                                                                            onClick={() => handleDeleteProject(project.id)}
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
                                        ))) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-bold text-xl mt-8">
                                                    <img
                                                        className="w-58 h-58 mx-auto mt-4"
                                                        src={EmptyImage}
                                                        alt="Empty Image"
                                                    />
                                                    No Projects Added Yet
                                                </TableCell>
                                            </TableRow>

                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                        <form onSubmit={handleSaveProject} encType="multipart/form-data">
                            <DialogHeader>
                                <DialogTitle>{isEditing ? 'Edit Project' : 'Create New Project'}</DialogTitle>
                                <DialogDescription>
                                    {isEditing ? 'Update your project information below.' : 'Fill in the information for your new project.'}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col gap-6 py-4">
                                <FormRow htmlFor="title" label="Title" required>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="flex-1"
                                        placeholder="Project Title"
                                    />
                                </FormRow>

                                <FormRow htmlFor="description" label="Description" required>
                                    <Input
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="flex-1"
                                        placeholder="A brief description of the project."
                                    />
                                </FormRow>

                                <FormRow htmlFor={'image'} label="Image" required>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="flex-1"
                                        onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                        placeholder="Upload an image"
                                        value={undefined} // Prevents the input from showing the file name
                                    />
                                </FormRow>

                                <FormRow htmlFor="details" label="Details">
                                    <Input
                                        id="details"
                                        name="details"
                                        value={data.details}
                                        onChange={(e) => setData('details', e.target.value)}
                                        className="flex-1"
                                        placeholder="Optional: Add any additional details about the project."
                                    />
                                </FormRow>

                                <FormRow htmlFor={'demoLink'} label="Demo Link">
                                    <Input
                                        id="demoLink"
                                        name="demoLink"
                                        value={data.demoLink}
                                        onChange={(e) => setData('demoLink', e.target.value)}
                                        className="flex-1"
                                        placeholder="https://"
                                    />
                                </FormRow>

                                <FormRow htmlFor={'githubLink'} label="GitHub Link">
                                    <Input
                                        id="githubLink"
                                        name="githubLink"
                                        value={data.githubLink}
                                        onChange={(e) => setData('githubLink', e.target.value)}
                                        className="flex-1"
                                        placeholder="https://"
                                    />
                                </FormRow>

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <label className="text-left sm:w-1/4 sm:text-right">Tags</label>
                                    <TagInput
                                        tags={data.tags}
                                        input={tagInput}
                                        setInput={setTagInput}
                                        onAdd={handleAddTag}
                                        onRemove={handleRemoveTag}
                                    />
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="text-left sm:w-1/4 sm:text-right">Featured</div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="featured" checked={data.featured}
                                                  onCheckedChange={(c) => setData('featured', c as boolean)} />
                                        <label htmlFor="featured">Show as featured project</label>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                                <Button type="button" variant="outline" onClick={handleCloseDialog}
                                        className="order-2 w-full sm:order-1 sm:w-auto">
                                    Cancel
                                </Button>
                                <Button type="submit" className="order-1 w-full sm:order-2 sm:w-auto"
                                        disabled={processing}>
                                    {isEditing ? 'Save Changes' : 'Create Project'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}
