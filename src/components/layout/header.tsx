'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { 
  Menu, 
  X, 
  Home, 
  Info, 
  Award, 
  Users, 
  Image as ImageIcon, 
  Calendar, 
  FlaskConical, 
  Megaphone, 
  Mail,
  Bell,
  ChevronDown,
  Shapes,
  LogIn,
  UserPlus,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Logo } from '../logo';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Announcement } from '@/lib/types';


const mainNavLinks = [
  { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { href: '/about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
  { href: '/registrations', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  { href: '/playground', label: 'Playground', icon: <FlaskConical className="w-4 h-4" /> },
  { href: '/announcements', label: 'Announcements', icon: <Megaphone className="w-4 h-4" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
];

const dropdownNavLinks = [
    { href: '/achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
    { href: '/community', label: 'Community', icon: <Users className="w-4 h-4" /> },
    { href: '/media', label: 'Media', icon: <ImageIcon className="w-4 h-4" /> },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, handleSignOut } = useAuth();
  const [hasNewAnnouncements, setHasNewAnnouncements] = useState(false);

  const allNavLinks = [...mainNavLinks, ...dropdownNavLinks];

  useEffect(() => {
    const checkAnnouncements = async () => {
      try {
        const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const latestAnnouncement = snapshot.docs[0].data() as Announcement;
          const lastSeenTimestamp = localStorage.getItem('lastSeenAnnouncementTimestamp');
          
          if (!lastSeenTimestamp || (latestAnnouncement.createdAt.seconds > parseInt(lastSeenTimestamp, 10))) {
            setHasNewAnnouncements(true);
          } else {
            setHasNewAnnouncements(false);
          }
        }
      } catch (error) {
        console.error("Failed to check for new announcements:", error);
      }
    };
    checkAnnouncements();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-headline text-lg font-bold">G-ELECTRA</span>
        </Link>

        <nav className="hidden items-center justify-center rounded-full bg-secondary/50 p-1.5 md:flex">
          {mainNavLinks.map((link) => {
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
                 {link.href === '/announcements' && hasNewAnnouncements && (
                    <span className="absolute top-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-background"></span>
                    </span>
                 )}
              </Link>
            )
          })}
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <div className={cn('transition-all duration-300 relative flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground', dropdownNavLinks.some(l => pathname === l.href) ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : '')}>
                <Shapes className="w-4 h-4"/> More <ChevronDown className="w-4 h-4" />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary/80 backdrop-blur-md border-primary/20">
              {dropdownNavLinks.map(link => (
                 <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className={cn('flex items-center gap-2 cursor-pointer', pathname === link.href ? 'text-primary' : '')}>
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                 </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/announcements">
              <Bell />
              {hasNewAnnouncements && (
                <span className="absolute top-1 right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              )}
            </Link>
          </Button>
          {!loading && user ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary/80 backdrop-blur-md border-primary/20 w-56" align="end" forceMount>
                   <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : !loading ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/login"><LogIn className="mr-2"/>Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup"><UserPlus className="mr-2"/>Sign Up</Link>
              </Button>
            </>
          ) : <div className="w-24 h-10 animate-pulse rounded-md bg-muted" /> }
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
              'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
            )}
          >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                {allNavLinks.map((link) => (
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
                 <Button asChild variant="outline" className="w-full relative">
                  <Link href="/announcements" onClick={() => setIsOpen(false)}>
                    <Bell className="mr-2"/> Notifications
                    {hasNewAnnouncements && (
                      <span className="absolute top-2 right-2 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    )}
                  </Link>
                </Button>
                {!loading && user ? (
                  <Button variant="outline" onClick={() => { handleSignOut(); setIsOpen(false);}} className="w-full"><LogOut className="mr-2"/>Sign Out</Button>
                ) : !loading ? (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </Button>
                  </>
                ) : null }
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
