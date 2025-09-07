import Link from 'next/link';
import { Twitter, Github, Linkedin, Phone, Mail, Instagram } from 'lucide-react';
import { Logo } from '../logo';

const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/domains', label: 'Domains' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/community', label: 'Our Team' },
    { href: '/media', label: 'Media' },
];

const getInvolvedLinks = [
    { href: '/registrations', label: 'Events' },
    { href: '/announcements', label: 'Announcements' },
];

const WhatsAppIcon = (props: React.ComponentProps<'svg'>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );


export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-2 lg:col-span-1">
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
               <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 transition-colors hover:text-primary" />
              </Link>
              <Link href="#" aria-label="WhatsApp">
                <WhatsAppIcon className="h-5 w-5 transition-colors hover:text-primary" />
              </Link>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 col-span-1 md:col-span-2 lg:col-span-2 gap-8">
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

             <div>
                <h3 className="font-headline text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-1 shrink-0"/>
                    <a href="mailto:gelectra@gitam.edu" className="hover:text-primary transition-colors">
                        gelectra@gitam.edu
                    </a>
                    </li>
                    <li className="flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-1 shrink-0"/>
                    <a href="tel:+917995988480" className="hover:text-primary transition-colors">
                        +91 79959 88480
                    </a>
                    </li>
                </ul>
            </div>
          </div>
          
          {/* Column 3: Map */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Our Location</h3>
             <div className="rounded-lg overflow-hidden border border-border/20 shadow-md h-48">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121731.63467824478!2d78.01315179726562!3d17.549778100000026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf11b33d2df9d%3A0xccb71d58d5bf59ff!2sGITAM%20Deemed%20to%20be%20University%20Hyderabad!5e0!3m2!1sen!2sin!4v1754310887530!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
          </div>

        </div>
      </div>
      <div className="container mx-auto border-t border-border/40 py-6 text-center text-sm text-muted-foreground">
        <div>
            Powered by{' '}
            <a 
                href="https://www.gitam.edu/hyderabad/electrical-electronics-communication-engineering" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
            >
                Department of EECE
            </a>
        </div>
        <div>
             <a 
                href="https://www.gitam.edu/hyderabad/gitam-school-of-technology" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
            >
                GITAM
             </a>
             <div>(Deemed to be University)</div>
             <div>HYDERABAD-502 329</div>
        </div>
        <div className="mt-2">© {new Date().getFullYear()} G-Electra Hub. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
