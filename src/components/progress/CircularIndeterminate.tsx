import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const CircularIndeterminate = () => {
  return (
    <Box
      color='primary'
      sx={{
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '100dvh',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.060)',
      }}>
      <CircularProgress />
    </Box>
  );
};
