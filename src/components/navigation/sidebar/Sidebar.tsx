import { Box, Drawer, Toolbar, Typography, Divider, List } from '@mui/material';
import { SidebarItem } from './SidebarItem';

interface Props {
  drawerWidth?: number;
}
export const Sidebar = ({ drawerWidth = 240 }: Props) => {
  return (
    <Box
      component='nav'
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant='permanent' //temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}>
        <Toolbar>
          <Typography variant='h5' noWrap component='div'>
            {'Jorge'}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <SidebarItem title='item1' description='description1' />
        </List>
      </Drawer>
    </Box>
  );
};
