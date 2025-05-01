import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import React from 'react';

interface DashbordLayoutProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    [key: string]: any;
}

export default function DashboardLayout({ children, title, className }: DashbordLayoutProps) {
    return (
        <>
            <Head title={title ?? 'Dashboard'} />
            <div className={cn('bg-background flex min-h-screen', className)}>{children}</div>
        </>
    );
}
