import ProjectCard from '@/components/project-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { projects as initialProjects, Project } from '@/data/portfolio-mock-data';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardLayout from '@/layouts/dashboard-layout';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const { toast } = useToast();
    const isMobile = useIsMobile();

    const handleOpenDialog = (project?: Project) => {
        if (project) {
            setCurrentProject({ ...project });
            setIsEditing(true);
        } else {
            setCurrentProject({
                id: String(Date.now()),
                title: '',
                description: '',
                image: '/placeholder.svg',
                tags: [],
                featured: false,
                details: '',
            });
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setCurrentProject(null);
        setTagInput('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentProject((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    const handleCheckboxChange = (checked: boolean | string) => {
        setCurrentProject((prev) => (prev ? { ...prev, featured: !!checked } : null));
    };

    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        setCurrentProject((prev) => {
            if (!prev) return null;
            const updatedTags = [...(prev.tags || []), tagInput.trim()];
            return { ...prev, tags: updatedTags };
        });
        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setCurrentProject((prev) => {
            if (!prev || !prev.tags) return prev;
            return {
                ...prev,
                tags: prev.tags.filter((tag) => tag !== tagToRemove),
            };
        });
    };

    const handleSaveProject = () => {
        if (!currentProject || !currentProject.title || !currentProject.description) {
            toast({
                title: 'Validation Error',
                description: 'Please fill in all required fields.',
                variant: 'destructive',
            });
            return;
        }

        if (isEditing) {
            setProjects(projects.map((p) => (p.id === currentProject.id ? (currentProject as Project) : p)));
            toast({
                title: 'Project Updated',
                description: 'Your project has been updated successfully.',
            });
        } else {
            setProjects([...projects, currentProject as Project]);
            toast({
                title: 'Project Created',
                description: 'Your new project has been created successfully.',
            });
        }
        handleCloseDialog();
    };

    const handleDeleteProject = (id: string | number) => {
        setProjects(projects.filter((project) => project.id !== id));
        toast({
            title: 'Project Deleted',
            description: 'The project has been deleted successfully.',
        });
    };

    return (
        <DashboardLayout title="Projects Management">
            <div className="space-y-6">
                <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
                    <h1 className="mb-4 text-2xl font-semibold sm:mb-0">Projects Management</h1>
                    <Button onClick={() => handleOpenDialog()} className="flex w-full items-center gap-2 sm:w-auto">
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
                                {projects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        handleOpenDialog={handleOpenDialog}
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
                                        {projects.map((project) => (
                                            <TableRow key={project.id}>
                                                <TableCell className="font-medium">{project.title}</TableCell>
                                                <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {project.tags.slice(0, 2).map((tag) => (
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
                                                        <Button size="icon" variant="ghost" onClick={() => handleOpenDialog(project)}>
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" onClick={() => handleDeleteProject(project.id)}>
                                                            <TrashIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                            <DialogDescription>
                                {isEditing ? 'Update your project information below.' : 'Fill in the information for your new project.'}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-6 py-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:item-center">
                                <label htmlFor="title" className="text-left sm:w-1/4 sm:text-right">
                                    Title*
                                </label>
                                <Input id="title" name="title" value={currentProject?.title || ''} onChange={handleInputChange} className="flex-1" />
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <label htmlFor="description" className="text-left sm:w-1/4 sm:text-right">
                                    Description*
                                </label>
                                <Input
                                    id="description"
                                    name="description"
                                    value={currentProject?.description || ''}
                                    onChange={handleInputChange}
                                    className="flex-1"
                                />
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <label htmlFor="details" className="text-left sm:w-1/4 sm:text-right">
                                    Details
                                </label>
                                <Input
                                    id="details"
                                    name="details"
                                    value={currentProject?.details || ''}
                                    onChange={handleInputChange}
                                    className="flex-1"
                                />
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <label htmlFor="demoLink" className="text-left sm:w-1/4 sm:text-right">
                                    Demo Link
                                </label>
                                <Input
                                    id="demoLink"
                                    name="demoLink"
                                    value={currentProject?.demoLink || ''}
                                    onChange={handleInputChange}
                                    className="flex-1"
                                    placeholder="https://"
                                />
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <label htmlFor="githubLink" className="text-left sm:w-1/4 sm:text-right">
                                    GitHub Link
                                </label>
                                <Input
                                    id="githubLink"
                                    name="githubLink"
                                    value={currentProject?.githubLink || ''}
                                    onChange={handleInputChange}
                                    className="flex-1"
                                    placeholder="https://"
                                />
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <label className="text-left sm:w-1/4 sm:text-right">Tags</label>
                                <div className="flex-1 space-y-2">
                                    <div className="mb-2 flex flex-wrap gap-2">
                                        {currentProject?.tags?.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                                {tag}
                                                <button
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="ml-1 rounded-full text-gray-400 hover:text-gray-700"
                                                    type="button"
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2 sm:flex-row">
                                        <Input
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            placeholder="Add a tag"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddTag();
                                                }
                                            }}
                                            className="flex-1"
                                        />
                                        <Button onClick={handleAddTag} type="button" variant="secondary">
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="text-left sm:w-1/4 sm:text-right">Featured</div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="featured" checked={currentProject?.featured || false} onCheckedChange={handleCheckboxChange} />
                                    <label htmlFor="featured">Show as featured project</label>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                            <Button variant="outline" onClick={handleCloseDialog} className="order-2 w-full sm:order-1 sm:w-auto">
                                Cancel
                            </Button>
                            <Button onClick={handleSaveProject} className="order-1 w-full sm:order-2 sm:w-auto">
                                {isEditing ? 'Save Changes' : 'Create Project'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}
