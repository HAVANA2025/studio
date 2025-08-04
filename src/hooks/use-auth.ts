'use client';

import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, User, getRedirectResult, signOut, AuthError } from 'firebase/auth';
import { auth, adminEmails } from '@/lib/firebase';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';

type AuthState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  handleSignOut: () => Promise<void>;
};

export function useAuth(): AuthState {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSignOut = useCallback(async () => {
    try {
        await signOut(auth);
        router.push('/');
    } catch (error: any) {
        toast({
            title: 'Sign Out Failed',
            description: error.message,
            variant: 'destructive',
        });
    }
  }, [router, toast]);


  useEffect(() => {
    // First, check if we are returning from a redirect login flow
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User has successfully signed in via redirect.
          // onAuthStateChanged will handle setting the user state.
          // We can navigate them to a protected route.
          toast({ title: 'Login Successful', description: `Welcome, ${result.user.email}!` });
          router.push('/announcements');
        }
      })
      .catch((error: AuthError) => {
        // Handle Errors here.
        console.error("Redirect result error:", error);
        toast({
          title: 'Login Failed',
          description: `An error occurred during sign-in: ${error.message}`,
          variant: 'destructive',
        });
      })
      .finally(() => {
         // Now, set up the normal auth state listener.
         // This will catch the user from the redirect, or any existing session.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
            setIsAdmin(adminEmails.includes(user.email || ''));
          } else {
            setUser(null);
            setIsAdmin(false);
          }
          // Whether there is a user or not, the check is complete.
          setLoading(false);
        });
        
        // Cleanup the listener on component unmount
        return () => unsubscribe();
      });
  // The dependency array is empty, so this effect runs once on mount.
  }, [router, toast]);

  return { user, isAdmin, loading, handleSignOut };
}
