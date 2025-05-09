import { DialogPanel } from '@/components/dialog';
import ProjectCard from '@/components/project-card';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Project, ProjectItem } from '@/types/custom';
import { Link, useForm } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { FormEventHandler, useCallback, useState } from 'react';
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

interface ProjectEditForm extends ProjectForm {
    id?: string | number;
}

export default function Index({ projects: projectItems, trash_count }: { projects: ProjectItem; trash_count: number }) {
    const { data: projects } = projectItems;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projectId, setProjectId] = useState<number | string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const { toast } = useToast();
    const isMobile = useIsMobile();

    const {
        data,
        setData,
        post: create,
        delete: destroy,
        processing,
        reset,
    } = useForm<Required<ProjectForm>>({
        title: '',
        description: '',
        image: null,
        tags: [],
        featured: false,
        details: '',
        demoLink: '',
        githubLink: '',
    });

    const {
        data: currentProject,
        setData: setCurrentProject,
        post: update,
        processing: currentProjectProcessing,
        reset: resetCurrentProject,
        transform: transformCurrentProject,
    } = useForm<Partial<ProjectEditForm>>({
        title: '',
        description: '',
        image: null,
        tags: [],
        featured: false,
        details: '',
        demoLink: '',
        githubLink: '',
    });

    const handleCloseDialog = useCallback(() => {
        setIsDialogOpen(false);
        setIsEditing(false);
        setProjectId(null);
        reset();
        resetCurrentProject();
    }, [reset, resetCurrentProject]);

    const handleEditProject = useCallback(
        (project: Project) => {
            setIsEditing(true);
            const { image, id, ...rest } = project;
            setCurrentProject((p) => ({
                ...p,
                ...rest,
            }));
            setProjectId(id);
            setIsDialogOpen(true);
        },
        [setCurrentProject, setProjectId, setIsDialogOpen],
    );

    const handleSaveProject: FormEventHandler = useCallback(
        (e) => {
            e.preventDefault();

            if (isEditing) {
                if (!currentProject.title!.trim() || !currentProject.description!.trim()) {
                    toast({
                        title: 'Validation Error',
                        description: 'Please fill in all required fields.',
                        variant: 'destructive',
                    });
                    return;
                }
                transformCurrentProject((data) => ({
                    ...data,
                    _method: 'put',
                }));
                update(route('dashboard.projects.update', projectId as string), {
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
                        handleCloseDialog();
                        toast({
                            title: 'Project Updated',
                            description: 'Project updated successfully',
                        });
                    },
                });
            } else {
                if (!data.title.trim() || !data.description.trim()) {
                    toast({
                        title: 'Validation Error',
                        description: 'Please fill in all required fields.',
                        variant: 'destructive',
                    });
                    return;
                }
                if (data.image === null || data.image === undefined) {
                    toast({
                        title: 'Validation Error',
                        description: 'Please upload an image for the project.',
                        variant: 'destructive',
                    });
                    return;
                }

                create(route('dashboard.projects.create'), {
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
                        handleCloseDialog();
                        toast({
                            title: 'Project Created',
                            description: 'Your new project has been created successfully.',
                        });
                    },
                });
            }
        },
        [data, create, update, handleCloseDialog, isEditing, currentProject, projectId, toast],
    );

    const handleDeleteProject = useCallback(
        (id: string | number) => {
            destroy(route('dashboard.projects.delete', id), {
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
        [destroy, toast],
    );

    return (
        <DashboardLayout title="Projects Management">
            <div className="space-y-6">
                {/* Header */}
                <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
                    <h1 className="mb-4 text-2xl font-semibold sm:mb-0">Projects Management</h1>
                    <div className="flex items-center gap-4">
                        <Button onClick={() => setIsDialogOpen(true)} className="flex w-full items-center gap-2 sm:w-auto">
                            <PlusIcon className="h-4 w-4" />
                            Add New Project
                        </Button>
                        {trash_count > 0 && (
                            <Link
                                className="text-primary-foreground flex w-full items-center gap-2 rounded-md bg-red-400 px-4 py-2 font-medium hover:bg-red-400/90"
                                href={route('dashboard.projects.trashed')}
                            >
                                <TrashIcon className="h-4 w-4" />
                                Trashed ({trash_count})
                            </Link>
                        )}
                    </div>
                </div>

                {/* Projects Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Projects</CardTitle>
                        <CardDescription>Manage your portfolio projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isMobile ? (
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
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Tags</TableHead>
                                            <TableHead>Featured</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projects!.length > 0 ? (
                                            projects!.map((project) => (
                                                <TableRow key={project.id}>
                                                    <TableCell className="font-medium">{project.title}</TableCell>
                                                    <TableCell>
                                                        <img
                                                            className="h-16 w-16 rounded-full object-cover"
                                                            src={project.image}
                                                            alt={project.title}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1">
                                                            {project.tags.length < 1 && <span className="text-gray-500">No Tags</span>}
                                                            {project.tags &&
                                                                project.tags.slice(0, 2).map((tag) => (
                                                                    <Badge key={tag} variant="outline">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            {project.tags.length > 2 && <Badge variant="outline">+{project.tags.length - 2}</Badge>}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {project.featured ? (
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
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                onClick={() => handleEditProject(project)}
                                                                title="Edit Project"
                                                            >
                                                                <PencilIcon className="h-4 w-4 text-yellow-500" />
                                                            </Button>

                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button size="icon" variant="ghost" title="Delete Project">
                                                                        <TrashIcon className="h-4 w-4 text-red-500" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action will move the project to the trash. You can restore it later
                                                                            if needed.
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
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center">
                                                    <div className="flex flex-col items-center">
                                                        <img className="mx-auto mt-4 h-58 w-58" src={EmptyImage} alt="Empty" />
                                                        <p className="mt-4 text-lg font-semibold">No Projects Added Yet</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {isEditing ? (
                    <DialogPanel
                        isOpen={isDialogOpen}
                        setIsOpen={setIsDialogOpen}
                        data={currentProject as ProjectEditForm}
                        setData={setCurrentProject}
                        processing={currentProjectProcessing}
                        handleClose={handleCloseDialog}
                        handleSave={handleSaveProject}
                        title="Edit Project"
                        description="Update your project information below."
                        btnTitle="Save Changes"
                    />
                ) : (
                    <DialogPanel
                        isOpen={isDialogOpen}
                        setIsOpen={setIsDialogOpen}
                        data={data}
                        setData={setData}
                        processing={processing}
                        handleClose={handleCloseDialog}
                        handleSave={handleSaveProject}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
