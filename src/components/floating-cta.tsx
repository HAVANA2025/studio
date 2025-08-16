'use client';

import Link from 'next/link';
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
        <div>
          {/* Desktop Button */}
          <button
            className="group relative hidden h-14 items-center justify-center gap-4 overflow-hidden rounded-full bg-secondary/80 pr-6 pl-16 text-lg font-semibold text-secondary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary/80 hover:text-primary-foreground hover:shadow-primary/40 md:flex"
          >
            <div className="absolute left-0 top-0 h-full w-14 transform-gpu transition-all duration-300 group-hover:scale-150 group-hover:opacity-50">
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
            </div>
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Got an Idea?</span>
            <Lightbulb className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </button>
          
          {/* Mobile Button */}
          <button
            className={cn(
              'md:hidden flex h-14 w-14 items-center justify-center rounded-full bg-secondary/80 text-secondary-foreground shadow-lg backdrop-blur-sm',
              'active:scale-95 transition-transform duration-200'
            )}
          >
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
            <Lightbulb className="relative z-10 h-6 w-6" />
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
