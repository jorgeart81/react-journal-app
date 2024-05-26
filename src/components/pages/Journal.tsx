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
    setTempFiles,
    updateNote,
    resetMessageSaved,
  } = useJournalStore(state => ({
    activeNote: state.activeNote,
    isSaving: state.isSaving,
    messageSaved: state.messageSaved,
    startNewNote: state.startNewNote,
    setTempFiles: state.setTempFiles,
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
        <NoteView
          uid={uid}
          note={activeNote}
          saveNote={updateNote}
          setTempFiles={setTempFiles}
          isSaving={isSaving}
        />
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
