import { Grid, Typography } from '@mui/material';
import { useAuthStore } from '@/stores';
import { CircularIndeterminate } from '../progress';

interface AuthLayoutProps {
  children: JSX.Element | JSX.Element[];
  title: string;
}
export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  const { status } = useAuthStore(state => ({
    status: state.status,
  }));

  return (
    <>
      {status === 'checking' && <CircularIndeterminate />}
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{
          minHeight: '100dvh',
          backgroundColor: 'primary.main',
          padding: 4,
        }}>
        <Grid
          item
          className='box-shadow'
          xs={3}
          sx={{
            width: { md: 450 },
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
          }}>
          <Typography variant='h5' sx={{ mb: 3 }}>
            {title}
          </Typography>

          {children}
        </Grid>
      </Grid>
    </>
  );
};
