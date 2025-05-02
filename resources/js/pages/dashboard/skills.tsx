import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skill, skills } from '@/data/portfolio-mock-data';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Edit, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Skills() {
    const [userSkills, setUserSkills] = useState<Skill[]>(skills);
    const [openSheet, setOpenSheet] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [newSkill, setNewSkill] = useState<Skill>({
        name: '',
        level: 50,
        category: 'frontend',
    });

    const handleSaveSkill = () => {
        if (editingSkill) {
            setUserSkills(userSkills.map((skill) => (skill.name === editingSkill.name ? newSkill : skill)));
        } else {
            setUserSkills([...userSkills, newSkill]);
        }

        setOpenSheet(false);
        setEditingSkill(null);
        setNewSkill({
            name: '',
            level: 50,
            category: 'frontend',
        });
    };

    const startEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setNewSkill({ ...skill });
        setOpenSheet(true);
    };

    const startAddNew = () => {
        setEditingSkill(null);
        setNewSkill({
            name: '',
            level: 50,
            category: 'frontend',
        });
        setOpenSheet(true);
    };

    const deleteSkill = (skillName: string) => {
        setUserSkills(userSkills.filter((skill) => skill.name !== skillName));
    };

    const getSkillLevelText = (level: number) => {
        if (level < 25) return 'Beginner';
        if (level < 50) return 'Intermediate';
        if (level < 75) return 'Advanced';
        return 'Expert';
    };

    return (
        <DashboardLayout title="Skills Management">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Skills Management</h2>
                    <Button onClick={startAddNew} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Skill
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Skills</CardTitle>
                        <CardDescription>Manage your professional skills and expertise levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Skill</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userSkills.map((skill) => (
                                        <TableRow key={skill.name}>
                                            <TableCell className="font-medium">{skill.name}</TableCell>
                                            <TableCell className="capitalize">{skill.category}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-muted h-2 w-24 overflow-hidden rounded-full">
                                                        <div className="bg-primary h-full rounded-full" style={{ width: `${skill.level}%` }}></div>
                                                    </div>
                                                    <span className="text-muted-foreground text-xs">{getSkillLevelText(skill.level)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => startEdit(skill)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => deleteSkill(skill.name)}>
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
                    <SheetContent className="sm:max-w-lg">
                        <SheetHeader>
                            <SheetTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</SheetTitle>
                            <SheetDescription>
                                {editingSkill ? 'Update your skill details below' : 'Enter the details for your new skill'}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="skill-name">Skill Name</Label>
                                <Input id="skill-name" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="skill-category">Category</Label>
                                <Select
                                    value={newSkill.category}
                                    onValueChange={(value) =>
                                        setNewSkill({
                                            ...newSkill,
                                            category: value as 'frontend' | 'backend' | 'tools' | 'other',
                                        })
                                    }
                                >
                                    <SelectTrigger id="skill-category">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="frontend">Frontend</SelectItem>
                                        <SelectItem value="backend">Backend</SelectItem>
                                        <SelectItem value="tools">Tools</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="skill-level">Skill Level: {getSkillLevelText(newSkill.level)}</Label>
                                    <span className="text-muted-foreground text-sm">{newSkill.level}%</span>
                                </div>
                                <Slider
                                    id="skill-level"
                                    min={1}
                                    max={100}
                                    step={1}
                                    value={[newSkill.level]}
                                    onValueChange={(value) => setNewSkill({ ...newSkill, level: value[0] })}
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <Button onClick={handleSaveSkill}>Save</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </DashboardLayout>
    );
}
