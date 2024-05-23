import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { signInWithGoogle } from '@/services/firebase';
import type { UserStore } from './authStore.interface';
import { SotorageKey } from '@/models';

type Status = 'checking' | 'unauthorized' | 'authenticated';

interface AuthState {
  status: Status;
  user?: UserStore;
  errorMessage?: string;
}

interface Actions {
  loginUser: (email: string, password: string) => Promise<void>;
  onGoogleSingIn: () => Promise<void>;
  registerUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const storeApi: StateCreator<
  AuthState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  user: undefined,
  status: 'unauthorized',

  // Actions
  loginUser: async (email: string, password: string) => {
    set({ status: 'checking' });

    try {
      console.log({ email, password });
      // set({ status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthorized' });
      throw 'Unauthorized, credentials are not valid.';
    }
  },
  onGoogleSingIn: async () => {
    try {
      const user = await signInWithGoogle();
      set({ status: 'authenticated', user });
    } catch (error) {
      const err = error as Error;
      set({
        status: 'unauthorized',
        user: undefined,
        errorMessage: err.message,
      });
    }
  },
  registerUser: async (username: string, email: string, password: string) => {
    set({ status: 'checking' });

    try {
      console.log({ username, email, password });
      set({ status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthorized' });
      throw 'Unauthorized, credentials are not valid.';
    }
  },
  logout: async () => {},
});

export const useAuthStore = create<AuthState & Actions>()(
  devtools(persist(storeApi, { name: SotorageKey.AUTH }))
);
