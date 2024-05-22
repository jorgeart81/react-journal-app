import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Note } from './journal.interface';

interface JournalState {
  isSaving: boolean;
  notes: Note[];
}

interface Actions {
  // increment: (value: number) => void;
}

const storeApi: StateCreator<
  JournalState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  isSaving: false,
  notes: [],

  // Actions
});

export const useJournalStore = create<JournalState & Actions>()(
  devtools(storeApi)
);
