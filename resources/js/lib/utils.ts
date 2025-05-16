import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getSkillLevelText = (level: number) => {
    if (level < 25) return 'Beginner';
    if (level < 50) return 'Intermediate';
    if (level < 75) return 'Advanced';
    return 'Expert';
};

export const getSkillLevelBgColor = (level: number) => {
    if (level < 25) return 'bg-red-500';
    if (level < 50) return 'bg-yellow-500';
    if (level < 75) return 'bg-blue-500';
    return 'bg-green-500';
};

export const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    try {
        const [year, month] = dateString.split('-');
        return `${month}/${year}`;
    } catch (error) {
        return dateString;
    }
};

//! format date for input date picker

export const formatDateTime = (dateString: string | null) => {
    if (!dateString) return;
    try {
        const [year, month] = dateString.split('-');
        return `${year}-${month}`;
    } catch (error) {
        return dateString;
    }
};
