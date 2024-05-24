import { useJournalStore } from '@/stores';
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { SidebarItem } from './SidebarItem';

interface Props {
  drawerWidth?: number;
  userName?: string;
}
export const Sidebar = ({ drawerWidth = 240, userName = 'User' }: Props) => {
  const { notes, setActiveNote } = useJournalStore(state => ({
    notes: state.notes,
    setActiveNote: state.setActiveNote,
  }));

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
            {userName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes?.map(note => (
            <SidebarItem
              title={note.body}
              description={note.body}
              onClick={() => setActiveNote(note.id)}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
