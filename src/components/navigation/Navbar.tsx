import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';

interface Props {
  drawerWidth?: number;
}

export const Navbar = ({ drawerWidth = 240 }: Props) => (
  <AppBar
    position='fixed'
    sx={{
      width: { md: `calc(100% - ${drawerWidth}px)` },
    }}>
    <Toolbar>
      <IconButton
        color='inherit'
        edge='start'
        sx={{ mr: 2, display: { sm: 'none' } }}>
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
        <IconButton color='error' onClick={() => {}}>
          <LogoutOutlined />
        </IconButton>
      </Grid>
    </Toolbar>
  </AppBar>
);
