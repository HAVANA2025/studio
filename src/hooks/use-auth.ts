
import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, User, getRedirectResult, signOut } from 'firebase/auth';
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
  const [authState, setAuthState] = useState<Omit<AuthState, 'handleSignOut'>>({
    user: null,
    isAdmin: false,
    loading: true,
  });

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
    // This function runs once on mount to process the redirect result.
    const processRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User has successfully signed in or signed up via redirect.
          // The onAuthStateChanged listener below will handle the user state update.
          router.push('/announcements'); // Redirect to a logged-in page
        }
      } catch (error: any) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
      }
    };
    
    processRedirect();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      let isAdmin = false;
      if (user && user.email) {
        isAdmin = adminEmails.includes(user.email);
      }
      setAuthState({ user, isAdmin, loading: false });
    });

    return () => unsubscribe();
  }, [router, toast]);

  return { ...authState, handleSignOut };
}
