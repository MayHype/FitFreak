
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Toaster} from "@/components/ui/toaster";
import SidebarLayout from "@/components/SidebarLayout";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'greek-ext'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'greek-ext'],
});

export const metadata: Metadata = {
  title: 'Cursed Energy Fitness',
  description: 'Unleash Your Inner Sorcerer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <body>
            <SidebarLayout>
                {children}
                <Toaster/>
            </SidebarLayout>
        </body>
        </html>
    );
}
