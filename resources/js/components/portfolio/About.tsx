import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio-mock-data';
import { Download } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="bg-muted/50 py-20">
            <div className="section-container">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-square w-full overflow-hidden rounded-2xl">
                            <img src={personalInfo.avatar} alt="About me" className="h-full w-full object-cover" />
                        </div>
                        <div className="border-background absolute -right-8 -bottom-8 z-[-1] h-64 w-64 rounded-2xl border-8"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-primary font-medium">About Me</p>
                            <h2 className="font-display mt-2 mb-6 text-3xl font-bold md:text-4xl">
                                Passionate Web Developer Creating Digital Experiences
                            </h2>
                        </div>

                        <div className="text-foreground/70 space-y-4">
                            <p>
                                I'm a Full Stack Developer with over 5 years of experience, specializing in building responsive and performant web
                                applications that solve real-world problems.
                            </p>
                            <p>
                                My journey began with a deep curiosity for how things work on the web, which led me to master both frontend and
                                backend technologies. I pride myself on writing clean, maintainable code and creating intuitive user experiences.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or mentoring
                                aspiring developers.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <p className="text-3xl font-bold">50+</p>
                                <p className="text-foreground/70">Projects Completed</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">15+</p>
                                <p className="text-foreground/70">Happy Clients</p>
                            </div>
                        </div>

                        <Button size="lg" variant="outline" className="mt-4">
                            <Download className="mr-2 h-4 w-4" /> Download Resume
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
