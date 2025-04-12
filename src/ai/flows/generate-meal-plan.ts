'use server';
/**
 * @fileOverview A meal plan generation AI agent.
 *
 * - generateMealPlan - A function that handles the meal plan generation process.
 * - GenerateMealPlanInput - The input type for the generateMealPlan function.
 * - GenerateMealPlanOutput - The return type for the generateMealPlan function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateMealPlanInputSchema = z.object({
  dietaryPreferences: z.string().describe('The dietary preferences of the user (e.g., vegetarian, vegan, gluten-free).'),
  fitnessGoals: z.string().describe('The fitness goals of the user (e.g., weight loss, muscle gain, general fitness).'),
  weight: z.number().describe('The weight of the user in kilograms.'),
  height: z.number().describe('The height of the user in centimeters.'),
  age: z.number().describe('The age of the user in years.'),
  gender: z.enum(['male', 'female']).describe('The gender of the user.'),
  activityLevel: z
    .enum(['sedentary', 'lightly active', 'moderately active', 'very active', 'extra active'])
    .describe('The activity level of the user.'),
});
export type GenerateMealPlanInput = z.infer<typeof GenerateMealPlanInputSchema>;

const GenerateMealPlanOutputSchema = z.object({
  mealPlan: z.string().describe('A personalized meal plan based on the user input, structured with day-wise breakdown for breakfast, lunch, dinner and snacks.'),
});
export type GenerateMealPlanOutput = z.infer<typeof GenerateMealPlanOutputSchema>;

export async function generateMealPlan(input: GenerateMealPlanInput): Promise<GenerateMealPlanOutput> {
  try {
    return await generateMealPlanFlow(input);
  } catch (error: any) {
    console.error('Error in generateMealPlan:', error);
    return {
      mealPlan: 'An error occurred while generating the meal plan. Please try again later.',
    };
  }
}

const prompt = ai.definePrompt({
  name: 'generateMealPlanPrompt',
  input: {
    schema: z.object({
      dietaryPreferences: z.string().describe('The dietary preferences of the user (e.g., vegetarian, vegan, gluten-free).'),
      fitnessGoals: z.string().describe('The fitness goals of the user (e.g., weight loss, muscle gain, general fitness).'),
      weight: z.number().describe('The weight of the user in kilograms.'),
      height: z.number().describe('The height of the user in centimeters.'),
      age: z.number().describe('The age of the user in years.'),
      gender: z.enum(['male', 'female']).describe('The gender of the user.'),
      activityLevel:
        z.enum(['sedentary', 'lightly active', 'moderately active', 'very active', 'extra active']),
    }),
  },
  output: {
    schema: z.object({
      mealPlan: z.string().describe('A personalized meal plan based on the user input, structured with day-wise breakdown for breakfast, lunch, dinner and snacks.'),
    }),
  },
  prompt: `You are a personal trainer and dietician. Based on the user's dietary preferences, fitness goals, weight, height, age, gender, and activity level, generate a personalized meal plan. The meal plan MUST be structured as a day-wise breakdown, including specific suggestions for breakfast, lunch, dinner, and snacks for each day.

Dietary Preferences: {{{dietaryPreferences}}}
Fitness Goals: {{{fitnessGoals}}}
Weight (kg): {{{weight}}}
Height (cm): {{{height}}}
Age: {{{age}}}
Gender: {{{gender}}}
Activity Level: {{{activityLevel}}}

Meal Plan:
`,
});

const generateMealPlanFlow = ai.defineFlow<
  typeof GenerateMealPlanInputSchema,
  typeof GenerateMealPlanOutputSchema
>(
  {
    name: 'generateMealPlanFlow',
    inputSchema: GenerateMealPlanInputSchema,
    outputSchema: GenerateMealPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
