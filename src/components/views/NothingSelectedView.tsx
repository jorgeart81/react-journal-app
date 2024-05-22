import { StarOutline } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minWidth='100%'
      minHeight='100%'
      sx={{ backgroundColor: 'primary.main', borderRadius: 2, padding: 4 }}>
      <Box component='div'>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Box>
      <Box component='div'>
        <Typography variant='h5' textAlign='center' color='white'>
          Selecciona o crea una entrada
        </Typography>
      </Box>
    </Box>
  );
};
