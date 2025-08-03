import { ProjectSuggestionForm } from "@/components/project-suggestion-form";
import { SplineViewer } from "@/components/spline-viewer";

export default function PlaygroundPage() {
  return (
    <div className="relative container mx-auto py-16 sm:py-24">
       <div className="absolute inset-0 -z-10">
        <SplineViewer url="https://prod.spline.design/fXAFIhXMv6YadalH/scene.splinecode" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight">The Playground</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Unleash your creativity. Use our AI-powered tool to generate project ideas tailored to your interests.
        </p>
      </div>
      <div className="relative z-10">
        <ProjectSuggestionForm />
      </div>
    </div>
  );
}
