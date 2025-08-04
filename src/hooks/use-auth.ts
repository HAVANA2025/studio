
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
    // This function handles both initial auth state and redirect results.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsAdmin(adminEmails.includes(user.email || ''));
        setLoading(false);
        return;
      }

      // If no user, check for redirect result. This might sign them in.
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // A user was signed in via redirect.
          // onAuthStateChanged will be re-triggered with the new user.
          // We can redirect them to the announcements page.
          router.push('/announcements');
        } else {
          // No active user and no redirect result.
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      } catch (error: any) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, toast]);

  return { user, isAdmin, loading, handleSignOut };
}
