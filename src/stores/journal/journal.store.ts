import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createNewNote, loadingNotes, saveNote } from '@/services/firebase';
import type { Note } from './journal.interface';
import { ImagesService } from '@/services/images';

interface JournalState {
  activeNote?: Note;
  isSaving: boolean;
  messageSaved?: string;
  notes: Note[];
  tempFiles?: FileList;
}

interface Actions {
  // addNewEmptyNote: () => void;
  setActiveNote: (id?: string) => void;
  // setNotes: () => void;
  startNewNote: (uid: string) => void;
  updateNote: (uid: string, note: Note) => void;
  startLoadingNotes: (uid: string) => void;
  setTempFiles: (files: FileList) => void;
  resetMessageSaved: () => void;
}

const storeApi: StateCreator<
  JournalState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  isSaving: false,
  notes: [],

  // Actions
  setActiveNote: (id?: string) => {
    const messageSaved = get().notes;
    if (messageSaved) set({ messageSaved: undefined });
    if (!id) return;

    const notes = get().notes;
    const selectedNote = notes.find(note => note.id === id);
    set({ activeNote: selectedNote });
  },
  startNewNote: async (uid: string) => {
    set({ isSaving: true, messageSaved: undefined });
    const newNote: Note = {
      body: '',
      date: new Date().getTime(),
      imageUrls: [],
      title: '',
    };
    const notes = get().notes;

    try {
      const resp = await createNewNote({ uid: uid, note: newNote });
      newNote.id = resp.id;
      notes.push(newNote);

      set({
        isSaving: false,
        notes: notes,
        activeNote: newNote,
        messageSaved: `${newNote.title}, creada correctamente`,
      });
    } catch (error) {
      set({ isSaving: false, messageSaved: undefined });
      const err = error as Error;
      throw `${err.message}`;
    }
  },
  updateNote: async (uid: string, note: Note) => {
    const fileUploadPromises: Array<Promise<string>> = [];
    const files = get().tempFiles;
    set({ isSaving: true, messageSaved: undefined });

    try {
      let photosUrls: string[] = [];
      if (files) {
        for (const file of files) {
          fileUploadPromises.push(ImagesService.fileUpload(file));
        }
        photosUrls = await Promise.all(fileUploadPromises);
      }

      const updatedNote = {
        ...note,
        imageUrls: [...note.imageUrls, ...photosUrls],
      };
      await saveNote({ uid, note: updatedNote });

      const notes = get().notes.map(n => {
        if (n.id === note.id) return note;
        return n;
      });

      set({
        isSaving: false,
        activeNote: note,
        notes,
        messageSaved: `${note.title}, actualizada correctamente`,
      });
    } catch (error) {
      set({ isSaving: false, messageSaved: undefined });
      const err = error as Error;
      throw `${err.message}`;
    }
  },
  startLoadingNotes: async (uid: string) => {
    try {
      const { notes } = await loadingNotes(uid);
      set({ notes });
    } catch (error) {
      const err = error as Error;
      throw `${err.message}`;
    }
  },
  setTempFiles: (files: FileList) => {
    set({ tempFiles: files });
  },
  resetMessageSaved: () => {
    set({ messageSaved: undefined });
  },
});

export const useJournalStore = create<JournalState & Actions>()(
  devtools(storeApi)
);
