import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { useAuthStore } from '@/stores';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { passwordRegex } from '@/utils/regex';

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

const registerValidate = yup.object().shape({
  username: yup
    .string()
    .max(50)
    .required('Nombre completo es un campo requerido.'),
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

export const RegisterPage = () => {
  const { status, errorMessage, registerUser } = useAuthStore(state => ({
    status: state.status,
    errorMessage: state.errorMessage,
    registerUser: state.registerUser,
  }));

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
  } = useFormik<RegisterParams>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: (values: RegisterParams) => {
      registerUser(values);
    },
    validationSchema: registerValidate,
  });

  return (
    <AuthLayout title='Registro'>
      <form method='POST' onSubmit={handleSubmit} noValidate>
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
              disabled={isAuthenticated}
              error={Boolean(touched.username && errors.username)}
              helperText={errors.username}
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
              disabled={isAuthenticated}
              error={Boolean(touched.email && errors.email)}
              helperText={errors.email}
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
              disabled={isAuthenticated}
              error={Boolean(touched.password && errors.password)}
              helperText={errors.password}
              autoComplete='off'
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={errorMessage ? '' : 'none'}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>

          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              disabled={isAuthenticated || !isValid}
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
