'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { suggestProjects, type SuggestProjectsOutput } from '@/ai/flows/suggest-projects';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Zap, Users, Gauge, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  interests: z.string().min(2, {
    message: 'Please enter at least one interest.',
  }),
});

export function ProjectSuggestionForm() {
  const [suggestion, setSuggestion] = useState<SuggestProjectsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestProjects(values);
      setSuggestion(result);
    } catch (error) {
      console.error('AI suggestion failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate project suggestion. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader>
          <CardTitle className="font-headline text-center text-2xl">Project Idea Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Interests</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., drones, AI, climate tech"
                        {...field}
                        className="text-lg p-6"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a few topics you're passionate about, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full text-lg p-6">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Suggest a Project'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">The AI is thinking...</p>
        </div>
      )}

      {suggestion && (
        <Card className="mt-8 animate-in fade-in-50 border-accent/20 shadow-lg shadow-accent/10">
          <CardHeader>
            <CardTitle className="font-headline text-center text-2xl">{suggestion.projectTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div className="flex items-center gap-4"><Zap className="text-accent" /> <div><strong>Tools & Tech:</strong> {suggestion.tools}</div></div>
            <div className="flex items-center gap-4"><Users className="text-accent" /> <div><strong>Team Size:</strong> {suggestion.teamSize}</div></div>
            <div className="flex items-center gap-4"><Gauge className="text-accent" /> <div><strong>Difficulty:</strong> {suggestion.difficulty}</div></div>
            <div className="flex items-center gap-4"><Calendar className="text-accent" /> <div><strong>Timeline:</strong> {suggestion.timeline}</div></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
