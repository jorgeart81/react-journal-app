import type { UserStore } from '../authStore.interface';
import type { User } from 'firebase/auth/cordova';

export const userStoreAdapter = (user: User): UserStore => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};
