import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Logo } from '../logo';

const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/domains', label: 'Domains' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/community', label: 'Community' },
    { href: '/media', label: 'Media' },
];

const getInvolvedLinks = [
    { href: '/registrations', label: 'Events' },
    { href: '/playground', label: 'Playground' },
    { href: '/announcements', label: 'Announcements' },
    { href: '/signup', label: 'Join the Club' },
];


export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8" />
              <span className="font-headline text-2xl font-bold">G-ELECTRA</span>
            </Link>
            <p className="text-muted-foreground text-base max-w-xs">
              The official hub for the Smart Systems Club. Learn, build, and innovate with us.
            </p>
            <div className="flex items-center gap-4 mt-6">
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

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Get Involved */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-3">
               {getInvolvedLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
               <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Page
                  </Link>
                </li>
            </ul>
          </div>

        </div>
      </div>
      <div className="container mx-auto border-t border-border/40 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} G-Electra Hub. All Rights Reserved.
      </div>
    </footer>
  );
}
