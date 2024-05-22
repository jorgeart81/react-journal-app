import { Link as RouterLink } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

export const RegisterPage = () => {
  return (
    <AuthLayout title='Registro'>
      <form>
        <Grid container direction='column' spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Nombre completo'
              type='text'
              name='username'
              placeholder='John Wick'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Correo'
              type='email'
              name='email'
              placeholder='correo@google.com'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Contraseña'
              type='password'
              name='password'
              placeholder='Contraseña'
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          {/* <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
        <Alert severity='error'>
          {errorMessage}
        </Alert>
      </Grid> */}
          <Grid item xs={12} sm={6}>
            <Button
              type='submit'
              variant='contained'
              disabled={false}
              fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant='contained'
              disabled={false}
              onClick={() => {}}
              fullWidth>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container direction='row' justifyContent='end'>
        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
        <Link
          unstable_viewTransition
          to={'/login'}
          component={RouterLink}
          color='inherit'
          justifyContent='end'>
          Ingresar aquí
        </Link>
      </Grid>
    </AuthLayout>
  );
};
