
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb, Wand2, Cpu, Code } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { ProjectIdea } from '@/ai/flows/project-suggester-flow';
import { suggestProject } from '@/ai/flows/project-suggester-flow';

const SplineViewer = dynamic(() => import('@/components/spline-viewer').then(mod => mod.SplineViewer), { ssr: false });

export default function PlaygroundPage() {
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<ProjectIdea[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interests) {
      setError('Please enter your interests.');
      return;
    }
    setError(null);
    setLoading(true);
    setSuggestions([]);

    try {
      const result = await suggestProject({ interests });
      setSuggestions(result.ideas);
    } catch (e: any) {
      console.error(e);
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-16 sm:py-24">
      <section className="relative overflow-hidden rounded-2xl p-8 md:p-12">
         <div className="absolute inset-0 -z-10">
            <SplineViewer url="https://prod.spline.design/picW0uob3wehMDQw/scene.splinecode" />
            <div className="absolute inset-0 bg-background/80"></div>
        </div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
            <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-6">
                    <Wand2 className="w-8 h-8" />
                </div>
            <h1 className="font-headline text-5xl font-bold tracking-tight">AI Project Playground</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Unleash your creativity! Describe your interests—anything from "retro games" to "smart gardening"—and our AI will generate unique project ideas for you to build.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="E.g., 'sustainable tech, space exploration'"
                    className="h-12 text-base"
                    disabled={loading}
                />
                <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                    {loading ? <Loader2 className="animate-spin" /> : <><Lightbulb className="mr-2" />Generate Ideas</>}
                </Button>
                </div>
                {error && <p className="text-destructive mt-2 text-sm">{error}</p>}
            </form>
            </div>
            {/* This div is intentionally left empty for layout spacing on larger screens */}
            <div></div>
        </div>
      </section>

      <section className="mt-24">
        {loading && (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader><div className="h-6 bg-muted rounded w-3/4"></div></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-4 bg-muted rounded w-full"></div>
                            <div className="h-4 bg-muted rounded w-5/6"></div>
                            <div className="h-8 bg-muted rounded w-1/2 mt-4"></div>
                        </CardContent>
                    </Card>
                 ))}
            </div>
        )}
        
        {suggestions.length > 0 && (
          <div>
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Here are a few ideas to get you started:</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suggestions.map((idea, index) => (
                <Card key={index} className="flex flex-col bg-card/50 border-primary/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{idea.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground mb-4 flex-grow">{idea.description}</p>
                     <div className="flex flex-wrap gap-2">
                        {idea.isHardware ? <Cpu className="w-5 h-5 text-primary"/> : <Code className="w-5 h-5 text-primary" />}
                        {idea.technologies.map(tech => (
                        <div key={tech} className="text-xs inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1">
                            {tech}
                        </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
