import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, Menu } from 'lucide-react';
import React from 'react';

interface DashboardHeaderProps {
    onToggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
    const { user } = usePage<SharedData>().props.auth;

    return (
        <header className="bg-card sticky top-0 z-30 flex h-16 w-full items-center border-b px-4">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-2 md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Link href="/dashboard" className="hidden text-lg font-bold md:block">
                        Dashboard
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="text-foreground/70 text-sm">Welcome, {user?.name || 'Admin'}</span>
                    <Button variant="ghost" size="sm" className="text-foreground/70 flex items-center" asChild>
                        <Link href={route('logout')} method="post" className="flex items-center">
                            <LogOut className="mr-1 h-4 w-4" /> Logout
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
