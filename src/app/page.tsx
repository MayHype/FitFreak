'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from 'react';
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
    
      
        
          
            
              
                <AvatarImage src="https://picsum.photos/500/500" alt="User Avatar" />
                <AvatarFallback>UN</AvatarFallback>
              
              
                
                {userData.email}
              
            
            
              
                
                {userData.fitnessGoals}
              
              
                
                Weight: {userData.weight} kg | Height: {userData.height} cm | Fitness Level: {userData.fitnessLevel}
              
              
                
                {userData.workoutHistory}
              
              
                
                {userData.dietaryAdherence}
              
            
            
              
                View Full Profile
              
            
          
        
      
    
  );
}

