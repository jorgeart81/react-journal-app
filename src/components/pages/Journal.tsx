import { NoteView, NothingSelectedView } from '../views';
import { FloatingActionButton } from '../buttons';
import { useAuthStore, useJournalStore } from '@/stores';
import { BasicModal } from '../modals';

export const Journal = () => {
  const uid = useAuthStore.getState().user?.uid;

  const {
    activeNote,
    isSaving,
    messageSaved,
    startNewNote,
    updateNote,
    resetMessageSaved,
  } = useJournalStore(state => ({
    activeNote: state.activeNote,
    isSaving: state.isSaving,
    messageSaved: state.messageSaved,
    startNewNote: state.startNewNote,
    updateNote: state.updateNote,
    resetMessageSaved: state.resetMessageSaved,
  }));

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
      {messageSaved && (
        <BasicModal
          showModal={messageSaved.length > 0}
          message={messageSaved}
          handleClose={resetMessageSaved}
        />
      )}
    </>
  );
};
