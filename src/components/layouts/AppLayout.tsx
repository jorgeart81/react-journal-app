import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../navigation';
import { Sidebar } from '../navigation/sidebar/Sidebar';
import { useCheckOut } from '@/hooks';
import { useEffect } from 'react';

const drawerWidth = 240;

export const AppLayout = () => {
  const { isAuthenticated, logout } = useCheckOut();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <Box
      sx={{
        height: '100dvh',
        display: { md: 'grid' },
        gridTemplateColumns: `${drawerWidth}px 1fr`,
        gridTemplateRows: '64px 1fr',
        gridTemplateAreas: `
        "sidebar navbar"
        "sidebar body"
        `,
      }}>
      <Box sx={{ gridArea: 'navbar', height: { xs: '56px', sm: '64px' } }}>
        <Navbar drawerWidth={drawerWidth} handleLogout={logout} />
      </Box>
      <Box sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
        <Sidebar drawerWidth={drawerWidth} />
      </Box>
      <Box
        component='main'
        sx={{
          gridArea: 'body',
          display: 'flex',
          width: '100%',
          padding: 2,
          minHeight: { xs: `calc(100dvh - 56px)`, sm: `calc(100dvh - 64px)` },
        }}>
        <Outlet />
      </Box>
    </Box>
  );
};
