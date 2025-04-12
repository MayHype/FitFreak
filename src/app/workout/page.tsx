'use client';

import SidebarLayout from "@/components/SidebarLayout";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {generateWorkoutPlan, GenerateWorkoutPlanInput, GenerateWorkoutPlanOutput} from '@/ai/flows/generate-workout-plan';
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
    fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('Fitness Level'),
    weight: z.number().min(1, { message: "Weight must be greater than 0." }).describe('Weight (kg)'),
    height: z.number().min(1, { message: "Height must be greater than 0." }).describe('Height (cm)'),
})

export default function WorkoutPage() {
    const [workoutPlan, setWorkoutPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fitnessLevel: "beginner",
            weight: 0,
            height: 0,
        },
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const workoutPlanResult: GenerateWorkoutPlanOutput = await generateWorkoutPlan(values as GenerateWorkoutPlanInput);
            setWorkoutPlan(workoutPlanResult.workoutPlan);
            toast({
                title: "Workout plan generated",
                description: "Your personalized workout plan is ready!",
            });
        } catch (error) {
            console.error("Error generating workout plan:", error);
            setWorkoutPlan("Failed to generate workout plan. Please try again.");
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to generate workout plan. Please try again.",
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
                        <CardTitle className="text-2xl font-bold">Workout Plan Generator</CardTitle>
                        <CardDescription>
                            Customize your workout plan to achieve your fitness goals.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="fitnessLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fitness Level</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a fitness level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="beginner">Beginner</SelectItem>
                                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                                    <SelectItem value="advanced">Advanced</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    Generate Workout Plan
                                </Button>
                            </form>
                        </Form>
                        {isLoading ? (
                            <div className="mt-4">
                                <h3 className="text-md font-semibold">Generating Workout Plan:</h3>
                                <Skeleton className="h-20 w-full" />
                            </div>
                        ) : (workoutPlan && (
                            <div className="mt-4 transition-opacity duration-500">
                                <h3 className="text-md font-semibold">Generated Workout Plan:</h3>
                                <p>{workoutPlan}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </SidebarLayout>
    );
}
