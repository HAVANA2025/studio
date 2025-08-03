import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, adminEmails } from '@/lib/firebase';

type AuthState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    try {
        const userJson = localStorage.getItem('user');
        const isAdminJson = localStorage.getItem('isAdmin');
        if (userJson && isAdminJson) {
            const user = JSON.parse(userJson);
            const isAdmin = JSON.parse(isAdminJson);
            setAuthState({ user, isAdmin, loading: false });
        } else {
            setAuthState(prevState => ({ ...prevState, loading: false }));
        }
    } catch(e) {
        setAuthState(prevState => ({ ...prevState, loading: false }));
    }
  }, []);

  return authState;
}
