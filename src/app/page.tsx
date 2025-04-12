'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import SidebarLayout from "@/components/SidebarLayout";

// Placeholder Cursed Energy Symbol component
const CursedEnergySymbol = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 text-primary animate-pulse" // Added animate-pulse for effect
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.585a3.75 3.75 0 00-5.433 5.434M19.415 8.547a3.75 3.75 0 00-5.433-5.434M6.316 17.684a3.75 3.75 0 005.433 5.434M15.75 14.25a3.75 3.75 0 00-5.433-5.434M4.585 15.453a3.75 3.75 0 015.434 5.433M15.75 9.75a3.75 3.75 0 015.434-5.433"
      clipRule="evenodd"
    />
  </svg>
);

export default function Home() {
  const [userData, setUserData] = useState({
    name: "Yuji Itadori",
    email: "yuji.itadori@example.com",
    cursedEnergyLevel: 85, // Example Cursed Energy Level
    physicalProwess: "High", // Example Physical Prowess
    techniqueMastery: "Intermediate", // Example Technique Mastery
    overallPotential: "Exceptional", // Example Overall Potential
  });

  useEffect(() => {
    // Here, you would typically fetch the user data from an API or database.
    // For now, we're using placeholder data.
  }, []);

  return (
    <SidebarLayout>
      <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-3xl mx-auto bg-card shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col items-center space-y-2 py-6 bg-secondary text-secondary-foreground">
          <CardTitle className="text-3xl font-bold tracking-tight hero-animate">
            Cursed Energy Dashboard
          </CardTitle>
          <p className="text-muted-foreground">Embrace Your Potential, Sorcerer</p>
        </CardHeader>
        <CardContent className="grid gap-6 p-8">
          {/* User Avatar and Information */}
          <div className="flex items-center space-x-6 hero-animate">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://picsum.photos/500/500" alt="User Avatar" className="rounded-full" />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{userData.name}</h2>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
          </div>

          {/* Cursed Energy Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 hero-animate">
            {/* Cursed Energy Level */}
            <div className="flex items-center space-x-4 bg-accent rounded-md p-4">
              <CursedEnergySymbol />
              <div>
                <h3 className="text-lg font-semibold text-accent-foreground">Cursed Energy Level</h3>
                <p className="text-muted-foreground">
                  {userData.cursedEnergyLevel}% <span className="text-sm">(Potential)</span>
                </p>
              </div>
            </div>

            {/* Physical Prowess */}
            <div className="flex items-center space-x-4 bg-accent rounded-md p-4">
              <CursedEnergySymbol />
              <div>
                <h3 className="text-lg font-semibold text-accent-foreground">Physical Prowess</h3>
                <p className="text-muted-foreground">{userData.physicalProwess}</p>
              </div>
            </div>

            {/* Technique Mastery */}
            <div className="flex items-center space-x-4 bg-accent rounded-md p-4">
              <CursedEnergySymbol />
              <div>
                <h3 className="text-lg font-semibold text-accent-foreground">Technique Mastery</h3>
                <p className="text-muted-foreground">{userData.techniqueMastery}</p>
              </div>
            </div>

            {/* Overall Potential */}
            <div className="flex items-center space-x-4 bg-accent rounded-md p-4">
              <CursedEnergySymbol />
              <div>
                <h3 className="text-lg font-semibold text-accent-foreground">Overall Potential</h3>
                <p className="text-muted-foreground">{userData.overallPotential}</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="hero-animate">
            <p className="text-muted-foreground">Ready to push your limits?</p>
            <Link href="/workout">
              <Button className="w-full mt-2">Begin Training Mission</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </SidebarLayout>
  );
}
