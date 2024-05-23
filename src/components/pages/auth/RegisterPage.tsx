import { Link as RouterLink } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useAuthStore } from '@/stores';
import { useFormik } from 'formik';

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const { registerUser } = useAuthStore(state => ({
    registerUser: state.registerUser,
  }));

  const { handleSubmit, handleChange, handleBlur, values, isSubmitting } =
    useFormik<RegisterParams>({
      initialValues: {
        username: '',
        email: '',
        password: '',
      },
      onSubmit: ({ username, email, password }: RegisterParams) => {
        registerUser(username, email, password).catch(error => {
          console.log(error);
        });
      },
    });

  return (
    <AuthLayout title='Registro'>
      <form method='POST' onSubmit={handleSubmit}>
        <Grid container direction='column' spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Nombre completo'
              type='text'
              name='username'
              placeholder='John Wick'
              fullWidth
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Correo'
              type='email'
              name='email'
              placeholder='correo@google.com'
              fullWidth
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Contraseña'
              type='password'
              name='password'
              placeholder='Contraseña'
              fullWidth
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          {/* <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
        <Alert severity='error'>
          {errorMessage}
        </Alert>
      </Grid> */}

          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              disabled={isSubmitting}
              fullWidth>
              Crear Cuenta
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
