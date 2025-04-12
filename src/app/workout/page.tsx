'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {generateWorkoutPlan, GenerateWorkoutPlanInput, GenerateWorkoutPlanOutput} from '@/ai/flows/generate-workout-plan';

export default function WorkoutPage() {
  const [workoutPlan, setWorkoutPlan] = useState<string | null>(null);
   const [formData, setFormData] = useState<GenerateWorkoutPlanInput>({
    fitnessLevel: "beginner",
    weight: 0,
    height: 0,
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
      const workoutPlanResult: GenerateWorkoutPlanOutput = await generateWorkoutPlan(formData);
      setWorkoutPlan(workoutPlanResult.workoutPlan);
    } catch (error) {
      console.error("Error generating workout plan:", error);
      setWorkoutPlan("Failed to generate workout plan. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Workout Plan Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fitnessLevel">Fitness Level</Label>
              <Select value={formData.fitnessLevel} onValueChange={(value) => setFormData({ ...formData, fitnessLevel: value as any })}>
                <SelectTrigger id="fitnessLevel">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
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
            <Button type="submit">Generate Workout Plan</Button>
          </form>
          {workoutPlan && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Generated Workout Plan:</h3>
              <p>{workoutPlan}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
