'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {useEffect, useState} from "react";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'greek-ext'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'greek-ext'],
});

// export const metadata: Metadata = {
//   title: 'Cursed Energy Fitness',
//   description: 'Unleash Your Inner Sorcerer',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <body>
            {children}
        </body>
        </html>
    );
}
