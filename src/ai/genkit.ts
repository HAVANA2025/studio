
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Initialize Genkit with plugins directly. This is the correct syntax for v1.x.
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  logSinks: [], // Disable default logging
  enableTracing: false,
});

export { ai };
