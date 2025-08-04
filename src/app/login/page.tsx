'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Github } from 'lucide-react';
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 2.04-4.79 2.04-3.83 0-6.95-3.1-6.95-6.95s3.12-6.95 6.95-6.95c2.18 0 3.54.88 4.38 1.7l2.44-2.44C19.33 3.72 16.35 2.5 12.48 2.5c-5.47 0-9.9 4.43-9.9 9.9s4.43 9.9 9.9 9.9c5.19 0 9.4-3.57 9.4-9.53 0-.63-.05-1.22-.16-1.78z" />
    </svg>
  );

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push('/announcements');
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  async function handleGithubLogin() {
    const provider = new GithubAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
       toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
       toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-md border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Login to G-Electra Hub</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                <GoogleIcon className="mr-2 h-4 w-4" /> Login with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGithubLogin}>
              <Github className="mr-2 h-4 w-4" /> Login with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
