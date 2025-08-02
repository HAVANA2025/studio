import { ProjectSuggestionForm } from "@/components/project-suggestion-form";

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight">The Playground</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Unleash your creativity. Use our AI-powered tool to generate project ideas tailored to your interests.
        </p>
      </div>
      <ProjectSuggestionForm />
    </div>
  );
}
