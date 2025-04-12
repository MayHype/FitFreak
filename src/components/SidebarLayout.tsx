
'use client';

import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from 'next/link';
import {useEffect, useState} from "react";
import { usePathname } from 'next/navigation';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

  return (
    <SidebarProvider>
      <div className="flex fade-in">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/" passHref>
                  <SidebarMenuButton isActive={pathname === '/'}>Dashboard</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/profile" passHref>
                  <SidebarMenuButton isActive={pathname === '/profile'}>Profile</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/workout" passHref>
                  <SidebarMenuButton isActive={pathname === '/workout'}>Workout Plan</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/meal" passHref>
                  <SidebarMenuButton isActive={pathname === '/meal'}>Meal Plan</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/community" passHref>
                  <SidebarMenuButton isActive={pathname === '/community'}>Community</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/gym-locator" passHref>
                  <SidebarMenuButton isActive={pathname === '/gym-locator'}>Gym Locator</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/login" passHref>
                  <SidebarMenuButton>Logout</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        {isMounted ? <div className="fade-in">{children}</div> : null}
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
