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
}

export const SidebarItem = ({ title, description }: Props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => {}}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={title} />
          <ListItemText secondary={description} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
