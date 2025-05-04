import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FormRowProps {
    label: string;
    htmlFor?: string;
    children: ReactNode;
    className?: string;
    required?: boolean;
}

export default function FormRow({ label, htmlFor, children, className, required }: FormRowProps) {
    return (
        <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-center', className)}>
            <label htmlFor={htmlFor} className="text-left sm:w-1/4 sm:text-right">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}
