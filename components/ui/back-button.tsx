"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface BackButtonProps {
    className?: string;
    label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className, label = "Back" }) => {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            className={cn(
                "group flex items-center gap-2 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors p-0 w-fit",
                className
            )}
            onClick={() => router.back()}
        >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="font-medium text-lg">{label}</span>
        </Button>
    );
};

export default BackButton;
