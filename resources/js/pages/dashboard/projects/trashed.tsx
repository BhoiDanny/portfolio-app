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
import DashboardLayout from '@/layouts/dashboard-layout';
import { ProjectItem } from '@/types/custom';
import { Link, useForm } from '@inertiajs/react';
import { RotateCcw, TrashIcon, Undo } from 'lucide-react';
import EmptyImage from '/public/empty.svg';

const Trashed = ({ projects: projectItems }: { projects: ProjectItem }) => {
    const { data: projects } = projectItems;
    const { delete: destroy, put } = useForm();
    const { toast } = useToast();

    const handleRestoreProject = (id: number | string) => {
        //? restore project
        put(route('dashboard.projects.restore', id), {
            onSuccess: () => {
                toast({
                    title: 'Project Restored',
                    description: 'The project has been restored successfully.',
                    variant: 'default',
                });
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'There was an error restoring the project.',
                    variant: 'destructive',
                });
            },
        });
    };

    const handleDeleteProject = (id: number | string) => {
        //? delete project
        destroy(route('dashboard.projects.delete.permanent', id), {
            onSuccess: () => {
                toast({
                    title: 'Project Deleted',
                    description: 'The project has been permanently deleted successfully.',
                    variant: 'default',
                });
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'There was an error deleting the project.',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <DashboardLayout title="Trashed Projects">
            <div className="space-y-6">
                <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
                    <h1 className="mb-4 text-2xl font-semibold sm:mb-0">Trashed Projects</h1>
                    <div className="flex items-center gap-4">
                        <Link
                            className="text-primary-foreground bg-primary hover:bg-primary-400/90 flex w-full items-center gap-2 rounded-md px-4 py-2 font-medium"
                            href={route('dashboard.projects.index')}
                        >
                            <Undo className="h-4 w-4" />
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Deleted Projects</CardTitle>
                    <CardDescription>
                        Here you can find all the projects that have been trashed. You can restore or permanently delete them.
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                                                <img className="h-16 w-16 rounded-full object-cover" src={project.image} alt={project.title} />
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
                                                    <span className="</div>rounded-full inline-flex items-center bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
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
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button size="icon" variant="ghost" title="Restore Project">
                                                                <RotateCcw className="h-4 w-4 text-green-500" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action will restore the project to its original state.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel asChild>
                                                                    <Button variant="outline">Cancel</Button>
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction asChild>
                                                                    <Button
                                                                        className="bg-green-500 text-white hover:bg-green-600"
                                                                        variant="destructive"
                                                                        onClick={() => handleRestoreProject(project.id)}
                                                                    >
                                                                        Yes, restore project
                                                                    </Button>
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>

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
                                                                    This action cannot be undone. This will permanently delete the project.
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
                                        <TableCell colSpan={5} className="text-bold mt-8 text-center text-xl">
                                            <img className="mx-auto mt-4 h-58 w-58" src={EmptyImage} alt="Empty Image" />
                                            <p className="mt-4 text-lg font-semibold">No Trashed Projects</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default Trashed;
