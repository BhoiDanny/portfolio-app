import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projects } from '@/data/portfolio-mock-data';
import DashboardLayout from '@/layouts/dashboard-layout';
import { BarChart3, Eye, MessageSquare, Users } from 'lucide-react';

const stats = [
    {
        title: 'Total Projects',
        value: 22,
        change: '+10%',
        icon: FolderIcon,
    },
    {
        title: 'Total Views',
        value: '12.4K',
        change: '+24%',
        icon: EyeIcon,
    },
    {
        title: 'Inquiries',
        value: 42,
        change: '+15%',
        icon: MessageIcon,
    },
    {
        title: 'Visitors',
        value: '3.2K',
        change: '+18%',
        icon: UsersIcon,
    },
];

function FolderIcon() {
    return <BarChart3 className="text-muted-foreground h-5 w-5" />;
}

function EyeIcon() {
    return <Eye className="text-muted-foreground h-5 w-5" />;
}

function MessageIcon() {
    return <MessageSquare className="text-muted-foreground h-5 w-5" />;
}

function UsersIcon() {
    return <Users className="text-muted-foreground h-5 w-5" />;
}

const Dashboard = () => {
    return (
        <DashboardLayout title="Dashboard Overview">
            <div className="space-y-8">
                <div>
                    <h2 className="mb-6 text-3xl font-bold">Dashboard Overview</h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <stat.icon />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-muted-foreground mt-1 text-xs">{stat.change} from last month</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Projects</CardTitle>
                            <CardDescription>Your most recently added portfolio projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {projects.slice(0, 5).map((project) => (
                                    <div key={project.id} className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-secondary/20 flex h-10 w-10 items-center justify-center rounded">
                                                <BarChart3 className="text-primary h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{project.title}</h4>
                                                <p className="text-muted-foreground text-xs">{project.tags.slice(0, 2).join(', ')}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            Edit
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full">
                                    View All Projects
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Metrics</CardTitle>
                            <CardDescription>Portfolio engagement in the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[320px] flex-col items-center justify-center space-y-6 text-center">
                                <p className="text-muted-foreground">Charts will be implemented in future updates!</p>
                                <Button>Generate Report</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
