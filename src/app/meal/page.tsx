'use client';

import SidebarLayout from "@/components/SidebarLayout";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {generateMealPlan, GenerateMealPlanInput, GenerateMealPlanOutput} from '@/ai/flows/generate-meal-plan';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    dietaryPreferences: z.string().optional().describe('Dietary Preferences'),
    fitnessGoals: z.string().optional().describe('Fitness Goals'),
    weight: z.number().min(1, { message: "Weight must be greater than 0." }).describe('Weight (kg)'),
    height: z.number().min(1, { message: "Height must be greater than 0." }).describe('Height (cm)'),
    age: z.number().min(1, { message: "Age must be greater than 0." }).describe('Age'),
    gender: z.enum(['male', 'female']).describe('Gender'),
    activityLevel: z.enum(['sedentary', 'lightly active', 'moderately active', 'very active', 'extra active']).describe('Activity Level'),
})

export default function MealPage() {
    const [mealPlan, setMealPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dietaryPreferences: "",
            fitnessGoals: "",
            weight: 0,
            height: 0,
            age: 0,
            gender: "male",
            activityLevel: "sedentary",
        },
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const mealPlanResult: GenerateMealPlanOutput = await generateMealPlan(values as GenerateMealPlanInput);
            setMealPlan(mealPlanResult.mealPlan);
            toast({
                title: "Meal plan generated",
                description: "Your personalized meal plan is ready!",
            });
        } catch (error) {
            console.error("Error generating meal plan:", error);
            setMealPlan("Failed to generate meal plan. Please try again.");
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to generate meal plan. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SidebarLayout>
            <div className="container mx-auto py-10">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold hero-animate">Meal Plan Generator</CardTitle>
                        <CardDescription>
                            Customize your meal plan to achieve your fitness goals.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="dietaryPreferences"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dietary Preferences</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Vegetarian, Vegan" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Specify any dietary preferences you have.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fitnessGoals"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fitness Goals</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Weight Loss, Muscle Gain" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Specify your fitness goals.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weight (kg)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter your weight"  {...field}  value={field.value === 0 ? '' : field.value} onChange={(e) => {
                                                    field.onChange(Number(e.target.value));
                                                }}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="height"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Height (cm)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter your height" {...field} value={field.value === 0 ? '' : field.value} onChange={(e) => {
                                                    field.onChange(Number(e.target.value));
                                                }}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Age</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter your age" {...field} value={field.value === 0 ? '' : field.value} onChange={(e) => {
                                                    field.onChange(Number(e.target.value));
                                                }}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="activityLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Activity Level</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="sedentary">Sedentary</SelectItem>
                                                    <SelectItem value="lightly active">Lightly Active</SelectItem>
                                                    <SelectItem value="moderately active">Moderately Active</SelectItem>
                                                    <SelectItem value="very active">Very Active</SelectItem>
                                                    <SelectItem value="extra active">Extra Active</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isLoading} className="w-full">Generate Meal Plan</Button>
                            </form>
                        </Form>
                        {isLoading ? (
                            <div className="mt-4">
                                <h3 className="text-md font-semibold">Generating Meal Plan:</h3>
                                <Skeleton className="h-20 w-full" />
                            </div>
                        ) : (mealPlan && (
                            <div className="mt-4 transition-opacity duration-500">
                                <h3 className="text-md font-semibold">Generated Meal Plan:</h3>
                                <p>{mealPlan}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </SidebarLayout>
    );
}
