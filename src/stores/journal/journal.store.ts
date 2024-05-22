import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Note } from './journal.interface';

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
}

const storeApi: StateCreator<
  JournalState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  isSaving: false,
  messageSaved: '',
  notes: [],

  // Actions
});

export const useJournalStore = create<JournalState & Actions>()(
  devtools(storeApi)
);
