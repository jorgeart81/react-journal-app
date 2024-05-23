import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { FirebaseAuth } from '@/services/firebase/config';
import { useAuthStore } from '@/stores';

export const useCheckOut = () => {
  const { status, setUser, logout } = useAuthStore(state => ({
    status: state.status,
    setUser: state.setUser,
    logout: state.logout,
  }));

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async user => {
      if (!user) {
        await logout();
        return;
      }
      setUser(user);
    });
  }, []);

  return {
    isAuthenticated: status === 'authenticated',
    logout,
  };
};
