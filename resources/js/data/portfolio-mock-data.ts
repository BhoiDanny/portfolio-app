export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoLink?: string;
    githubLink?: string;
    featured: boolean; 
    details: string;
}

export interface Skill {
    name: string;
    level: number; // 1-100
    category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
    achievements: string[];
}

export interface Contact {
    email: string;
    phone?: string;
    location: string;
    timezone: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        other?: { label: string; url: string }[];
    };
}

export interface PersonalInfo {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    resumeUrl: string;
}

// Sample data
export const personalInfo: PersonalInfo = {
    name: 'Alex Morgan',
    title: 'Full Stack Developer',
    bio: 'Experienced full stack developer with over 5 years of experience building modern web applications. Passionate about creating intuitive user experiences and scalable backend solutions.',
    avatar: '/placeholder.svg',
    resumeUrl: '#',
};

export const projects: Project[] = [
    {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
        image: '/placeholder.svg',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        demoLink: 'https://example.com',
        githubLink: 'https://github.com',
        featured: true,
        details:
            'This project is a comprehensive e-commerce solution built with a React frontend and Node.js backend. It features user authentication, product catalog with search and filtering, shopping cart functionality, and Stripe payment integration. The application is fully responsive and follows accessibility best practices.',
    },
    {
        id: '2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates and team features.',
        image: '/placeholder.svg',
        tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
        demoLink: 'https://example.com',
        githubLink: 'https://github.com',
        featured: true,
        details:
            'A task management application that allows teams to collaborate on projects in real-time. Features include task creation and assignment, due date tracking, comment threads, file attachments, and real-time notifications. Built with Vue.js and Firebase for backend and real-time functionality.',
    },
    {
        id: '3',
        title: 'Fitness Tracking Dashboard',
        description: 'A comprehensive fitness tracking dashboard with data visualization and progress tracking.',
        image: '/placeholder.svg',
        tags: ['React', 'D3.js', 'Express', 'PostgreSQL'],
        demoLink: 'https://example.com',
        githubLink: 'https://github.com',
        featured: true,
        details:
            'A fitness tracking application that helps users monitor their workout routines, nutrition, and overall progress. It includes interactive charts built with D3.js, custom workout planning tools, and integration with popular fitness devices. The backend is powered by Express and PostgreSQL for data storage.',
    },
    {
        id: '4',
        title: 'Real Estate Listings',
        description: 'A real estate platform with property listings, search functionality, and user accounts.',
        image: '/placeholder.svg',
        tags: ['Angular', 'Node.js', 'MongoDB'],
        demoLink: 'https://example.com',
        githubLink: 'https://github.com',
        featured: false,
        details:
            'A real estate listing platform that allows users to browse properties, save favorites, and contact agents. Features include advanced search with filters for property type, price range, and amenities, interactive maps, virtual tours, and user authentication.',
    },
    {
        id: '5',
        title: 'Social Media Dashboard',
        description: 'An analytics dashboard for tracking social media performance across multiple platforms.',
        image: '/placeholder.svg',
        tags: ['React', 'Redux', 'Node.js'],
        demoLink: 'https://example.com',
        githubLink: 'https://github.com',
        featured: false,
        details:
            'A social media analytics dashboard that aggregates data from multiple platforms (Facebook, Twitter, Instagram) into a unified interface. It provides insights on engagement, follower growth, content performance, and audience demographics with customizable reporting options.',
    },
    {
        id: '6',
        title: 'Weather Application',
        description: 'A weather forecast application with location-based services and interactive maps.',
        image: '/placeholder.svg',
        tags: ['React Native', 'API Integration', 'Geolocation'],
        demoLink: 'https://example.com',
        githubLink: 'https://github.com',
        featured: false,
        details:
            'A cross-platform weather application built with React Native that provides current conditions, forecasts, and severe weather alerts. Features include geolocation for automatic local weather, interactive radar maps, hourly and 7-day forecasts, and customizable notification settings.',
    },
];

export const skills: Skill[] = [
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 80, category: 'frontend' },
    { name: 'CSS/SCSS', level: 85, category: 'frontend' },
    { name: 'Tailwind CSS', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 85, category: 'backend' },
    { name: 'Express', level: 80, category: 'backend' },
    { name: 'MongoDB', level: 75, category: 'backend' },
    { name: 'PostgreSQL', level: 70, category: 'backend' },
    { name: 'GraphQL', level: 65, category: 'backend' },
    { name: 'Docker', level: 60, category: 'tools' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'CI/CD', level: 70, category: 'tools' },
    { name: 'Jest', level: 75, category: 'tools' },
    { name: 'Figma', level: 65, category: 'tools' },
    { name: 'UI/UX Design', level: 70, category: 'other' },
    { name: 'Agile/Scrum', level: 80, category: 'other' },
];

export const experiences: Experience[] = [
    {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        startDate: '2021-06',
        endDate: null,
        description: 'Leading the frontend development team in building modern, responsive web applications.',
        achievements: [
            "Redesigned the company's flagship product, improving user engagement by 35%",
            'Implemented a component library that reduced development time by 40%',
            'Mentored junior developers and established best practices for the team',
        ],
    },
    {
        id: '2',
        title: 'Full Stack Developer',
        company: 'Digital Solutions',
        location: 'Austin, TX',
        startDate: '2019-03',
        endDate: '2021-05',
        description: 'Developed and maintained full-stack web applications for clients across various industries.',
        achievements: [
            'Built a custom e-commerce platform that increased client sales by 25%',
            'Optimized database queries, improving application performance by 50%',
            'Implemented automated testing, reducing production bugs by 30%',
        ],
    },
    {
        id: '3',
        title: 'Junior Web Developer',
        company: 'WebCraft Agency',
        location: 'Seattle, WA',
        startDate: '2017-09',
        endDate: '2019-02',
        description: 'Collaborated with designers and senior developers to create responsive websites for clients.',
        achievements: [
            'Developed responsive frontends for 15+ client websites',
            'Learned and implemented modern JavaScript frameworks',
            'Participated in client meetings and requirement gathering sessions',
        ],
    },
];

export const contact: Contact = {
    email: 'contact@example.com',
    phone: '+233 5541 300 56',
    location: 'Accra, GH',
    timezone: 'UTC',
    socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
};
