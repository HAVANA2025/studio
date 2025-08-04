'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
    toast({
      title: 'Message Sent!',
      description: "We've received your message and will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question or want to collaborate? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
            <h2 className="font-headline text-3xl font-bold">Get in Touch</h2>
            <div className="space-y-6 text-lg">
                <a href="mailto:gelectra@gitam.edu" className="flex items-center gap-4 transition-colors hover:text-primary">
                    <Mail className="w-6 h-6 text-primary" />
                    <span>gelectra@gitam.edu</span>
                </a>
                <a href="tel:+917995988480" className="flex items-center gap-4 transition-colors hover:text-primary">
                    <Phone className="w-6 h-6 text-primary" />
                    <span>+91 79959 88480</span>
                </a>
                <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <span>
                        GITAM Hyderabad Campus<br/>
                        Rudraram, Telangana 502329
                    </span>
                </div>
            </div>
        </div>
        <Card className="border-primary/20 shadow-lg shadow-primary/10">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us how we can help..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
