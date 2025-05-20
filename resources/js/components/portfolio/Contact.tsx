import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { contact } from '@/data/portfolio-mock-data';
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React from 'react';

const Contact = () => {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, this would send the form data to an API
        toast({
            title: 'Message sent!',
            description: "Thank you for your message. I'll get back to you soon.",
        });
    };

    return (
        <section id="contact" className="bg-muted/30 py-20">
            <div className="section-container">
                <div className="mb-12 text-center">
                    <p className="text-primary font-medium">Get In Touch</p>
                    <h2 className="font-display mt-2 mb-4 text-3xl font-bold md:text-4xl">Contact Me</h2>
                    <p className="text-foreground/70 mx-auto max-w-2xl">
                        Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
                    </p>
                </div>

                <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
                    {/* Contact Form */}
                    <div className="bg-card rounded-lg p-8 shadow-sm">
                        <h3 className="mb-6 text-xl font-bold">Send me a message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <Input id="name" placeholder="Your name" required />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input id="email" type="email" placeholder="Your email" required />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="subject" className="text-sm font-medium">
                                        Subject
                                    </label>
                                    <Input id="subject" placeholder="Subject" required />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <Textarea id="message" placeholder="Your message" rows={5} required />
                                </div>
                            </div>

                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 rounded-full p-3">
                                <Mail className="text-primary h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="mb-1 font-semibold">Email</h4>
                                <a href={`mailto:${contact.email}`} className="text-foreground/70 hover:text-primary">
                                    {contact.email}
                                </a>
                            </div>
                        </div>

                        {contact.phone && (
                            <div className="flex items-start space-x-4">
                                <div className="bg-primary/10 rounded-full p-3">
                                    <Phone className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="mb-1 font-semibold">Phone</h4>
                                    <a href={`tel:${contact.phone}`} className="text-foreground/70 hover:text-primary">
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 rounded-full p-3">
                                <MapPin className="text-primary h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="mb-1 font-semibold">Location</h4>
                                <p className="text-foreground/70">
                                    {contact.location} <br />
                                    {contact.timezone}
                                </p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <h4 className="mb-4 font-semibold">Connect with me</h4>
                            <div className="flex space-x-4">
                                {contact.socialLinks.github && (
                                    <a
                                        href={contact.socialLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-card hover:bg-primary/10 rounded-full p-3 transition-colors"
                                    >
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}

                                {contact.socialLinks.linkedin && (
                                    <a
                                        href={contact.socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-card hover:bg-primary/10 rounded-full p-3 transition-colors"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}

                                {contact.socialLinks.twitter && (
                                    <a
                                        href={contact.socialLinks.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-card hover:bg-primary/10 rounded-full p-3 transition-colors"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
