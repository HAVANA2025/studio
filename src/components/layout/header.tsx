
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
  Rocket, 
  Mail,
  Bell,
  LogIn,
  LogOut,
  UserCircle,
  Shield,
  BookOpen,
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
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Announcement } from '@/lib/types';


const navLinks = [
  { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { href: '/about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
  { href: '/registrations', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  { href: '/projects', label: 'Projects', icon: <Rocket className="w-4 h-4" /> },
  { href: '/community', label: 'Our Team', icon: <Users className="w-4 h-4" /> },
  { href: '/achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
  { href: '/media', label: 'Media', icon: <ImageIcon className="w-4 h-4" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAdmin, loading, handleSignOut } = useAuth();
  const [hasNewAnnouncements, setHasNewAnnouncements] = useState(false);

  useEffect(() => {
    const checkAnnouncements = async () => {
      if (!user) {
        setHasNewAnnouncements(false);
        return;
      }
      
      const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'), limit(1));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const latestAnnouncement = snapshot.docs[0].data() as Announcement;
          const lastSeenTimestamp = localStorage.getItem('lastSeenAnnouncementTimestamp');
          
          if (!lastSeenTimestamp || (latestAnnouncement.createdAt.seconds > parseInt(lastSeenTimestamp, 10))) {
            setHasNewAnnouncements(true);
          } else {
            setHasNewAnnouncements(false);
          }
        } else {
            setHasNewAnnouncements(false);
        }
      }, (error) => {
        console.error("Failed to check for new announcements:", error);
      });

      return () => unsubscribe();
    };

    if (user && db) {
        checkAnnouncements();
    }
  }, [user]);

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-headline text-lg font-bold">G-ELECTRA</span>
        </Link>

        <nav className="hidden items-center justify-center rounded-full bg-secondary/50 p-1 md:flex">
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
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!loading && user ? (
             <div className="flex items-center gap-2">
                <Link href="/announcements" passHref>
                    <Button variant="ghost" size="icon" aria-label="Announcements">
                        <Bell />
                        {hasNewAnnouncements && (
                            <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                        )}
                    </Button>
                </Link>
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
                        <DropdownMenuItem asChild className="cursor-pointer">
                           <Link href="/announcements">
                                <Bell className="mr-2 h-4 w-4" />
                                <span>Announcements</span>
                           </Link>
                        </DropdownMenuItem>
                        {isAdmin && (
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href="/admin">
                                    <Shield className="mr-2 h-4 w-4" />
                                    <span>Admin Dashboard</span>
                                </Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          ) : !loading ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/login"><LogIn className="mr-2"/>Login</Link>
              </Button>
            </>
          ) : <div className="w-24 h-10 animate-pulse rounded-md bg-muted" /> }
        </div>

        <div className="flex items-center gap-2 md:hidden">
            {!loading && user && (
              <Link href="/announcements" passHref>
                  <Button variant="ghost" size="icon" aria-label="Announcements">
                      <Bell />
                      {hasNewAnnouncements && (
                          <span className="absolute top-2 right-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                      )}
                  </Button>
              </Link>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>
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
              <div className="flex flex-col gap-4 border-t border-border pt-4">
                {!loading && user ? (
                  <>
                     {isAdmin && (
                         <Button asChild variant="outline" className="w-full">
                            <Link href="/admin" onClick={() => setIsOpen(false)}>
                                <Shield className="mr-2"/>Admin
                            </Link>
                        </Button>
                    )}
                    <Button variant="outline" onClick={() => { handleSignOut(); setIsOpen(false);}} className="w-full"><LogOut className="mr-2"/>Sign Out</Button>
                  </>
                ) : !loading ? (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
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
