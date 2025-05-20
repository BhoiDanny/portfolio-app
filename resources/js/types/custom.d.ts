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

export interface ProjectItem {
    data?: Project[] | null;
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    links?: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
}

export interface Skill {
    id?: string;
    name: string;
    level: number;
    category?: string;
    description?: string;
    published?: boolean;
}

export interface SkillsItem {
    data?: Skill[] | null;
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    links?: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface CategoryItem {
    data?: Category[] | null;
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    links?: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
}

export interface SlideSheetProps<T = any> {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
    description?: string;
    data: T;
    categories?: CategoryItem;
    setData: (data: string, value: string | string[] | boolean | number | File) => void;
    handleSave?: FormEventHandler<HTMLFormElement>;
    btnTitle?: string;
    className?: string;
    processing?: boolean;
    handleClose?: () => void;
}

export interface Experience {
    id?: string;
    job_title: string;
    company: string;
    location: string;
    start_date: string;
    end_date?: string;
    description?: string;
    website?: string;
    logo?: File | string | null;
    achievements?: string[];
    type?: 'job' | 'internship' | 'volunteer';
    published?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface ExperienceItem {
    data?: Experience[] | null;
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    links?: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    bio?: string;
    resume_url?: string;
    occupation?: string;
    email_verified_at: string | null;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface About {
    id?: number;
    title: string;
    description: string[];
    profile_picture?: string | File | null;
    email?: string;
    phone?: string;
    location?: string;
    address?: string;
    statistics?: Array<{
        label?: string;
        value?: string | number;
    }>;
    social_links?: Array<{
        platform: string;
        url?: string;
    }>;
    trusted_by?: Array<{
        name: string;
        logo?: File | string | null;
        url?: string;
    }>;
    [key: string]: unknown; // This allows for additional properties...
}
