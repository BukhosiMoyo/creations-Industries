import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { constructMetadata } from "@/lib/metadata";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { QuoteProvider } from "@/components/providers/quote-provider";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers/root-providers";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text-primary`}
      >
        <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        <Providers>
          <Suspense fallback={null}>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

