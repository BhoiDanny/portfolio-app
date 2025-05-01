import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export default function AuthLayout({ children, title, description, className }: AuthLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className={cn('bg-primary/10 flex min-h-screen flex-col items-center justify-center px-4', className)}>{children}</div>
        </>
    );
}
