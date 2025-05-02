import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Experience, experiences } from '@/data/portfolio-mock-data';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Edit, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Experiences() {
    const [userExperiences, setUserExperiences] = useState<Experience[]>(experiences);
    const [openSheet, setOpenSheet] = useState(false);
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
    const [newExperience, setNewExperience] = useState<Experience>({
        id: '',
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: null,
        description: '',
        achievements: [''],
    });

    const handleSaveExperience = () => {
        if (editingExperience) {
            setUserExperiences(userExperiences.map((exp) => (exp.id === editingExperience.id ? newExperience : exp)));
        } else {
            const id = Date.now().toString();
            setUserExperiences([...userExperiences, { ...newExperience, id }]);
        }

        setOpenSheet(false);
        setEditingExperience(null);
        setNewExperience({
            id: '',
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: null,
            description: '',
            achievements: [''],
        });
    };

    const startEdit = (experience: Experience) => {
        setEditingExperience(experience);
        setNewExperience({ ...experience });
        setOpenSheet(true);
    };

    const startAddNew = () => {
        setEditingExperience(null);
        setNewExperience({
            id: '',
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: null,
            description: '',
            achievements: [''],
        });
        setOpenSheet(true);
    };

    const deleteExperience = (experienceId: string) => {
        setUserExperiences(userExperiences.filter((exp) => exp.id !== experienceId));
    };

    const addAchievement = () => {
        setNewExperience({
            ...newExperience,
            achievements: [...newExperience.achievements, ''],
        });
    };

    const updateAchievement = (index: number, value: string) => {
        const updatedAchievements = [...newExperience.achievements];
        updatedAchievements[index] = value;
        setNewExperience({
            ...newExperience,
            achievements: updatedAchievements,
        });
    };

    const removeAchievement = (index: number) => {
        const updatedAchievements = newExperience.achievements.filter((_, i) => i !== index);
        setNewExperience({
            ...newExperience,
            achievements: updatedAchievements,
        });
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Present';
        try {
            const [year, month] = dateString.split('-');
            return `${month}/${year}`;
        } catch (error) {
            return dateString;
        }
    };

    return (
        <DashboardLayout title="Experience Management">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Experience Management</h2>
                    <Button onClick={startAddNew} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Experience
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription>Manage your professional work history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userExperiences.map((experience) => (
                                        <TableRow key={experience.id}>
                                            <TableCell className="font-medium">{experience.title}</TableCell>
                                            <TableCell>{experience.company}</TableCell>
                                            <TableCell>
                                                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                                            </TableCell>
                                            <TableCell>{experience.location}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => startEdit(experience)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => deleteExperience(experience.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <SheetContent className="max-w-2xl overflow-y-auto sm:max-w-2xl">
                        <SheetHeader>
                            <SheetTitle>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</SheetTitle>
                            <SheetDescription>
                                {editingExperience ? 'Update your work experience details below' : 'Enter the details for your new work experience'}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="job-title">Job Title</Label>
                                <Input
                                    id="job-title"
                                    value={newExperience.title}
                                    onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    value={newExperience.company}
                                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={newExperience.location}
                                    onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="start-date">Start Date (MM/YYYY)</Label>
                                    <Input
                                        id="start-date"
                                        type="month"
                                        value={newExperience.startDate}
                                        onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="end-date">End Date (MM/YYYY)</Label>
                                    <Input
                                        id="end-date"
                                        type="month"
                                        value={newExperience.endDate || ''}
                                        onChange={(e) =>
                                            setNewExperience({
                                                ...newExperience,
                                                endDate: e.target.value || null,
                                            })
                                        }
                                        placeholder="Present"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Job Description</Label>
                                <Textarea
                                    id="description"
                                    value={newExperience.description}
                                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label>Achievements</Label>
                                    <Button type="button" variant="outline" size="sm" onClick={addAchievement}>
                                        Add Achievement
                                    </Button>
                                </div>

                                {newExperience.achievements.map((achievement, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={achievement}
                                            onChange={(e) => updateAchievement(index, e.target.value)}
                                            placeholder={`Achievement ${index + 1}`}
                                        />
                                        {newExperience.achievements.length > 1 && (
                                            <Button type="button" variant="destructive" size="sm" onClick={() => removeAchievement(index)}>
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SheetFooter className="mt-4">
                            <Button onClick={handleSaveExperience}>Save</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </DashboardLayout>
    );
}
