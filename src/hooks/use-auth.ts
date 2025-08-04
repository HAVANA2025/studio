import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, getRedirectResult } from 'firebase/auth';
import { auth, adminEmails } from '@/lib/firebase';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';

type AuthState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

export function useAuth() {
  const { toast } = useToast();
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    // This handles the redirect result from social logins
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User has successfully signed in or signed up.
          const user = result.user;
          const isAdmin = user?.email ? adminEmails.includes(user.email) : false;
          setAuthState({ user, isAdmin, loading: false });
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
          router.push('/announcements'); // Redirect to a safe page
        }
      })
      .catch((error) => {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
        setAuthState(prevState => ({ ...prevState, loading: false }));
      });
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      let isAdmin = false;
      if (user && user.email) {
        isAdmin = adminEmails.includes(user.email);
      }
      setAuthState({ user, isAdmin, loading: false });

      // Persist user state
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
      }
    });

    return () => unsubscribe();
  }, [router, toast]);

  useEffect(() => {
    try {
        const userJson = localStorage.getItem('user');
        const isAdminJson = localStorage.getItem('isAdmin');
        if (userJson && isAdminJson) {
            const user = JSON.parse(userJson);
            const isAdmin = JSON.parse(isAdminJson);
            setAuthState({ user, isAdmin, loading: false });
        } else {
             // Only set loading to false if we haven't already got a user
             // from the redirect result processing.
            if (authState.loading) {
                setAuthState(prevState => ({ ...prevState, loading: false }));
            }
        }
    } catch(e) {
        if (authState.loading) {
            setAuthState(prevState => ({ ...prevState, loading: false }));
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return authState;
}
