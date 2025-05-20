import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useToast } from './use-toast';

//! Show toast messages if they exist in the flash data

interface UseFlashProps {
    variant?: 'default' | 'destructive';
    title?: string;
}

export const useFlash = (variant?: UseFlashProps['variant'], title?: UseFlashProps['title']): void => {
    const { flash } = usePage<SharedData>().props;
    const { toast } = useToast();

    useEffect(() => {
        if (flash?.error) {
            toast({
                title: title || 'Error occurred',
                description: flash.error,
                variant: variant,
            });

            // Clear flash message immediately after showing it
            flash.error = undefined;
        }
        if (flash?.success) {
            toast({
                title: title || 'Success',
                description: flash.success,
                variant: variant,
            });

            // Clear flash message immediately after showing it
            flash.success = undefined;
        }
    }, [flash, toast]);
};
