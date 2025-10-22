'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { getAiAnalysis, type AnalysisState } from '@/app/actions';
import type { TourismData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Bot, FileText, Loader, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Generate Analysis
        </>
      )}
    </Button>
  );
}

export function AiAnalysis({ data }: { data: TourismData[] }) {
  const initialState: AnalysisState = { data: null, error: null };
  const [state, formAction] = useActionState(getAiAnalysis, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <form action={formAction}>
        <input type="hidden" name="data" value={JSON.stringify(data)} />
        <SubmitButton />
      </form>

      {state.data ? (
        <div className="flex flex-col gap-4 animate-in fade-in-50 duration-500">
          <div className="p-4 bg-secondary/50 rounded-lg border border-dashed">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary" />
              Trend Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              {state.data.trendAnalysis}
            </p>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg border border-dashed">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Future Forecast
            </h3>
            <p className="text-sm text-muted-foreground">
              {state.data.forecast}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-secondary/30 rounded-lg border border-dashed">
          <Bot className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-semibold">Get AI Insights</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Click the button to get an AI-powered analysis of the current
            tourism data and a forecast for future performance.
          </p>
        </div>
      )}
    </div>
  );
}
