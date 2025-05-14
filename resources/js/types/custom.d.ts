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
