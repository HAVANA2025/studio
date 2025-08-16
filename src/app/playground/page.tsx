import { TestTubeDiagonal } from 'lucide-react';

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <TestTubeDiagonal className="h-12 w-12 text-primary" />
      </div>
      <h1 className="mt-8 font-headline text-5xl font-bold tracking-tight">Playground</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This space is under construction. Exciting things are coming soon!
      </p>
    </div>
  );
}
