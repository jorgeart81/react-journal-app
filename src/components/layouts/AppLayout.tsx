import { useCheckOut } from '@/hooks';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../navigation';
import { Sidebar } from '../navigation/sidebar/Sidebar';
import { useJournalStore } from '@/stores';

const drawerWidth = 240;

export const AppLayout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useCheckOut();
  const clearState = useJournalStore(state => state.clearState);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    clearState();
  };

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
        <Navbar drawerWidth={drawerWidth} handleLogout={handleLogout} />
      </Box>
      <Box sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
        <Sidebar
          userName={user?.displayName ?? 'User'}
          drawerWidth={drawerWidth}
        />
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
