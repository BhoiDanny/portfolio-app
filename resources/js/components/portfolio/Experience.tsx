import { Badge } from '@/components/ui/badge';
import { experiences } from '@/data/portfolio-mock-data';
import { Calendar } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="py-20">
            <div className="section-container">
                <div className="mb-12 text-center">
                    <p className="text-primary font-medium">My Journey</p>
                    <h2 className="font-display mt-2 mb-4 text-3xl font-bold md:text-4xl">Work Experience</h2>
                    <p className="text-foreground/70 mx-auto max-w-2xl">
                        A timeline of my professional career, highlighting key roles and achievements.
                    </p>
                </div>

                <div className="relative mx-auto mt-16 max-w-4xl">
                    {/* Vertical timeline line */}
                    <div className="bg-muted absolute left-0 hidden h-full w-1 transform md:left-1/2 md:block md:translate-x-[-50%]"></div>

                    {experiences.map((experience, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={experience.id} className={`relative mb-20 md:mb-0`}>
                                <div className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Timeline dot */}
                                    <div className="bg-primary absolute top-0 left-1/2 z-10 hidden h-5 w-5 translate-x-[-50%] transform rounded-full md:block"></div>

                                    {/* Content box */}
                                    <div className={`md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'} bg-card relative rounded-lg p-6 shadow-sm`}>
                                        <Badge className="absolute top-6 right-6">
                                            {experience.endDate ? experience.endDate.substring(0, 4) : 'Present'}
                                        </Badge>

                                        <h3 className="text-xl font-bold">{experience.title}</h3>
                                        <h4 className="text-primary mt-1 font-medium">{experience.company}</h4>

                                        <div className="text-foreground/70 mt-2 mb-4 flex items-center text-sm">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>
                                                {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                                                {experience.endDate
                                                    ? new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                                                    : 'Present'}
                                            </span>
                                        </div>

                                        <p className="text-foreground/70 mb-4">{experience.description}</p>

                                        <ul className="text-foreground/70 list-inside list-disc space-y-2 text-sm">
                                            {experience.achievements.map((achievement, idx) => (
                                                <li key={idx}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;
