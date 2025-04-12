"use client";

import SidebarLayout from "@/components/SidebarLayout";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "Yuji Itadori",
    email: "yuji.itadori@example.com",
    fitnessGoals: "Become the strongest sorcerer and maintain a healthy lifestyle.",
    weight: 70,
    height: 173,
    fitnessLevel: "Intermediate",
    workoutHistory: "5 days a week | Strength training and Cursed Energy exercises",
    dietaryAdherence: 85,
  });

  useEffect(() => {
    // Here, you would typically fetch the user data from an API or database.
    // For now, we're using placeholder data.
  }, []);

  return (
    <SidebarLayout>
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
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
                <div className="space-y-2">
                  <Progress value={userData.dietaryAdherence} />
                  <p className="text-sm text-muted-foreground">
                    {userData.dietaryAdherence}% consistent with meal plan
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}

