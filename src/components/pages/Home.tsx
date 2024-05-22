import { NoteView, NothingSelectedView } from '../views';
import { FloatingActionButton } from '../buttons';

export const Home = () => {
  return (
    <>
      {/* <NoteView/> */}
      <NothingSelectedView />

      <FloatingActionButton onClick={() => {}} disabled={false} />
    </>
  );
};
