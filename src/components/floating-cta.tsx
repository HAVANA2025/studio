
'use client';

import { Lightbulb, Rocket } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import React from 'react';

export function FloatingCTA() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  // Don't show the button on the playground page itself
  if (pathname === '/playground') {
    return null;
  }
  
  const handleGetStartedClick = () => {
    setIsOpen(false);
    router.push('/playground');
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-8 right-8 z-50 animate-box-glow">
          {/* Desktop Button */}
          <button
            className="group relative hidden h-16 w-48 items-center justify-center gap-3 overflow-hidden rounded-lg bg-secondary/80 px-4 text-lg font-semibold text-secondary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary/80 hover:text-primary-foreground hover:shadow-primary/40 md:flex"
          >
            <div className="absolute inset-0 transform-gpu transition-all duration-300 group-hover:scale-150 group-hover:opacity-50 animate-colorful-glow-bg" />
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Got an Idea?</span>
            <Lightbulb className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:scale-110 animate-bulb-glow" />
          </button>
          
          {/* Mobile Button */}
           <button
            className={cn(
              'md:hidden flex h-16 w-16 items-center justify-center rounded-full bg-secondary/80 text-secondary-foreground shadow-lg backdrop-blur-sm animate-colorful-glow-bg',
              'active:scale-95 transition-transform duration-200'
            )}
          >
            <Lightbulb className="relative z-10 h-8 w-8 animate-bulb-glow" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md text-center bg-background/80 backdrop-blur-md border-primary/20">
        <DialogHeader className="items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Rocket className="w-8 h-8 text-primary"/>
            </div>
          <DialogTitle className="font-headline text-3xl">Turn Your Idea Into Reality</DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground pt-2">
            Have a spark of an idea? Our AI can help you flesh it out. Get started on your next project now!
          </DialogDescription>
        </DialogHeader>
        <Button onClick={handleGetStartedClick} size="lg">
          Click here to get started
        </Button>
      </DialogContent>
    </Dialog>
  );
}
