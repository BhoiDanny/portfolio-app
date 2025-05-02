import { Toaster } from '@/components/ui/toaster';
import { useFlash } from '@/hooks/use-flash';
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
    useFlash();

    return (
        <>
            <Head title={title} />
            <Toaster />
            <div className={cn('bg-primary/10 flex min-h-screen flex-col items-center justify-center px-4', className)}>{children}</div>
        </>
    );
}
