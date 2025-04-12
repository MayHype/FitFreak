
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function MealPage() {
  const [mealPlan, setMealPlan] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for AI integration
    setMealPlan("AI Generated Meal Plan will be displayed here.");
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Meal Plan Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
              <Input type="text" id="dietaryPreferences" placeholder="e.g., Vegetarian, Vegan" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fitnessGoals">Fitness Goals</Label>
              <Input type="text" id="fitnessGoals" placeholder="e.g., Weight Loss, Muscle Gain" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input type="number" id="weight" placeholder="Enter your weight" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input type="number" id="height" placeholder="Enter your height" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input type="number" id="age" placeholder="Enter your age" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
               <Select>
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
               <Select>
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
  );
}
