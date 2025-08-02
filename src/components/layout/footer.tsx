import Link from 'next/link';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">G-ELECTRA</span>
          </Link>
          <p className="text-sm text-muted-foreground">Smart Systems Club</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-5 w-5 transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="GitHub">
            <Github className="h-5 w-5 transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
      <div className="container mx-auto border-t border-border/40 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} G-Electra Hub. All Rights Reserved.
      </div>
    </footer>
  );
}
