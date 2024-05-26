import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';

import { FirebaseError } from 'firebase/app';
import { FirebaseDB } from '../config';
import type {
  CreateNewNoteRequest,
  DeleteNoteRequest,
  LoadingNotesResponse,
  SaveNoteRequest,
} from '../firebase.interface';
import { Note } from '@/stores/journal/journal.interface';

export const createNewNote = async ({ uid, note }: CreateNewNoteRequest) => {
  try {
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, note);
    return newDoc;
  } catch (error) {
    errorHandler(error);
  }
};

export const loadingNotes = async (
  uid: string
): Promise<LoadingNotesResponse> => {
  try {
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const { docs } = await getDocs(collectionRef);
    const notes = docs.map(doc => ({ id: doc.id, ...doc.data() })) as Note[];
    return { notes };
  } catch (error) {
    errorHandler(error);
  }
};

export const saveNote = async ({ uid, note }: SaveNoteRequest) => {
  const { id, ...noteToFireStore } = note;
  try {
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
  } catch (error) {
    errorHandler(error);
  }
};

export const deleteNote = async ({
  uid,
  id,
}: DeleteNoteRequest): Promise<void> => {
  try {
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
    await deleteDoc(docRef);
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
