import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface Props {
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export const FloatingActionButton = ({ disabled, onClick }: Props) => {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      size='large'
      sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
        ':disabled':{ backgroundColor: 'error.main', opacity: 0.5, color:'white' },
        position: 'fixed',
        right: { xs: 40, sm: 50, xl: 60 },
        bottom: { xs: 40, sm: 50, xl: 60 },
      }}>
      <AddOutlined sx={{ fontSize: { xs: 25, sm: 30 } }} />
    </IconButton>
  );
};
