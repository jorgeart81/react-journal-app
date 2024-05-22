import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../ImageGallery';

export const NoteView = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {'dateString'}
        </Typography>
      </Grid>
      <Grid item>
        <input type='file' multiple style={{ display: 'none' }} />

        <IconButton color='primary'>
          <UploadFileOutlined />
        </IconButton>
      </Grid>
      <Grid item>
        <Button color='primary' sx={{ padding: 2 }}>
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
          fullWidth
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button sx={{ mt: 2 }} color='error'>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Galleria de imágenes */}
      <ImageGallery
        images={[
          'https://images.pexels.com/photos/22484384/pexels-photo-22484384/free-photo-of-madera-ciudad-calle-edificio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ]}
      />
    </Grid>
  );
};
