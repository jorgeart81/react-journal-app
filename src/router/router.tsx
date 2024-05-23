import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layouts/AppLayout';
import { Home } from '../components/pages';
import { LoginPage, RegisterPage } from '../components/pages/auth';
import { useAuthStore } from '@/stores';

const status = useAuthStore.getState().status;

const freeRoutes = [
  {
    path: '/*',
    element: <Navigate to='/login' />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
];

const protectedRoutes = [
  ...freeRoutes,
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
];

export const router = createBrowserRouter(
  status === 'authenticated' ? protectedRoutes : freeRoutes
);
