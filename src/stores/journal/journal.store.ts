import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createNewNote } from '@/services/firebase';
import type { Note } from './journal.interface';

interface JournalState {
  active?: Note;
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
}

interface Actions {
  // addNewEmptyNote: () => void;
  // setActiveNote: () => void;
  // setNotes: () => void;
  // updateNote: () => void;
  startNewNote: (uid: string) => void;
}

const storeApi: StateCreator<
  JournalState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  isSaving: false,
  messageSaved: '',
  notes: [],

  // Actions
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

      set({ isSaving: false, notes: notes, active: newNote });
    } catch (error) {
      const err = error as Error;
      throw `${err.message}`;
    }
  },
});

export const useJournalStore = create<JournalState & Actions>()(
  devtools(storeApi)
);
