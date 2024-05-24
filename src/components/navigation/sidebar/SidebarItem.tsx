import { useMemo } from 'react';
import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface Props {
  title: string;
  description: string;
  onClick?: React.MouseEventHandler;
}

export const SidebarItem = ({ title, description, onClick }: Props) => {
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 7) : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={description} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
