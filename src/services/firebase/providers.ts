import { FirebaseAuth } from '@/services/firebase/config';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(FirebaseAuth, googleProvider);
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const errorMessage = firebaseError.message;
    console.error(error);

    throw new Error(errorMessage);
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
