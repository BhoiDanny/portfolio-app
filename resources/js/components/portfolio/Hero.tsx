import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio-mock-data';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="bg-secondary/20 absolute top-40 right-0 h-72 w-72 rounded-full blur-3xl"></div>
                <div className="bg-primary/10 absolute bottom-20 left-20 h-64 w-64 rounded-full blur-3xl"></div>
            </div>

            <div className="section-container relative z-10">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div className="animate-fade-in space-y-6">
                        <p className="text-primary font-medium">Hello, I'm</p>
                        <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">{personalInfo.name}</h1>
                        <h2 className="text-foreground/80 font-display text-2xl sm:text-3xl">{personalInfo.title}</h2>
                        <p className="text-foreground/70 max-w-md">{personalInfo.bio}</p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button size="lg" className="rounded-full">
                                View My Work <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full" asChild>
                                <a href={personalInfo.resumeUrl} download>
                                    Download CV
                                </a>
                            </Button>
                        </div>

                        <div className="pt-4">
                            <p className="text-foreground/60 mb-3 text-sm">Trusted by innovative companies</p>
                            <div className="flex flex-wrap items-center gap-8 opacity-70">
                                <div className="bg-foreground/20 h-8 w-24 rounded"></div>
                                <div className="bg-foreground/20 h-8 w-20 rounded"></div>
                                <div className="bg-foreground/20 h-8 w-28 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="relative">
                            <div className="from-primary to-secondary h-64 w-64 overflow-hidden rounded-full bg-gradient-to-br sm:h-80 sm:w-80">
                                <img src={personalInfo.avatar} alt={personalInfo.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute -right-6 -bottom-6 flex h-32 w-32 rotate-6 flex-col items-center justify-center rounded-lg bg-white p-3 shadow-lg">
                                <p className="text-lg font-bold">5+</p>
                                <p className="text-center text-sm">Years of Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
