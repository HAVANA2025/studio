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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Announcement } from '@/app/announcements/page';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  text: z.string().min(10, 'Text must be at least 10 characters.'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format.'}),
  link: z.string().url().optional().or(z.literal('')),
  image: z.any().optional(),
  pdf: z.any().optional(),
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
      date: announcement?.date || new Date().toISOString().split('T')[0],
      link: announcement?.link || '',
      image: null,
      pdf: null,
    },
  });

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      let imageUrl = announcement?.imageUrl || '';
      if (values.image && values.image.length > 0) {
        imageUrl = await uploadFile(values.image[0], `announcements/images/${Date.now()}_${values.image[0].name}`);
      }

      let pdfUrl = announcement?.pdfUrl || '';
      if (values.pdf && values.pdf.length > 0) {
        pdfUrl = await uploadFile(values.pdf[0], `announcements/pdfs/${Date.now()}_${values.pdf[0].name}`);
      }
      
      const announcementData = {
        ...values,
        imageUrl,
        pdfUrl,
        createdAt: announcement?.createdAt || new Date().toISOString(),
      };
      
      delete announcementData.image;
      delete announcementData.pdf;

      if (announcement) {
        // Update existing document
        const docRef = doc(db, 'announcements', announcement.id);
        await updateDoc(docRef, announcementData);
        toast({ title: 'Success', description: 'Announcement updated successfully.' });
      } else {
        // Add new document
        await addDoc(collection(db, 'announcements'), announcementData);
        toast({ title: 'Success', description: 'Announcement added successfully.' });
      }
      onFinished();
    } catch (error: any) {
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pdf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {announcement ? 'Update Announcement' : 'Add Announcement'}
        </Button>
      </form>
    </Form>
  );
}
