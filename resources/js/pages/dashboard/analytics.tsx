import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardLayout from '@/layouts/dashboard-layout';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';

// Sample data for charts
const visitorData = [
    { name: 'Jan', visits: 1200 },
    { name: 'Feb', visits: 1900 },
    { name: 'Mar', visits: 2800 },
    { name: 'Apr', visits: 3200 },
    { name: 'May', visits: 4000 },
    { name: 'Jun', visits: 3800 },
    { name: 'Jul', visits: 4200 },
];

const projectViewsData = [
    { name: 'E-commerce Platform', views: 1400 },
    { name: 'Task Management App', views: 980 },
    { name: 'Fitness Tracking', views: 1200 },
    { name: 'Real Estate Listings', views: 750 },
    { name: 'Social Media Dashboard', views: 850 },
    { name: 'Weather Application', views: 600 },
];

const conversionData = [
    { name: 'Contacted', value: 60 },
    { name: 'Meetings', value: 25 },
    { name: 'Hired', value: 15 },
];

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];

export default function Analytics() {
    const [activeTab, setActiveTab] = useState('overview');
    const isMobile = useIsMobile();

    return (
        <DashboardLayout title="Analytics Dashboard">
            <div className="space-y-6">
                <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
                    <h1 className="mb-4 text-2xl font-semibold sm:mb-0">Analytics Dashboard</h1>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-6 grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="traffic">Traffic</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Total Visitors</CardTitle>
                                    <CardDescription>Last 7 months</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-2 text-3xl font-bold">18,100</div>
                                    <div className="text-sm text-green-600">+12.5% from last period</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Project Views</CardTitle>
                                    <CardDescription>All projects</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-2 text-3xl font-bold">5,780</div>
                                    <div className="text-sm text-green-600">+8.2% from last period</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Conversion Rate</CardTitle>
                                    <CardDescription>Contacts to projects</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-2 text-3xl font-bold">15%</div>
                                    <div className="text-sm text-red-500">-2.3% from last period</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Visitor Trend</CardTitle>
                                    <CardDescription>Monthly site visitors</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ChartContainer config={{ visits: { color: '#8884d8' } }}>
                                            <LineChart data={visitorData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Legend />
                                                <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} name="Visitors" />
                                            </LineChart>
                                        </ChartContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Performance</CardTitle>
                                    <CardDescription>Views per project</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ChartContainer config={{ views: { color: '#82ca9d' } }}>
                                            <BarChart data={projectViewsData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis
                                                    dataKey="name"
                                                    tick={{ fontSize: isMobile ? 8 : 10 }}
                                                    interval={0}
                                                    tickFormatter={(value) => (isMobile ? value.substring(0, 8) + '...' : value)}
                                                />
                                                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Legend />
                                                <Bar dataKey="views" fill="#82ca9d" name="Views" />
                                            </BarChart>
                                        </ChartContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="traffic" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Traffic Sources</CardTitle>
                                <CardDescription>Where your visitors come from</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span>Social Media</span>
                                            <span className="font-medium">42%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-blue-500" style={{ width: '42%' }}></div>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Direct</span>
                                            <span className="font-medium">28%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-green-500" style={{ width: '28%' }}></div>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Search Engines</span>
                                            <span className="font-medium">21%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-yellow-500" style={{ width: '21%' }}></div>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Referral</span>
                                            <span className="font-medium">9%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-red-500" style={{ width: '9%' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex h-64 items-center justify-center">
                                        <ChartContainer
                                            config={{
                                                social: { color: '#3b82f6' },
                                                direct: { color: '#22c55e' },
                                                search: { color: '#eab308' },
                                                referral: { color: '#ef4444' },
                                            }}
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: 'Social', value: 42 },
                                                        { name: 'Direct', value: 28 },
                                                        { name: 'Search', value: 21 },
                                                        { name: 'Referral', value: 9 },
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    <Cell fill="#3b82f6" />
                                                    <Cell fill="#22c55e" />
                                                    <Cell fill="#eab308" />
                                                    <Cell fill="#ef4444" />
                                                </Pie>
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                            </PieChart>
                                        </ChartContainer>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Conversion Rate</CardTitle>
                                <CardDescription>From views to contacts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ChartContainer
                                        config={{
                                            contacted: { color: '#8884d8' },
                                            meetings: { color: '#82ca9d' },
                                            hired: { color: '#ffc658' },
                                        }}
                                    >
                                        <PieChart>
                                            <Pie
                                                data={conversionData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={true}
                                                outerRadius={isMobile ? 80 : 120}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {conversionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                        </PieChart>
                                    </ChartContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Most Popular Projects</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {projectViewsData.slice(0, 3).map((project, index) => (
                                            <li key={index} className="flex items-center justify-between">
                                                <span className="font-medium">{project.name}</span>
                                                <span className="text-sm text-gray-600">{project.views} views</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Least Popular Projects</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {projectViewsData.slice(3).map((project, index) => (
                                            <li key={index} className="flex items-center justify-between">
                                                <span className="font-medium">{project.name}</span>
                                                <span className="text-sm text-gray-600">{project.views} views</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
