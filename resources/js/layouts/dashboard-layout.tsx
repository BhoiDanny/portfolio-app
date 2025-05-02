import DashboardHeader from '@/components/dashboard/dashboard-header';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useFlash } from '@/hooks/use-flash';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

interface DashbordLayoutProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    [key: string]: any;
}

export default function DashboardLayout({ children, title, className }: DashbordLayoutProps) {
    useFlash();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <Head title={title ?? 'Dashboard'} />
            <Toaster/>
            <div className={cn('bg-background flex min-h-screen', className)}>
                <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex flex-1 flex-col md:ml-64">
                    <DashboardHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                    <main className="flex-1 overflow-x-hidden p-4 md:p-6">{children}</main>
                </div>
            </div>
        </>
    );
}
