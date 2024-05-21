import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../components/pages';
import { LoginPage, RegisterPage } from '../components/pages/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
