import SidebarLayout from "@/components/SidebarLayout";

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {generateMealPlan, GenerateMealPlanInput, GenerateMealPlanOutput} from '@/ai/flows/generate-meal-plan';

export default function MealPage() {
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState<GenerateMealPlanInput>({
    dietaryPreferences: "",
    fitnessGoals: "",
    weight: 0,
    height: 0,
    age: 0,
    gender: "male",
    activityLevel: "sedentary",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const mealPlanResult: GenerateMealPlanOutput = await generateMealPlan(formData);
      setMealPlan(mealPlanResult.mealPlan);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      setMealPlan("Failed to generate meal plan. Please try again.");
    }
  };

  return (
    <SidebarLayout>
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Meal Plan Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                <Input
                  type="text"
                  id="dietaryPreferences"
                  placeholder="e.g., Vegetarian, Vegan"
                  value={formData.dietaryPreferences}
                  onChange={handleChange as any}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fitnessGoals">Fitness Goals</Label>
                <Input
                  type="text"
                  id="fitnessGoals"
                  placeholder="e.g., Weight Loss, Muscle Gain"
                  value={formData.fitnessGoals}
                  onChange={handleChange as any}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  placeholder="Enter your weight"
                  value={formData.weight}
                  onChange={handleChange as any}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  type="number"
                  id="height"
                  placeholder="Enter your height"
                  value={formData.height}
                  onChange={handleChange as any}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  type="number"
                  id="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange as any}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value as any })}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select value={formData.activityLevel} onValueChange={(value) => setFormData({ ...formData, activityLevel: value as any })}>
                  <SelectTrigger id="activityLevel">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="lightly active">Lightly Active</SelectItem>
                    <SelectItem value="moderately active">Moderately Active</SelectItem>
                    <SelectItem value="very active">Very Active</SelectItem>
                    <SelectItem value="extra active">Extra Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Generate Meal Plan</Button>
            </form>
            {mealPlan && (
              <div className="mt-4">
                <h3 className="text-md font-semibold">Generated Meal Plan:</h3>
                <p>{mealPlan}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
