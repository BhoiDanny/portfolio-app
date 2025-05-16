import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Skill, SlideSheetProps } from '@/types/custom';
import { LoaderCircle } from 'lucide-react';
import { useCallback } from 'react';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';

export default function SlideSheet({
    isOpen,
    setIsOpen,
    title,
    description,
    data,
    categories,
    setData,
    btnTitle,
    className,
    handleSave,
    processing = false,
    handleClose,
    ...props
}: SlideSheetProps<Skill>) {
    const { name, level, category } = data;

    const getSkillLevelText = useCallback(
        (level: number) => {
            if (level < 25) return 'Beginner';
            if (level < 50) return 'Intermediate';
            if (level < 75) return 'Advanced';
            return 'Expert';
        },
        [level],
    );

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} {...props}>
            <SheetContent className={cn('sm:max-w-lg', className)} onInteractOutside={(e) => e.preventDefault()} onCloseAutoFocus={handleClose}>
                <form onSubmit={handleSave}>
                    <SheetHeader>
                        <SheetTitle>{title ? title : 'Add New Skill'}</SheetTitle>
                        <SheetDescription>
                            {description ? description : 'Fill in the details of the new skill.'}
                            {/* {editingSkill ? 'Update your skill details below' : 'Enter the details for your new skill'} */}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="skill-name">
                                Skill Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="skill-name"
                                name="name"
                                value={name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter skill name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="skill-description">Skill Description</Label>
                            <Textarea
                                className="resize-none"
                                id="skill-description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Enter skill description"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="skill-category">Category</Label>
                            <Select name="category" value={category} onValueChange={(v) => setData('category', v)}>
                                <SelectTrigger id="skill-category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories!.data!.length > 0 ? (
                                        categories?.data?.map((category) => (
                                            <SelectItem key={category.id} value={category.slug}>
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="">No categories available</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex justify-between">
                                <Label htmlFor="skill-level">
                                    Skill Level:
                                    {getSkillLevelText(level)} <span className="text-red-500">*</span>
                                </Label>
                                <span className="text-muted-foreground text-sm">{level}%</span>
                            </div>
                            <Slider
                                id="skill-level"
                                min={1}
                                max={100}
                                step={1}
                                name="level"
                                value={[level]}
                                onValueChange={(v) => setData('level', v[0])} // Assuming level is a number
                                // onValueChange={(value) => setNewSkill({ ...newSkill, level: value[0] })}
                            />
                        </div>
                        {/* Published  */}
                        {/* <Switch
                                id="animations"
                                checked={settings.appearance.animations}
                                onCheckedChange={(checked) => handleSwitchChange('appearance', 'animations', checked)}
                            /> */}
                        <div className="grid gap-2">
                            <div className="flex items-center justify-end">
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
                    </div>
                    <SheetFooter>
                        <Button className="mt-3" disabled={processing}>
                            {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                            {btnTitle ? btnTitle : 'Save Skill'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
