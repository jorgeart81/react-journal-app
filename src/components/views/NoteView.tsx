import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
} from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import type { Note } from '@/models';
import { ImageGallery } from '../ImageGallery';
import { AlertDialog } from '../dialogs';

interface Props {
  isSaving?: boolean;
  uid: string;
  note: Note;
  saveNote: (uid: string, note: Note) => void;
  setTempFiles: (files: FileList) => void;
  deleteNote: (uid: string, id: string) => void;
}

export const NoteView = ({
  isSaving,
  uid,
  note,
  saveNote,
  setTempFiles,
  deleteNote,
}: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [canUploadImages, setCanUploadImages] = useState(false);
  const [formState, setFormState] = useState(note);
  const { title, body, imageUrls, date } = formState;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    setFormState(note);
    setCanUploadImages(note.imageUrls.length < 6);
  }, [note]);

  const { handleSubmit, handleChange } = useFormik<Note>({
    initialValues: {
      body: body || '',
      date: date || 0,
      title: title || '',
      imageUrls: [],
    },
    onSubmit: (values: Note) => {
      saveNote(uid, {
        ...values,
        id: note.id,
        imageUrls: imageUrls,
        date: new Date().getTime(),
      });
    },
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    handleChange(e);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files?.length === 0) return;
    if (files.length + note.imageUrls.length > 6) {
      alert('Sólo puedes subir un máximo de 6 imágenes');
      return;
    }
    setTempFiles(files);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          color='primary'
          title='Subir imágenes'
          data-message='Botón para subir imágenes.'
          onClick={() => fileInputRef.current?.click()}
          disabled={isSaving || !canUploadImages}>
          <UploadFileOutlined />
        </IconButton>
        <input
          type='file'
          accept='.jpg, .jpeg, .png'
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
      </Grid>

      <form
        method='POST'
        style={{ width: '100%' }}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        noValidate>
        <Grid item>
          <Button
            type='submit'
            color='primary'
            sx={{ padding: 2 }}
            disabled={isSaving}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Grid>

        <Grid container position='relative'>
          <TextField
            type='text'
            variant='filled'
            label='Título'
            name='title'
            placeholder='Ingrese un título'
            value={title}
            onChange={onInputChange}
            sx={{ border: 'none', mb: 1 }}
            disabled={isSaving}
            fullWidth
          />
          <TextField
            type='text'
            variant='filled'
            name='body'
            placeholder='¿Qué sucedió en el día de hoy?'
            multiline
            minRows={5}
            value={body}
            onChange={onInputChange}
            disabled={isSaving}
            fullWidth
          />
          {isSaving && (
            <CircularProgress
              size={20}
              sx={{ position: 'absolute', right: 10, bottom: 10 }}
            />
          )}
        </Grid>
      </form>

      <Grid container justifyContent='end'>
        <Button
          type='button'
          sx={{ mt: 2 }}
          color='error'
          disabled={isSaving}
          onClick={() => setShowDialog(true)}>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <AlertDialog
        title={`Eliminar`}
        message={`¿Está seguro que quiere eliminar la nota ${note.title}?`}
        isShow={showDialog}
        handleClose={() => setShowDialog(false)}
        handleAgree={() => note.id && deleteNote(uid, note.id)}
      />

      <ImageGallery images={imageUrls} />
    </Grid>
  );
};
