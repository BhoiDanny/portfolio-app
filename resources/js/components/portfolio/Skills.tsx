import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { skills } from '@/data/portfolio-mock-data';
import { useState } from 'react';

const SkillCategory = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & Workflow',
    other: 'Other',
};

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState<'frontend' | 'backend' | 'tools' | 'other'>('frontend');

    const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

    return (
        <section id="skills" className="bg-muted/30 py-20">
            <div className="section-container">
                <div className="mb-12 text-center">
                    <p className="text-primary font-medium">My Skills</p>
                    <h2 className="font-display mt-2 mb-4 text-3xl font-bold md:text-4xl">Technical Expertise</h2>
                    <p className="text-foreground/70 mx-auto max-w-2xl">
                        Here's an overview of my technical skills and proficiency levels across different areas.
                    </p>
                </div>

                <div className="mx-auto max-w-3xl">
                    <Tabs
                        defaultValue="frontend"
                        value={activeCategory}
                        onValueChange={(value) => setActiveCategory(value as any)}
                        className="w-full"
                    >
                        <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="frontend">Frontend</TabsTrigger>
                            <TabsTrigger value="backend">Backend</TabsTrigger>
                            <TabsTrigger value="tools">Tools</TabsTrigger>
                            <TabsTrigger value="other">Other</TabsTrigger>
                        </TabsList>

                        {Object.keys(SkillCategory).map((category) => (
                            <TabsContent key={category} value={category} className="space-y-6">
                                {filteredSkills.map((skill, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">{skill.name}</h3>
                                            <span className="text-foreground/70 text-sm">{skill.level}%</span>
                                        </div>
                                        <Progress value={skill.level} className="h-2" />
                                    </div>
                                ))}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>

                <div className="mx-auto mt-16 grid max-w-4xl gap-6 text-center md:grid-cols-4">
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                        <h3 className="text-primary text-3xl font-bold">5+</h3>
                        <p className="text-foreground/70 mt-2">Years Experience</p>
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                        <h3 className="text-primary text-3xl font-bold">50+</h3>
                        <p className="text-foreground/70 mt-2">Projects Completed</p>
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                        <h3 className="text-primary text-3xl font-bold">20+</h3>
                        <p className="text-foreground/70 mt-2">Technologies</p>
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                        <h3 className="text-primary text-3xl font-bold">15+</h3>
                        <p className="text-foreground/70 mt-2">Happy Clients</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
