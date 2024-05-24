import { NoteView, NothingSelectedView } from '../views';
import { FloatingActionButton } from '../buttons';
import { useAuthStore, useJournalStore } from '@/stores';

export const Journal = () => {
  const uid = useAuthStore.getState().user?.uid;

  const { activeNote, isSaving, startNewNote, updateNote } = useJournalStore(
    state => ({
      activeNote: state.activeNote,
      isSaving: state.isSaving,
      startNewNote: state.startNewNote,
      updateNote: state.updateNote,
    })
  );

  const addNewNote = () => {
    if (!uid) return;
    startNewNote(uid);
  };

  return (
    <>
      {uid && activeNote ? (
        <NoteView uid={uid} note={activeNote} saveNote={updateNote} />
      ) : (
        <NothingSelectedView />
      )}

      <FloatingActionButton onClick={addNewNote} disabled={isSaving} />
    </>
  );
};
