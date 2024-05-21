import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import { AppTheme } from './theme';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppTheme>
      <RouterProvider router={router} />
    </AppTheme>
  </React.StrictMode>
);
