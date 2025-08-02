import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const upcomingEvents = [
  {
    title: "Cyberpunk AI Workshop",
    date: "December 25, 2024",
    location: "Online",
    image: "https://placehold.co/600x400.png",
    hint: "ai workshop",
    registrationLink: "#"
  },
  {
    title: "IoT Hackathon: Smart Cities",
    date: "January 15, 2025",
    location: "Tech Park, Main Campus",
    image: "https://placehold.co/600x400.png",
    hint: "smart city",
    registrationLink: "#"
  }
];

export default function RegistrationsPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Events & Registrations</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our upcoming events. Learn, build, and connect with fellow tech enthusiasts.
        </p>
      </div>
      
      <section>
        <h2 className="font-headline text-3xl font-bold mb-8">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event) => (
            <Card key={event.title} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image src={event.image} alt={event.title} fill className="object-cover" data-ai-hint={event.hint} />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-2xl mb-2">{event.title}</CardTitle>
                <div className="text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {event.date}</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.location}</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={event.registrationLink}>Register Now <Ticket className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24 text-center">
        <h2 className="font-headline text-3xl font-bold mb-8">More Coming Soon...</h2>
        <p className="text-muted-foreground mb-8">We're always planning something new. Stay tuned!</p>
        <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse bg-secondary/50">
                    <div className="bg-muted aspect-video w-full"></div>
                    <CardHeader>
                        <div className="h-6 w-3/4 bg-muted rounded"></div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-1/2 bg-muted rounded"></div>
                    </CardContent>
                    <CardFooter>
                         <div className="h-10 w-full bg-muted rounded-md"></div>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
