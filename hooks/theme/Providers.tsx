'use client'

import { ThemeProvider } from '@/hooks/theme/ThemeContext';
import { useState, useEffect } from 'react';
import { UserProfileProvider } from '../useUserProfile';

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return (
        <ThemeProvider>
            <UserProfileProvider>
                {children}
            </UserProfileProvider>
        </ThemeProvider>
    );
}