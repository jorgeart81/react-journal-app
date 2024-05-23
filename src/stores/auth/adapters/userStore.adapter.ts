import type { UserStore } from '../authStore.interface';

export const userStoreAdapter = (user: any): UserStore => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};
