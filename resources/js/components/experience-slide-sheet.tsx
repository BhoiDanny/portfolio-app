import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { cn, formatDateTime } from '@/lib/utils';
import { Experience, SlideSheetProps } from '@/types/custom';
import { LoaderCircle, Trash2Icon, TrashIcon } from 'lucide-react';
import { useRef } from 'react';
import { Switch } from './ui/switch';

export default function ExperienceSlideSheet({
    isOpen,
    setIsOpen,
    title,
    description,
    data,
    setData,
    btnTitle,
    className,
    handleSave,
    processing = false,
    handleClose,
    ...props
}: SlideSheetProps<Experience>) {
    const imgRef = useRef<HTMLInputElement>(null);
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} {...props}>
            <SheetContent
                className={cn('max-w-2xl overflow-y-auto sm:max-w-2xl', className)}
                onInteractOutside={(e) => e.preventDefault()}
                onCloseAutoFocus={handleClose}
            >
                <form onSubmit={handleSave}>
                    <SheetHeader>
                        <SheetTitle>
                            {title || 'Add New Experience'}
                            {/* {editingExperience ? 'Edit Experience' : 'Add New Experience'}\ */}
                        </SheetTitle>
                        <SheetDescription>
                            {description || 'Enter the details for your work experience'}
                            {/* {editingExperience ? 'Update your work experience details below' : 'Enter the details for your new work experience'} */}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="job-title">
                                Job Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="job-title"
                                name="job_title"
                                value={data.job_title}
                                onChange={(e) => setData('job_title', e.target.value)}
                                placeholder="e.g. Software Engineer"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="company">
                                Company <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="company"
                                name="company"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                placeholder="e.g. Google"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="job-type">
                                Experience Type <span className="text-red-500">*</span>
                            </Label>
                            <Select name="job_type" value={data.type} onValueChange={(v) => setData('type', v)}>
                                <SelectTrigger id="skill-category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="job">Job</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                    <SelectItem value="volunteer">Volunteer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                placeholder="e.g. San Francisco, CA"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="website">Company Website</Label>
                            <Input
                                id="website"
                                name="website"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                placeholder="e.g. https://www.google.com"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start-date">
                                    Start Date (MM/YYYY) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="start-date"
                                    name="start_date"
                                    type="month"
                                    value={formatDateTime(data.start_date)}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    placeholder="e.g. 01/2022"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end-date">End Date (MM/YYYY)</Label>
                                <Input
                                    id="end-date"
                                    name="end_date"
                                    type="month"
                                    value={formatDateTime(data.end_date || null)}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    // onChange={(e) =>
                                    //     setNewExperience({
                                    //         ...newExperience,
                                    //         endDate: e.target.value || null,
                                    //     })
                                    // }
                                    placeholder="Present"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Job Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description || ''}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                placeholder="e.g. Developed and maintained web applications using React and Node.js"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="logo">Company Logo</Label>
                            <Input
                                ref={imgRef}
                                id="logo"
                                name="logo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setData('logo', file);
                                    }
                                }}
                                value={undefined} // Prevents the input from showing the file name
                            />
                            {data.logo && (
                                <div className="relative mt-3 flex h-24 w-24 items-center justify-center rounded-md">
                                    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-md">
                                        <img
                                            src={typeof data.logo === 'string' ? data.logo : URL.createObjectURL(data.logo)}
                                            alt="Company Logo"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <Button
                                        className="absolute top-[-15px] right-[-15px] h-8 w-8 rounded-full bg-red-400 p-2 text-white hover:bg-white hover:text-red-500"
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        title="Remove Logo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setData('logo', null!);
                                            if (imgRef.current) {
                                                imgRef.current.value = null!;
                                            }
                                        }}
                                    >
                                        <Trash2Icon className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="mt-4 flex items-center justify-start">
                                <Label htmlFor="published" className="mr-3 text-sm">
                                    Published
                                </Label>
                                <Switch
                                    id="published"
                                    name="published"
                                    checked={data.published}
                                    onCheckedChange={(checked) => setData('published', checked)}
                                    // checked={settings.appearance.animations}
                                    // onCheckedChange={(checked) => handleSwitchChange('appearance', 'animations', checked)}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label>Achievements</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const updatedAchievements = [...(data.achievements || []), ''];
                                        setData('achievements', updatedAchievements);
                                    }}
                                >
                                    Add Achievement
                                </Button>
                            </div>

                            {data.achievements?.map((achievement, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={achievement}
                                        onChange={(e) => {
                                            const updatedAchievements = [...data.achievements!];
                                            updatedAchievements[index] = e.target.value;
                                            setData('achievements', updatedAchievements);
                                        }}
                                        // onChange={(e) => updateAchievement(index, e.target.value)}
                                        placeholder={`Achievement ${index + 1}`}
                                    />
                                    {data.achievements!.length > 1 && (
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            title="Remove Achievement"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const updatedAchievements = [...data.achievements!];
                                                updatedAchievements.splice(index, 1);
                                                setData('achievements', updatedAchievements);
                                            }}
                                        >
                                            <TrashIcon className="h-4 w-4 text-red-500" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <SheetFooter className="mt-4">
                        <Button className="mt-3" disabled={processing}>
                            {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                            {btnTitle || 'Save Experience'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
