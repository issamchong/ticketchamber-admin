'use server';

import { analyzeTourismTrends } from '@/ai/flows/analyze-tourism-trends';
import type { TourismData } from '@/lib/types';
import type { AnalyzeTourismTrendsOutput } from '@/ai/flows/analyze-tourism-trends';

export type AnalysisState = {
  data: AnalyzeTourismTrendsOutput | null;
  error: string | null;
};

export async function getAiAnalysis(
  prevState: AnalysisState,
  formData: FormData
): Promise<AnalysisState> {
  const dataString = formData.get('data') as string;

  if (!dataString) {
    return { data: null, error: 'No data provided for analysis.' };
  }

  try {
    const analysis = await analyzeTourismTrends({
      tourismData: dataString,
    });
    return { data: analysis, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `Failed to get AI analysis: ${errorMessage}` };
  }
}
