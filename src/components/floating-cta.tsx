'use client';

import Link from 'next/link';
import { Lightbulb } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function FloatingCTA() {
  const pathname = usePathname();

  // Don't show the button on the playground page itself
  if (pathname === '/playground') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Desktop Button */}
      <Link
        href="/playground"
        className="group relative hidden h-14 items-center justify-center gap-4 overflow-hidden rounded-full bg-secondary/80 pr-6 pl-16 text-lg font-semibold text-secondary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary/80 hover:text-primary-foreground hover:shadow-primary/40 md:flex"
      >
        <div className="absolute left-0 top-0 h-full w-14 transform-gpu transition-all duration-300 group-hover:scale-150 group-hover:opacity-50">
          <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
        </div>
        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Got an Idea?</span>
        <Lightbulb className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
      </Link>
      
      {/* Mobile Button */}
      <Link
        href="/playground"
        className={cn(
          'md:hidden flex h-14 w-14 items-center justify-center rounded-full bg-secondary/80 text-secondary-foreground shadow-lg backdrop-blur-sm',
          'active:scale-95 transition-transform duration-200'
        )}
      >
         <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
        <Lightbulb className="relative z-10 h-6 w-6" />
      </Link>
    </div>
  );
}
