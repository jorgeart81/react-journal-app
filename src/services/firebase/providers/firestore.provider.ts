import { collection, doc, setDoc } from 'firebase/firestore/lite';

import type { CreateNewNoteRequest } from '../firebase.interface';
import { FirebaseDB } from '../config';
import { FirebaseError } from 'firebase/app';

export const createNewNote = async ({ uid, note }: CreateNewNoteRequest) => {
  try {
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, note);
    return newDoc;
  } catch (error) {
    errorHandler(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHandler(error: any): never {
  const firebaseError = error as FirebaseError;
  const errorMessage = firebaseError.message;
  console.error(error);

  throw new Error(errorMessage);
}
