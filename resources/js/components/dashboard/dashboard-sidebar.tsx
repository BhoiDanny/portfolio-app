import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BarChart, BriefcaseBusiness, FileEdit, FolderOpen, Home, Settings, User, Wrench, X } from 'lucide-react';
import React from 'react';
// import { NavLink } from 'react-router-dom';

interface SidebarLink {
    path: string;
    label: string;
    icon: React.ElementType;
}

const links: SidebarLink[] = [
    { path: '/dashboard', label: 'Overview', icon: Home },
    { path: '/dashboard/projects', label: 'Projects', icon: FolderOpen },
    { path: '/dashboard/skills', label: 'Skills', icon: Wrench },
    { path: '/dashboard/experiences', label: 'Experiences', icon: BriefcaseBusiness },
    { path: '/dashboard/about/me', label: 'About', icon: FileEdit },
    { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart },
    { path: '/dashboard/settings/profile', label: 'Profile', icon: User },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

interface DashboardSidebarProps {
    isOpen: boolean;
    name?: string;
    className?: string;
    onClose: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose, name, className }) => {
    const {
        props: { name: appName },
        url,
    } = usePage<SharedData>();

    const isActive = (path: string) => url === path;

    return (
        <aside
            className={`${cn('bg-sidebar fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out', className)} ${
                isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            } border-r`}
        >
            <div className="flex h-16 items-center justify-between border-b px-4">
                <h2 className="text-lg font-bold">{name ?? appName}</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-4rem)]">
                <div className="px-2 py-4">
                    <nav className="space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={cn(
                                    'flex items-center rounded-lg px-3 py-3 text-sm transition-colors',
                                    isActive(link.path)
                                        ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                                        : 'text-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                )}
                                // end={link.path === '/dashboard'}
                                onClick={() => window.innerWidth < 768 && onClose()}
                            >
                                <link.icon className="mr-3 h-5 w-5" />
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </ScrollArea>
        </aside>
    );
};

export default DashboardSidebar;
