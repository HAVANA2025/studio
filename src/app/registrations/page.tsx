'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar, MapPin, Ticket, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EventForm } from '@/components/event-form';

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  registrationLink: string;
  imageUrl: string;
};

export default function RegistrationsPage() {
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventsData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching events: ", error);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (event: Event) => {
    try {
      if (event.imageUrl) {
        const imageRef = ref(storage, event.imageUrl);
        await deleteObject(imageRef);
      }
      await deleteDoc(doc(db, 'events', event.id));
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Events & Registrations</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our upcoming events. Learn, build, and connect with fellow tech enthusiasts.
        </p>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        {isAdmin && (
          <div className="mb-8 text-right">
            <Button onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Add New Event</Button>
          </div>
        )}
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{editingEvent ? 'Edit' : 'Add'} Event</DialogTitle>
          </DialogHeader>
          <EventForm event={editingEvent} onFinished={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-8">Upcoming Events</h2>
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        ) : events.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 flex flex-col">
                <CardHeader className="p-0 relative">
                   {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-2">
                      <Button variant="secondary" size="icon" onClick={() => handleEdit(event)}><Edit className="h-4 w-4" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the event.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(event)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                  <div className="relative aspect-video">
                    <Image src={event.imageUrl || 'https://placehold.co/600x400.png'} alt={event.title} fill className="object-cover" />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-2xl mb-2">{event.title}</CardTitle>
                  <div className="text-muted-foreground space-y-2">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.location}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full" disabled={!event.registrationLink || event.registrationLink === '#'}>
                    <Link href={event.registrationLink || '#'} target="_blank" rel="noopener noreferrer">
                      {event.registrationLink && event.registrationLink !== '#' ? <>Register Now <Ticket className="ml-2 w-4 h-4" /></> : 'Registration Closed'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-muted-foreground/20 rounded-lg">
             <h3 className="font-headline text-2xl">No Upcoming Events</h3>
             <p className="text-muted-foreground mt-2">Check back soon for new events!</p>
          </div>
        )}
      </section>

      {!isLoading && events.length === 0 && (
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
      )}
    </div>
  );
}
