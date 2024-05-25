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
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';

import type { Note } from '@/models';
import { ImageGallery } from '../ImageGallery';

interface Props {
  uid: string;
  note: Note;
  saveNote: (uid: string, note: Note) => void;
}

export const NoteView = ({ uid, note, saveNote }: Props) => {
  const [formState, setFormState] = useState(note);
  const { title, body, imageUrls, date } = formState;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    setFormState(note);
  }, [note]);

  const { handleSubmit, handleChange, setFieldValue } = useFormik<Note>({
    initialValues: {
      body: body || '',
      date: date || 0,
      imageUrls: [],
      title: title || '',
    },
    onSubmit: (values: Note) => {
      saveNote(uid, { ...values, id: note.id, date: new Date().getTime() });
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
    if (e.target.files?.length === 0) return;
    setFieldValue('imageUrls', e.target.files);
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
          onClick={() => fileInputRef.current?.click()}>
          <UploadFileOutlined />
        </IconButton>
      </Grid>

      <form
        method='POST'
        style={{ width: '100%' }}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        noValidate>
        <input
          name='imageUrls'
          type='file'
          accept='.jpg, .jpeg, .png'
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        <Grid item>
          <Button type='submit' color='primary' sx={{ padding: 2 }}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Grid>

        <Grid container>
          <TextField
            type='text'
            variant='filled'
            label='Título'
            name='title'
            placeholder='Ingrese un título'
            value={title}
            onChange={onInputChange}
            sx={{ border: 'none', mb: 1 }}
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
            fullWidth
          />
        </Grid>
      </form>

      <Grid container justifyContent='end'>
        <Button type='button' sx={{ mt: 2 }} color='error' onClick={() => {}}>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Galleria de imágenes */}
      <ImageGallery images={imageUrls} />
    </Grid>
  );
};
