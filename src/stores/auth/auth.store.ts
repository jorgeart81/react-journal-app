import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import {
  loginInWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from '@/services/firebase';
import type { LoginUser, RegisterUser, UserStore } from './authStore.interface';
import { SotorageKey } from '@/models';
import { userStoreAdapter } from './adapters/userStore.adapter';

type Status = 'checking' | 'unauthorized' | 'authenticated';

interface AuthState {
  status: Status;
  user?: UserStore;
  errorMessage?: string;
}

interface Actions {
  setUser: (user: UserStore) => void;
  onGoogleSingIn: () => Promise<void>;
  loginUser: (values: LoginUser) => Promise<void>;
  registerUser: (values: RegisterUser) => Promise<void>;
  logout: () => Promise<void>;
}

const storeApi: StateCreator<
  AuthState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  user: undefined,
  status: 'unauthorized',

  // Actions
  setUser: (user: UserStore) => {
    const newUser = userStoreAdapter(user);
    set({ user: newUser });
  },
  onGoogleSingIn: async () => {
    set({ status: 'checking' });
    try {
      const user = await signInWithGoogle();
      set({
        status: 'authenticated',
        user: userStoreAdapter(user),
        errorMessage: undefined,
      });
    } catch (error) {
      const err = error as Error;
      set({
        status: 'unauthorized',
        user: undefined,
        errorMessage: err.message,
      });
    }
  },
  loginUser: async (values: LoginUser) => {
    set({ status: 'checking' });

    try {
      const user = await loginInWithEmailAndPassword(values);
      set({
        status: 'authenticated',
        user: userStoreAdapter(user),
        errorMessage: undefined,
      });
    } catch (error) {
      const err = error as Error;
      set({
        status: 'unauthorized',
        user: undefined,
        errorMessage: err.message,
      });
    }
  },
  registerUser: async ({ username, email, password }: RegisterUser) => {
    set({ status: 'checking' });

    try {
      const user = await registerUserWithEmailAndPassword({
        displayName: username,
        email: email,
        password: password,
      });
      set({
        status: 'authenticated',
        user: userStoreAdapter(user),
        errorMessage: undefined,
      });
    } catch (error) {
      const err = error as Error;
      set({
        status: 'unauthorized',
        user: undefined,
        errorMessage: err.message,
      });
    }
  },
  logout: async () => {
    await logoutFirebase();
    set({ status: 'unauthorized', user: undefined, errorMessage: undefined });
  },
});

export const useAuthStore = create<AuthState & Actions>()(
  devtools(persist(storeApi, { name: SotorageKey.AUTH }))
);
