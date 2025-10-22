'use server';

/**
 * @fileOverview This file defines a Genkit flow for forecasting tourism performance based on identified trends and various factors.
 *
 * It includes:
 * - forecastTourismPerformance: An async function that takes tourism data and returns a forecast.
 * - ForecastTourismPerformanceInput: The input type for the forecastTourismPerformance function.
 * - ForecastTourismPerformanceOutput: The output type for the forecastTourismPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ForecastTourismPerformanceInputSchema = z.object({
  tourismData: z
    .string()
    .describe(
      'Tourism data as a JSON string, including historical data and relevant factors such as economic indicators, seasonality, and marketing spend.'
    ),
  forecastHorizon: z
    .number()
    .describe('The number of months into the future to forecast.'),
  agencyName: z.string().describe('The name of the tourism agency.'),
});
export type ForecastTourismPerformanceInput = z.infer<
  typeof ForecastTourismPerformanceInputSchema
>;

const ForecastTourismPerformanceOutputSchema = z.object({
  forecast: z
    .string()
    .describe(
      'A narrative summary of the forecasted tourism performance, including key trends and expected outcomes.'
    ),
  confidenceLevel: z
    .number()
    .describe(
      'A number between 0 and 1 indicating the confidence level of the forecast.'
    ),
  supportingData: z
    .string()
    .describe(
      'Supporting data in JSON format to back up the forecast, including key metrics and trends.'
    ),
});
export type ForecastTourismPerformanceOutput = z.infer<
  typeof ForecastTourismPerformanceOutputSchema
>;

export async function forecastTourismPerformance(
  input: ForecastTourismPerformanceInput
): Promise<ForecastTourismPerformanceOutput> {
  return forecastTourismPerformanceFlow(input);
}

const forecastTourismPerformancePrompt = ai.definePrompt({
  name: 'forecastTourismPerformancePrompt',
  input: {schema: ForecastTourismPerformanceInputSchema},
  output: {schema: ForecastTourismPerformanceOutputSchema},
  prompt: `You are an expert tourism analyst. Given the following tourism data for {{agencyName}}, forecast tourism performance for the next {{forecastHorizon}} months.

Tourism Data: {{{tourismData}}}

Consider historical trends, seasonality, economic indicators, and any other relevant factors to provide an accurate and insightful forecast.

Format your response as a narrative summary, including a confidence level (0-1) and supporting data in JSON format.`,
});

const forecastTourismPerformanceFlow = ai.defineFlow(
  {
    name: 'forecastTourismPerformanceFlow',
    inputSchema: ForecastTourismPerformanceInputSchema,
    outputSchema: ForecastTourismPerformanceOutputSchema,
  },
  async input => {
    const {output} = await forecastTourismPerformancePrompt(input);
    return output!;
  }
);
