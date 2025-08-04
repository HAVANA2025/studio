'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Event } from '@/app/registrations/page';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format.' }),
  location: z.string().min(2, 'Location is required.'),
  registrationLink: z.string().url().optional().or(z.literal('')),
  image: z.any().optional(),
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
      date: event?.date ? new Date(event.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      location: event?.location || '',
      registrationLink: event?.registrationLink || '',
      image: null,
    },
  });

  const uploadFile = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `events/images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      let imageUrl = event?.imageUrl || '';
      if (values.image && values.image.length > 0) {
        imageUrl = await uploadFile(values.image[0]);
      } else if (!event) {
        toast({ title: 'Error', description: 'An image is required for a new event.', variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }

      const eventData = { 
          title: values.title,
          date: values.date,
          location: values.location,
          registrationLink: values.registrationLink,
          imageUrl 
        };

      if (event) {
        const docRef = doc(db, 'events', event.id);
        await updateDoc(docRef, eventData);
        toast({ title: 'Success', description: 'Event updated successfully.' });
      } else {
        await addDoc(collection(db, 'events'), eventData);
        toast({ title: 'Success', description: 'Event added successfully.' });
      }
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
              <FormControl><Input placeholder="E.g., Online or Main Campus" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registrationLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Link (Optional)</FormLabel>
              <FormControl><Input placeholder="https://example.com/register" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Event Image {event ? '(Optional)' : ''}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...rest}
                />
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
