import { KeyboardEventHandler } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TagInputProps {
    tags: string[];
    input: string | [];
    setInput: (value: string) => void;
    onAdd: () => void;
    onRemove: (tag: string) => void;
}

export default function TagInput({ tags, onAdd, onRemove, input, setInput }: TagInputProps) {
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAdd();
        }
    };

    return (
        <div className="space-y-2">
            <div className="mb-2 flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => onRemove(tag)} className="ml-1 rounded-full text-gray-400 hover:text-gray-700" type="button">
                            ×
                        </button>
                    </Badge>
                ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag"
                    className="flex-1"
                />
                <Button onClick={onAdd} type="button" variant="secondary">
                    Add
                </Button>
            </div>
        </div>
    );
}
