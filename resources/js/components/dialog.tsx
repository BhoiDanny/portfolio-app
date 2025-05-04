import { cn } from '@/lib/utils';
import FormRow from '@components/form-row';
import TagInput from '@components/taginput';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { useForm } from '@inertiajs/react';
import { CheckedState } from '@radix-ui/react-checkbox';

interface DialogPanelProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    description: string;
    data: any;
    setData: (data: any, value: string) => void;
    btnTitle: string;
    className: string;
}

export const DialogPanel = ({ isOpen, setIsOpen, title, description, data, setData, btnTitle, className }: DialogPanelProps) => {
    useForm();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={cn('max-h-[90vh] overflow-y-auto sm:max-w-[600px]', className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                        {/*{isEditing ? 'Update your project information below.' : 'Fill in the information for your new project.'}*/}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-6 py-4">
                    <FormRow label="Title" required>
                        <Input
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="flex-1"
                            placeholder="Project Title"
                        />
                    </FormRow>

                    <FormRow label="Description" required>
                        <Input
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="flex-1"
                            placeholder="A brief description of the project."
                        />
                    </FormRow>

                    <FormRow label="Details">
                        <Input
                            id="details"
                            name="details"
                            value={data.details}
                            onChange={(e) => setData('details', e.target.value)}
                            className="flex-1"
                            placeholder="Optional: Add any additional details about the project."
                        />
                    </FormRow>

                    <FormRow label="Demo Link">
                        <Input
                            id="demoLink"
                            name="demoLink"
                            value={data.demoLink}
                            onChange={(e) => setData('demoLink', e.target.value)}
                            className="flex-1"
                            placeholder="https://"
                        />
                    </FormRow>

                    <FormRow label="GitHub Link">
                        <Input
                            id="githubLink"
                            name="githubLink"
                            value={data.githubLink}
                            onChange={(e) => setData('githubLink', e.target.value)}
                            className="flex-1"
                            placeholder="https://"
                        />
                    </FormRow>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <label className="text-left sm:w-1/4 sm:text-right">Tags</label>
                        <TagInput tags={data.tags} input={tagInput} setInput={setTagInput} onAdd={handleAddTag} onRemove={handleRemoveTag} />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="text-left sm:w-1/4 sm:text-right">Featured</div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="featured" checked={data.featured} onCheckedChange={(checked) => setData('featured', checked)} />
                            <label htmlFor="featured">Show as featured project</label>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={handleCloseDialog} className="order-2 w-full sm:order-1 sm:w-auto">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveProject} className="order-1 w-full sm:order-2 sm:w-auto">
                        {btnTitle}
                        {/*{isEditing ? 'Save Changes' : 'Create Project'}*/}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
