'use client';

import { Toaster } from "@/components/ui/toaster";
import SidebarLayout from "@/components/SidebarLayout";

interface ClientLayoutProps {
    children: React.ReactNode;
    geistSansVariable: string;
    geistMonoVariable: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
    children,
    geistSansVariable,
    geistMonoVariable
}) => {
    return (
        <body className={`${geistSansVariable} ${geistMonoVariable} antialiased`}>
            <SidebarLayout>
                {children}
                <Toaster />
            </SidebarLayout>
        </body>
    );
};

export default ClientLayout;
