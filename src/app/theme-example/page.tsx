import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Code, Rocket, Wand2 } from 'lucide-react';

export default function ThemeExamplePage() {
  return (
    <div className="container mx-auto py-16 sm:py-24 bg-background">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight">UI/UX Theme Guide</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of common components to ensure visual consistency.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Column 1: Interactive Components */}
        <div className="space-y-8">
          <Card className="border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Wand2 className="text-primary" />
                Interactive Card
              </CardTitle>
              <CardDescription>This is a standard card component.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="flex items-center space-x-4">
                  <Label>Tech Stack</Label>
                  <Badge variant="default">Next.js</Badge>
                  <Badge variant="secondary">Tailwind</Badge>
                  <Badge variant="outline">Firebase</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Learn More</Button>
              <Button>
                <Rocket className="mr-2" />
                Get Started
              </Button>
            </CardFooter>
          </Card>

           <div className="flex gap-4 flex-wrap">
                <Button variant="default">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="link">Link Button</Button>
           </div>
        </div>

        {/* Column 2: Text and Static Elements */}
        <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold text-primary">Headline 2 (font-headline)</h2>
            <p className="text-lg text-muted-foreground">
                This is a paragraph of body text using `text-muted-foreground`. It demonstrates the standard typography for descriptive content. The primary action color is a vibrant purple, while the accent color provides a bright cyan highlight.
            </p>
            <p className="text-foreground">
                This is standard `text-foreground` color on the main `bg-background`. It is used for most primary text content to ensure readability.
            </p>
            <pre className="bg-secondary p-4 rounded-lg border border-border">
                <code className="font-code text-sm text-accent-foreground">
                    <span className="text-muted-foreground">// Example code block</span>
                    <br />
                    <span className="text-primary">const</span> App = () => (
                    <br />
                    {'  '}
                    <span className="text-accent">&lt;div&gt;</span>Hello World<span className="text-accent">&lt;/div&gt;</span>
                    <br />
                    );
                </code>
            </pre>
        </div>
      </div>
    </div>
  );
}
