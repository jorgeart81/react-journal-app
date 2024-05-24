import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { FirebaseAuth } from '@/services/firebase/config';
import { useAuthStore, useJournalStore } from '@/stores';

export const useCheckOut = () => {
  const { status, user, setUser, logout } = useAuthStore(state => ({
    status: state.status,
    user: state.user,
    setUser: state.setUser,
    logout: state.logout,
  }));
  const { startLoadingNotes } = useJournalStore(state => ({
    startLoadingNotes: state.startLoadingNotes,
  }));

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async user => {
      if (!user) {
        await logout();
        return;
      }
      setUser(user);
      startLoadingNotes(user.uid);
    });
  }, []);

  return {
    isAuthenticated: status === 'authenticated',
    user,
    logout,
  };
};
