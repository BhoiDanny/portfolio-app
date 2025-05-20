import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Project } from '@/data/portfolio-mock-data';
import { ExternalLink, Github } from 'lucide-react';
import React from 'react';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="project-card bg-card cursor-pointer overflow-hidden rounded-xl shadow-md">
                    <div className="aspect-video overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="font-display mb-2 text-xl font-semibold">{project.title}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="bg-secondary/20 text-primary rounded-full px-2 py-1 text-xs">
                                    {tag}
                                </span>
                            ))}
                            {project.tags.length > 3 && <span className="bg-muted rounded-full px-2 py-1 text-xs">+{project.tags.length - 3}</span>}
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl">{project.title}</DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    <div className="mb-6 overflow-hidden rounded-lg">
                        <img src={project.image} alt={project.title} className="w-full object-cover" />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="mb-2 text-lg font-semibold">Overview</h4>
                            <p className="text-foreground/70">{project.details}</p>
                        </div>

                        <div>
                            <h4 className="mb-2 text-lg font-semibold">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, index) => (
                                    <span key={index} className="bg-secondary/20 text-primary rounded-full px-3 py-1 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {project.demoLink && (
                                <Button asChild>
                                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                    </a>
                                </Button>
                            )}

                            {project.githubLink && (
                                <Button variant="outline" asChild>
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" /> View Code
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectCard;
