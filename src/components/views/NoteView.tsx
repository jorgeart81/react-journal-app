import { ChangeEvent, useEffect, useMemo, useState } from 'react';

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

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    setFormState(note);
  }, [note]);

  const { handleSubmit, handleChange } = useFormik<Note>({
    initialValues: {
      body: body || '',
      date: date || 0,
      imageUrls: imageUrls || [],
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
        <IconButton color='primary'>
          <UploadFileOutlined />
        </IconButton>
      </Grid>

      <form
        method='POST'
        style={{ width: '100%' }}
        onSubmit={handleSubmit}
        noValidate>
        <input type='file' multiple style={{ display: 'none' }} />
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
