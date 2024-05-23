import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { FirebaseAuth } from '@/services/firebase/config';
import { useAuthStore } from '@/stores';

export const useCheckOut = () => {
  const { setUser, logout } = useAuthStore(state => ({
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
};
