import { Link as RouterLink } from 'react-router-dom';

import { useFormik } from 'formik';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useAuthStore } from '@/stores';

interface LoginParams {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { loginUser } = useAuthStore(state => ({
    loginUser: state.loginUser,
  }));

  const { handleSubmit, handleChange, handleBlur, values } =
    useFormik<LoginParams>({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: (values: LoginParams) => {
        loginUser(values.email, values.password).catch(error => {
          console.log(error);
        });
      },
    });

  return (
    <AuthLayout title='Login'>
      <form method='POST' onSubmit={handleSubmit}>
        <Grid container direction='column' spacing={2}>
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
              type='submit'
              variant='contained'
              disabled={false}
              fullWidth>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container direction='row' justifyContent='end'>
        <Link
          unstable_viewTransition
          to={'/register'}
          component={RouterLink}
          color='inherit'
          justifyContent='end'>
          Crear una cuenta
        </Link>
      </Grid>
    </AuthLayout>
  );
};
