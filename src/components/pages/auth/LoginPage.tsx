import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useFormik } from 'formik';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useAuthStore } from '@/stores';
import * as yup from 'yup';
import { passwordRegex } from '@/utils/regex';

interface LoginParams {
  email: string;
  password: string;
}

const loginValidate = yup.object().shape({
  email: yup
    .string()
    .email('El Correo tiene un formato invalido.')
    .required('Correo es un campo requerido.'),
  password: yup
    .string()
    .trim()
    .min(6, 'La Contraseña debe tener un mínimo de 6 caracters')
    .max(50)
    .required('Contraseña es un campo requerido.')
    .matches(
      passwordRegex,
      'La Contraseña debe tener una letra mayúscula, minúscula y un número.'
    ),
});

export const LoginPage = () => {
  const { status, errorMessage, loginUser, onGoogleSingIn } = useAuthStore(
    state => ({
      status: state.status,
      errorMessage: state.errorMessage,
      loginUser: state.loginUser,
      onGoogleSingIn: state.onGoogleSingIn,
    })
  );

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
  } = useFormik<LoginParams>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values: LoginParams) => {
      loginUser(values.email, values.password).catch(error => {
        console.log(error);
      });
    },
    validationSchema: loginValidate,
  });

  return (
    <AuthLayout title='Login'>
      <form method='POST' onSubmit={handleSubmit}>
        <Grid container direction='column' spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Correo'
              type='email'
              name='email'
              placeholder='correo@google.com'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isAuthenticated}
              error={Boolean(touched.email && errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Contraseña'
              type='password'
              name='password'
              placeholder='Contraseña'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isAuthenticated}
              error={Boolean(touched.password && errors.password)}
              helperText={errors.password}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={errorMessage ? '' : 'none'}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type='submit'
              variant='contained'
              disabled={isAuthenticated || !isValid}
              fullWidth>
              Login
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant='contained'
              onClick={onGoogleSingIn}
              disabled={isAuthenticated}
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
