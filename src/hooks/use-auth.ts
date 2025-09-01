
'use client';

import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, User, getRedirectResult, signOut, AuthError } from 'firebase/auth';
import { auth, db, adminEmails } from '@/lib/firebase';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';


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

  const checkAdminRole = useCallback(async (user: User) => {
    if (!db) {
        setIsAdmin(false);
        return false;
    }
    // Check hardcoded list first
    if (user.email && adminEmails.includes(user.email)) {
        setIsAdmin(true);
        return true;
    }

    // Then check firestore
    const userDocRef = doc(db, 'users', user.uid);
    try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().role === 'Executive Board') {
            setIsAdmin(true);
            return true;
        } else {
            setIsAdmin(false);
            return false;
        }
    } catch(e) {
        console.error("Could not check admin role from firestore", e);
        setIsAdmin(false);
        return false;
    }
  }, []);

  const createUserDocument = useCallback(async (user: User) => {
      if (!db) return;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      // Only create document if it doesn't exist
      if (!userDoc.exists()) {
          const isHardcodedAdmin = user.email && adminEmails.includes(user.email);
          const role = isHardcodedAdmin ? 'Executive Board' : 'Student';
          
          try {
              await setDoc(userDocRef, {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  role: role,
                  createdAt: serverTimestamp(),
              });
          } catch(e) {
              console.error("Error creating user document", e);
          }
      }
  }, []);


  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    // First, check if we are returning from a redirect login flow
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User has successfully signed in via redirect.
          // onAuthStateChanged will handle setting the user state.
          toast({ title: 'Login Successful', description: `Welcome, ${result.user.email}!` });
          // Create user document right after redirect success
          createUserDocument(result.user).then(() => {
              router.push('/announcements');
          });
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
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUser(user);
            await createUserDocument(user); // Also check/create doc for persistent sessions
            await checkAdminRole(user);
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
  }, [router, toast, checkAdminRole, createUserDocument]);

  return { user, isAdmin, loading, handleSignOut };
}
