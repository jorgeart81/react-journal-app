import { NoteView, NothingSelectedView } from '../views';
import { FloatingActionButton } from '../buttons';
import { useAuthStore, useJournalStore } from '@/stores';

export const Journal = () => {
  const uid = useAuthStore.getState().user?.uid;

  const { isSaving, startNewNote } = useJournalStore(state => ({
    isSaving: state.isSaving,
    startNewNote: state.startNewNote,
  }));

  const addNewNote = () => {
    if (!uid) return;
    startNewNote(uid);
  };

  return (
    <>
      {/* <NoteView/> */}
      <NothingSelectedView />

      <FloatingActionButton onClick={addNewNote} disabled={isSaving} />
    </>
  );
};
