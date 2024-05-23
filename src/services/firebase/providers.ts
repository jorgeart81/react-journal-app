import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import type { User } from 'firebase/auth/cordova';

import { FirebaseAuth } from '@/services/firebase/config';
import type { LoginRequest, RegisterRequest } from './firebase.interface';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const { user } = await signInWithPopup(FirebaseAuth, googleProvider);
    return user;
  } catch (error) {
    errorHandler(error);
  }
};

export const loginInWithEmailAndPassword = async (request: LoginRequest) => {
  const { email, password } = request;

  try {
    const { user } = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    return user;
  } catch (error) {
    errorHandler(error);
  }
};

export const registerUserWithEmailAndPassword = async (
  request: RegisterRequest
) => {
  const { displayName, email, password } = request;

  try {
    const { user } = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    if (FirebaseAuth.currentUser)
      await updateProfile(FirebaseAuth.currentUser, { displayName });

    return user;
  } catch (error) {
    errorHandler(error);
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

function errorHandler(error: any): never {
  const firebaseError = error as FirebaseError;
  const errorMessage = firebaseError.message;
  console.error(error);

  throw new Error(errorMessage);
}
