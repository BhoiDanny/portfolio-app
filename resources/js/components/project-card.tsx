import { Project } from '@/data/portfolio-mock-data';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface ProjectCardProps {
    project: Project;
    handleEditDialog: (project: Project) => void;
    handleDeleteProject: (projectId: string | number) => void;
}

export default function ProjectCard({ project, handleEditDialog, handleDeleteProject }: ProjectCardProps) {
    return (
        <Card key={project.id} className="mb-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="mb-3 flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                    {project.tags.length > 2 && <Badge variant="outline">+{project.tags.length - 2}</Badge>}
                </div>
                <div className="mb-2">
                    {project.featured ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Featured
                        </span>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            Not Featured
                        </span>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditDialog(project)} className="flex items-center gap-1">
                        <PencilIcon className="h-3.5 w-3.5" />
                        Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)} className="flex items-center gap-1">
                        <TrashIcon className="h-3.5 w-3.5" />
                        Delete
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
