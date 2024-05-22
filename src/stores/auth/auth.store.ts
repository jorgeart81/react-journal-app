import { SotorageKey } from '@/models';
import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Status = 'checking' | 'unauthorized' | 'authenticated';
export interface AuthState {
  status: Status;
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  errorMessage?: string;
}

interface Actions {
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}

const storeApi: StateCreator<
  AuthState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  status: 'unauthorized',

  // Actions
  loginUser: async (email: string, password: string) => {
    try {
      console.log({ email, password });
      set({ status: 'authenticated' });
    } catch (error) {
      // set({ status: 'unauthorized', user: undefined, token: undefined });
      throw 'Unauthorized, credentials are not valid.';
    }
  },
  registerUser: async (username: string, email: string, password: string) => {
    try {
      console.log({ username, email, password });
      set({ status: 'authenticated' });
    } catch (error) {
      // set({ status: 'unauthorized', user: undefined, token: undefined });
      throw 'Unauthorized, credentials are not valid.';
    }
  },
});

export const useAuthStore = create<AuthState & Actions>()(
  devtools(persist(storeApi, { name: SotorageKey.AUTH }))
);
