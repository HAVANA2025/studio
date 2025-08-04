'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Event } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  details: z.string().min(10, 'Details must be at least 10 characters.'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format.' }),
  location: z.string().min(2, 'Location is required.'),
  registrationLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  linkText: z.string().optional(),
  whatsappLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

type EventFormProps = {
  event?: Event | null;
  onFinished: () => void;
};

export function EventForm({ event, onFinished }: EventFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || '',
      details: event?.details || '',
      date: event?.date ? new Date(event.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      location: event?.location || '',
      registrationLink: event?.registrationLink || '',
      linkText: event?.linkText || '',
      whatsappLink: event?.whatsappLink || '',
      imageUrl: event?.imageUrl || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (event) {
        // Update existing document
        const docRef = doc(db, 'events', event.id);
        await updateDoc(docRef, { ...values });
        toast({ title: 'Success', description: 'Event updated successfully.' });
      } else {
        // Add new document
        await addDoc(collection(db, 'events'), {
          ...values,
          createdAt: Timestamp.now(),
        });
        toast({ title: 'Success', description: 'Event added successfully.' });
      }
      form.reset();
      onFinished();
    } catch (error: any) {
      console.error("Failed to save event:", error);
      toast({
        title: 'Error',
        description: `Failed to save event: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl><Input placeholder="E.g., AI Workshop" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl><Textarea placeholder="Tell us more about the event..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl><Input placeholder="E.g., Online" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="registrationLink"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Registration Link</FormLabel>
                <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="linkText"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Link Text</FormLabel>
                <FormControl><Input placeholder="E.g., Register Here" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <FormField
          control={form.control}
          name="whatsappLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Group Link (Optional)</FormLabel>
              <FormControl><Input placeholder="https://chat.whatsapp.com/..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL for Past Events (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {event ? 'Update Event' : 'Add Event'}
        </Button>
      </form>
    </Form>
  );
}
