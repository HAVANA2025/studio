'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { configureGenkit } from 'genkit';

configureGenkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  logSinks: [], // Disable default logging
  enableTracing: false,
});

export { ai } from 'genkit';
