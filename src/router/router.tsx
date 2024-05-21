import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../components/pages';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);
