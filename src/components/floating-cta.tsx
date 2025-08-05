'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Lightbulb, Rocket } from 'lucide-react';

export function FloatingCta() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(true);

  if (!isCtaVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-accent rounded-lg opacity-75 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={() => setIsOpen(true)}
            className="relative px-7 py-3 bg-secondary/80 backdrop-blur-md text-foreground rounded-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:scale-110 transition-transform duration-300"
            aria-label="Get project ideas"
          >
            <span className="font-headline text-sm">Got an Idea?</span>
            <Lightbulb className="w-6 h-6 text-primary animate-pulse" />
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-secondary/80 backdrop-blur-xl border-primary/30 text-center">
          <DialogHeader>
            <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit mb-4">
              <Rocket className="w-12 h-12 text-primary" />
            </div>
            <DialogTitle className="font-headline text-3xl">Turn Your Idea Into Reality</DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg pt-2">
              Have a spark of an idea? Our AI can help you flesh it out. Get started on your next project now!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Button size="lg" asChild>
              <Link href="/playground" onClick={() => setIsOpen(false)}>Click here to get started</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
