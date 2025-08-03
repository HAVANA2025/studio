'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Menu, 
  X, 
  Zap, 
  Home, 
  Info, 
  Shapes, 
  Award, 
  Users, 
  Image as ImageIcon, 
  Calendar, 
  FlaskConical, 
  Megaphone, 
  Mail,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { href: '/about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
  { href: '/domains', label: 'Domains', icon: <Shapes className="w-4 h-4" /> },
  { href: '/achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
  { href: '/community', label: 'Community', icon: <Users className="w-4 h-4" /> },
  { href: '/media', label: 'Media', icon: <ImageIcon className="w-4 h-4" /> },
  { href: '/registrations', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  { href: '/playground', label: 'Playground', icon: <FlaskConical className="w-4 h-4" /> },
  { href: '/announcements', label: 'Announcements', icon: <Megaphone className="w-4 h-4" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">G-ELECTRA</span>
        </Link>

        <nav className="hidden items-center justify-center rounded-full bg-secondary/50 p-1.5 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-all duration-300 relative flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.icon}
                <span className={cn(isActive ? 'glow-effect' : '')}>{link.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="icon">
            <Link href="#"><Bell /></Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div
            className={cn(
              'fixed inset-0 top-14 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
            )}
          >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex w-full items-center gap-2 rounded-md p-2 text-base font-medium hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2">
                 <Button asChild variant="outline" className="w-full">
                  <Link href="#" onClick={() => setIsOpen(false)}><Bell className="mr-2"/> Notifications</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
