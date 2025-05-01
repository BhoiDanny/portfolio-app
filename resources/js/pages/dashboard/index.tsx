import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import DashboardLayout from '@/layouts/dashboard-layout';
import { useState } from 'react';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <DashboardLayout title="Dashboard">
            <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            Heello
        </DashboardLayout>
    );
}
