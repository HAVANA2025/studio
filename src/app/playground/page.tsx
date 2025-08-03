import { ProjectSuggestionForm } from "@/components/project-suggestion-form";
import { SplineViewer } from "@/components/spline-viewer";

export default function PlaygroundPage() {
  return (
    <div className="relative isolate flex flex-col items-center justify-end min-h-[calc(100vh-theme(spacing.14))] pb-24 sm:pb-32">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <SplineViewer url="https://prod.spline.design/RiP-3wN4pmYBVpMU/scene.splinecode" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]"></div>
      </div>
      <div className="container flex flex-col items-center text-center">
        <div className="mb-12">
            <h1 className="font-headline text-5xl font-bold tracking-tight">The Playground</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Unleash your creativity. Use our AI-powered tool to generate project ideas tailored to your interests.
            </p>
        </div>
        <div className="w-full">
            <ProjectSuggestionForm />
        </div>
      </div>
    </div>
  );
}
