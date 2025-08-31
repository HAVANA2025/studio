'use server';
/**
 * @fileOverview An AI flow to generate project ideas based on user interests.
 *
 * - suggestProject - A function that generates project ideas.
 * - ProjectSuggesterInput - The input type for the suggestProject function.
 * - ProjectSuggesterOutput - The return type for the suggestProject function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { gemini15Flash } from '@genkit-ai/googleai';

// Define Zod schemas for input and output
const ProjectSuggesterInputSchema = z.object({
  interests: z.string().describe('A comma-separated or natural language list of user interests.'),
});
export type ProjectSuggesterInput = z.infer<typeof ProjectSuggesterInputSchema>;

const ProjectIdeaSchema = z.object({
  title: z.string().describe('A catchy and descriptive title for the project.'),
  description: z.string().describe('A brief, one or two sentence description of the project idea.'),
  isHardware: z.boolean().describe('Set to true if the project primarily involves hardware, IoT, or physical components. Otherwise, set to false.'),
  technologies: z.array(z.string()).describe('A list of 3 to 5 key technologies or frameworks relevant to the project.'),
});
export type ProjectIdea = z.infer<typeof ProjectIdeaSchema>;

const ProjectSuggesterOutputSchema = z.object({
  ideas: z.array(ProjectIdeaSchema).describe('An array of 3 unique project ideas.'),
});
export type ProjectSuggesterOutput = z.infer<typeof ProjectSuggesterOutputSchema>;

// Define the Genkit prompt
const projectSuggesterPrompt = ai.definePrompt({
  name: 'projectSuggesterPrompt',
  model: gemini15Flash,
  input: { schema: ProjectSuggesterInputSchema },
  output: { schema: ProjectSuggesterOutputSchema },
  prompt: `
    You are an expert mentor at a university tech club, skilled at inspiring students with exciting project ideas.
    Based on the user's interests, generate 3 unique and creative project ideas.
    For each idea, provide a title, a short description, specify if it's primarily a hardware or software project, and list a few key technologies.
    The user's interests are: {{{interests}}}
  `,
});


// Define the Genkit flow
const suggestProjectFlow = ai.defineFlow(
  {
    name: 'suggestProjectFlow',
    inputSchema: ProjectSuggesterInputSchema,
    outputSchema: ProjectSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await projectSuggesterPrompt(input);
    if (!output) {
      throw new Error('The AI model did not return any output.');
    }
    return output;
  }
);

// Export a wrapper function to be called from the client
export async function suggestProject(input: ProjectSuggesterInput): Promise<ProjectSuggesterOutput> {
  return await suggestProjectFlow(input);
}
