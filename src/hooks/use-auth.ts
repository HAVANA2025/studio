
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

  const checkAdminRole = useCallback(async (user: User): Promise<boolean> => {
    if (!db) return false;
    
    // Check hardcoded list first
    if (user.email && adminEmails.includes(user.email)) {
        return true;
    }

    // Then check firestore
    const userDocRef = doc(db, 'users', user.uid);
    try {
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() && userDoc.data().role === 'Executive Board';
    } catch(e) {
        console.error("Could not check admin role from firestore", e);
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
                  photoURL: user.photoURL,
                  role: role,
                  createdAt: serverTimestamp(),
              });
          } catch(e) {
              console.error("Error creating user document", e);
               toast({
                title: 'Setup Error',
                description: 'Could not create user profile. Some features may not work.',
                variant: 'destructive',
              });
          }
      }
  }, [toast]);


  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }

    const processUser = async (user: User | null) => {
      if (user) {
        // This is the critical change: wait for the document to be created/verified
        await createUserDocument(user); 
        const isAdmin = await checkAdminRole(user);
        
        setUser(user);
        setIsAdmin(isAdmin);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    // First, check if we are returning from a redirect login flow
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          toast({ title: 'Login Successful', description: `Welcome, ${result.user.email}!` });
          // processUser will handle setting state and creating docs
        }
      })
      .catch((error: AuthError) => {
        console.error("Redirect result error:", error);
        toast({
          title: 'Login Failed',
          description: `An error occurred during sign-in: ${error.message}`,
          variant: 'destructive',
        });
      })
      .finally(() => {
         const unsubscribe = onAuthStateChanged(auth, processUser);
         return () => unsubscribe();
      });

  }, [toast, checkAdminRole, createUserDocument]);

  return { user, isAdmin, loading, handleSignOut };
}
