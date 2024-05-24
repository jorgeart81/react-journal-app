import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layouts/AppLayout';
import { Journal } from '../components/pages';
import { LoginPage, RegisterPage } from '../components/pages/auth';


export const router = createBrowserRouter([
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
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Journal />,
      },
    ],
  },
]);
