import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';

interface Props {
  drawerWidth?: number;
  handleLogout: React.MouseEventHandler;
  toogleMenu?: React.MouseEventHandler;
}

export const Navbar = ({
  drawerWidth = 240,
  handleLogout,
  toogleMenu,
}: Props) => (
  <AppBar
    position='fixed'
    sx={{
      width: { md: `calc(100% - ${drawerWidth}px)` },
    }}>
    <Toolbar>
      <IconButton
        color='inherit'
        edge='start'
        onClick={toogleMenu}
        sx={{ mr: 2, display: { md: 'none' } }}>
        <MenuOutlined></MenuOutlined>
      </IconButton>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Typography variant='h6' noWrap component='div'>
          JournalApp
        </Typography>
        <IconButton color='error' onClick={handleLogout}>
          <LogoutOutlined />
        </IconButton>
      </Grid>
    </Toolbar>
  </AppBar>
);
