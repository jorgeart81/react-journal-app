import { NoteView, NothingSelectedView } from '../views';
import { FloatingActionButton } from '../buttons';
import { useAuthStore, useJournalStore } from '@/stores';

export const Journal = () => {
  const uid = useAuthStore.getState().user?.uid;

  const { activeNote, isSaving, notes, startNewNote } = useJournalStore(
    state => ({
      activeNote: state.activeNote,
      isSaving: state.isSaving,
      notes: state.notes,
      startNewNote: state.startNewNote,
    })
  );

  const addNewNote = () => {
    if (!uid) return;
    startNewNote(uid);
  };

  return (
    <>
      {activeNote ? <NoteView /> : <NothingSelectedView />}

      <FloatingActionButton onClick={addNewNote} disabled={isSaving} />
    </>
  );
};
