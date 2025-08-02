'use server';
/**
 * @fileOverview A project suggestion AI agent.
 *
 * - suggestProjects - A function that handles the project suggestion process.
 * - SuggestProjectsInput - The input type for the suggestProjects function.
 * - SuggestProjectsOutput - The return type for the suggestProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectsInputSchema = z.object({
  interests: z
    .string()
    .describe("A comma separated list of interests. Example: 'drones, AI, climate tech'."),
});
export type SuggestProjectsInput = z.infer<typeof SuggestProjectsInputSchema>;

const SuggestProjectsOutputSchema = z.object({
  projectTitle: z.string().describe('The title of the suggested project.'),
  tools: z.string().describe('The suggested tools and tech stack for the project.'),
  teamSize: z.string().describe('The recommended team size for the project.'),
  difficulty: z.string().describe('The estimated difficulty of the project (Beginner/Advanced).'),
  timeline: z.string().describe('The estimated timeline for completion of the project.'),
});
export type SuggestProjectsOutput = z.infer<typeof SuggestProjectsOutputSchema>;

export async function suggestProjects(input: SuggestProjectsInput): Promise<SuggestProjectsOutput> {
  return suggestProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectsPrompt',
  input: {schema: SuggestProjectsInputSchema},
  output: {schema: SuggestProjectsOutputSchema},
  prompt: `You are an expert project suggestion agent specializing in providing project ideas based on user interests.

You will use the interests provided by the user to suggest a project that matches their skills and interests.

Interests: {{{interests}}}

You should fill out all of the output fields with realistic suggestions.
`,
});

const suggestProjectsFlow = ai.defineFlow(
  {
    name: 'suggestProjectsFlow',
    inputSchema: SuggestProjectsInputSchema,
    outputSchema: SuggestProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
