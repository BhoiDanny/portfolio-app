import FormRow from '@/components/form-row';
import TagInput from '@/components/taginput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { FormEventHandler, useCallback, useState } from 'react';

type DataType = {
    title: string;
    description: string;
    image: null | string | File;
    tags: string[];
    featured: boolean;
    details: string;
    demoLink: string;
    githubLink: string;
};

interface DialogPanelProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    data: DataType;
    setData: (data: string, value: string | string[] | boolean | number | File) => void;
    handleClose: () => void;
    handleSave: FormEventHandler<HTMLFormElement>;
    description?: string;
    title?: string;
    btnTitle?: string;
    className?: string;
    processing?: boolean;
}

export const DialogPanel = ({
    isOpen,
    setIsOpen,
    title,
    description,
    data,
    setData,
    btnTitle,
    className,
    handleSave,
    handleClose,
    processing = false,
    ...props
}: DialogPanelProps) => {
    const [tagInput, setTagInput] = useState('');

    const { toast } = useToast();

    const handleAddTag = useCallback(() => {
        if (!tagInput.trim()) return;
        if (data?.tags?.includes(tagInput.trim())) {
            toast({
                title: 'Tag Already Exists',
                description: 'This tag is already added to the project.',
            });
            return;
        }
        setData('tags', [...data.tags, tagInput.trim()]);
        setTagInput('');
    }, [data.tags, setData, tagInput, toast]);

    const handleRemoveTag = useCallback(
        (tagToRemove: string) => {
            setData(
                'tags',
                data.tags.filter((tag) => tag !== tagToRemove),
            );
        },
        [data.tags, setData],
    );

    const handleCloseDialog = () => {
        handleClose();
        setTagInput('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
            <DialogContent className={cn('max-h-[90vh] overflow-y-auto sm:max-w-[600px]', className)} onInteractOutside={handleCloseDialog}>
                <form onSubmit={handleSave} encType="multipart/form-data">
                    <DialogHeader>
                        <DialogTitle>{title ? title : 'Create New Project'}</DialogTitle>
                        <DialogDescription>{description ? description : 'Fill in the information for your new project.'}</DialogDescription>
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
                        <FormRow htmlFor="image" label="Image">
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="flex-1"
                                onChange={(e) => setData('image', e.target.files![0])}
                                placeholder="Upload an image"
                                value={undefined} // Prevents the input from showing the file name
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

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <label className="text-left sm:w-1/4 sm:text-right">Tags</label>
                            <TagInput tags={data.tags} input={tagInput} setInput={setTagInput} onAdd={handleAddTag} onRemove={handleRemoveTag} />
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="text-left sm:w-1/4 sm:text-right">Featured</div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="featured" checked={data.featured} onCheckedChange={(c) => setData('featured', c as boolean)} />
                                <label htmlFor="featured">Show as featured project</label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                        <Button type="button" variant="outline" onClick={handleCloseDialog} className="order-2 w-full sm:order-1 sm:w-auto">
                            Cancel
                        </Button>
                        <Button className="order-1 w-full sm:order-2 sm:w-auto" type="submit" disabled={processing}>
                            {btnTitle ? btnTitle : 'Create Project'}
                            {/*{isEditing ? 'Save Changes' : 'Create Project'}*/}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
