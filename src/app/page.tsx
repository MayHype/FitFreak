'use client';

import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from 'react';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  const [userData, setUserData] = useState({
    name: "Yuji Itadori",
    email: "yuji.itadori@example.com",
    fitnessGoals: "Become the strongest sorcerer and maintain a healthy lifestyle.",
    weight: 70,
    height: 173,
    fitnessLevel: "Intermediate",
    workoutHistory: "5 days a week | Strength training and Cursed Energy exercises",
    dietaryAdherence: "85% consistent with meal plan",
  });

  useEffect(() => {
    // Here, you would typically fetch the user data from an API or database.
    // For now, we're using placeholder data.
  }, []);

  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton>Dashboard</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/profile">
                  <SidebarMenuButton>Profile</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
               <Link href="/workout">
                <SidebarMenuButton>Workout Plan</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/meal">
                  <SidebarMenuButton>Meal Plan</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/community">
                  <SidebarMenuButton>Community</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/gym-locator">
                  <SidebarMenuButton>Gym Locator</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarContent className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to Cursed Energy Fitness</h1>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/500/500" alt="User Avatar" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-md font-semibold">Fitness Goals</h3>
                  <p>{userData.fitnessGoals}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold">Progress Metrics</h3>
                  <p>Weight: {userData.weight} kg | Height: {userData.height} cm | Fitness Level: {userData.fitnessLevel}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold">Workout History</h3>
                  <p>{userData.workoutHistory}</p>
                </div>
                 <div>
                  <h3 className="text-md font-semibold">Dietary Adherence</h3>
                  <p>{userData.dietaryAdherence}</p>
                </div>
              </div>
               <div className="mt-4">
                <Link href="/profile">
                  <Button>View Full Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </SidebarContent>
      </div>
    </SidebarProvider>
  );
}

