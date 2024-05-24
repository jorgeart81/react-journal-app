import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createNewNote, loadingNotes } from '@/services/firebase';
import type { Note } from './journal.interface';

interface JournalState {
  activeNote?: Note;
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
}

interface Actions {
  // addNewEmptyNote: () => void;
  setActiveNote: (id?: string) => void;
  // setNotes: () => void;
  // updateNote: () => void;
  startNewNote: (uid: string) => void;
  startLoadingNotes: (uid: string) => void;
}

const storeApi: StateCreator<
  JournalState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  isSaving: false,
  messageSaved: '',
  notes: [],

  // Actions
  setActiveNote: (id?: string) => {
    if (!id) return;
    const notes = get().notes;
    const selectedNote = notes.find(note => note.id === id);
    set({ activeNote: selectedNote });
  },
  startNewNote: async (uid: string) => {
    const newNote: Note = {
      body: '',
      date: new Date().getTime(),
      imageUrls: [],
      title: '',
    };
    set({ isSaving: true });
    const notes = get().notes;

    try {
      const resp = await createNewNote({ uid: uid, note: newNote });
      newNote.id = resp.id;
      notes.push(newNote);

      set({ isSaving: false, notes: notes, activeNote: newNote });
    } catch (error) {
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
});

export const useJournalStore = create<JournalState & Actions>()(
  devtools(storeApi)
);
