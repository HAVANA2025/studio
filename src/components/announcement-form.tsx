'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Announcement } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const categories = ['General', 'Events', 'Workshops', 'Results'] as const;

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  text: z.string().min(10, 'Text must be at least 10 characters.'),
  category: z.enum(categories, { required_error: 'Please select a category.'}),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format.'}),
  link: z.string().url().optional().or(z.literal('')),
  linkText: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

type AnnouncementFormProps = {
  announcement?: Announcement | null;
  onFinished: () => void;
};

export function AnnouncementForm({ announcement, onFinished }: AnnouncementFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: announcement?.title || '',
      text: announcement?.text || '',
      category: announcement?.category || 'General',
      date: announcement?.date || new Date().toISOString().split('T')[0],
      link: announcement?.link || '',
      linkText: announcement?.linkText || '',
      imageUrl: announcement?.imageUrl || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (announcement) {
        // Update existing document
        const docRef = doc(db, 'announcements', announcement.id);
        await updateDoc(docRef, { ...values });
        toast({ title: 'Success', description: 'Announcement updated successfully.' });
      } else {
        // Add new document
        await addDoc(collection(db, 'announcements'), {
          ...values,
          createdAt: Timestamp.now(),
        });
        toast({ title: 'Success', description: 'Announcement added successfully.' });
      }
      form.reset();
      onFinished();
    } catch (error: any) {
      console.error("Failed to save announcement:", error);
      toast({
        title: 'Error',
        description: `Failed to save announcement: ${error.message}`,
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
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="E.g., Exam Update" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text/Content</FormLabel>
              <FormControl><Textarea placeholder="E.g., Exam postponed to Aug 20th." {...field} /></FormControl>
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
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link (Optional)</FormLabel>
              <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Text (Optional)</FormLabel>
              <FormControl><Input placeholder="E.g., Read More" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl><Input placeholder="https://example.com/image.jpg" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {announcement ? 'Update Announcement' : 'Add Announcement'}
        </Button>
      </form>
    </Form>
  );
}
