'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing tourism trends.
 *
 * - analyzeTourismTrends -  Analyzes tourism data to identify trends and forecast future performance.
 * - AnalyzeTourismTrendsInput - The input type for the analyzeTourismTrends function.
 * - AnalyzeTourismTrendsOutput - The return type for the analyzeTourismTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTourismTrendsInputSchema = z.object({
  tourismData: z.string().describe('A stringified JSON array of tourism data records.'),
});
export type AnalyzeTourismTrendsInput = z.infer<typeof AnalyzeTourismTrendsInputSchema>;

const AnalyzeTourismTrendsOutputSchema = z.object({
  trendAnalysis: z.string().describe('A summary of identified trends in the tourism data.'),
  forecast: z.string().describe('A forecast of future tourism performance based on the trends.'),
});
export type AnalyzeTourismTrendsOutput = z.infer<typeof AnalyzeTourismTrendsOutputSchema>;

export async function analyzeTourismTrends(input: AnalyzeTourismTrendsInput): Promise<AnalyzeTourismTrendsOutput> {
  return analyzeTourismTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTourismTrendsPrompt',
  input: {schema: AnalyzeTourismTrendsInputSchema},
  output: {schema: AnalyzeTourismTrendsOutputSchema},
  prompt: `You are an expert in tourism data analysis. Analyze the provided tourism data to identify key trends and forecast future performance.

Tourism Data: {{{tourismData}}}

Identify any significant trends, patterns, and insights from the data. Then, based on these trends, forecast future tourism performance. Consider seasonality, growth, decline, and any other relevant factors.

Format your response as a JSON object with 'trendAnalysis' and 'forecast' fields. The 'trendAnalysis' should summarize the identified trends, and the 'forecast' should provide a prediction of future tourism performance.
`,
});

const analyzeTourismTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeTourismTrendsFlow',
    inputSchema: AnalyzeTourismTrendsInputSchema,
    outputSchema: AnalyzeTourismTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
