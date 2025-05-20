import { projects } from '@/data/portfolio-mock-data';
import { useState } from 'react';
import ProjectCard from './ProjectCard';

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile'];

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects =
        activeCategory === 'All'
            ? projects
            : projects.filter((project) => project.tags.some((tag) => tag.toLowerCase().includes(activeCategory.toLowerCase())));

    return (
        <section id="portfolio" className="py-20">
            <div className="section-container">
                <div className="mb-12 text-center">
                    <p className="text-primary font-medium">My Work</p>
                    <h2 className="font-display mt-2 mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
                    <p className="text-foreground/70 mx-auto max-w-2xl">
                        Explore a selection of my recent work, showcasing my skills and expertise in web development and design.
                    </p>
                </div>

                <div className="mb-10 flex justify-center overflow-x-auto">
                    <div className="flex space-x-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                                    activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                                }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
