'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QuoteProvider } from '@/components/providers/quote-provider';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <QuoteProvider>
                    {children}
                    <Toaster />
                </QuoteProvider>
            </NextThemesProvider>
        </SessionProvider>
    );
}
