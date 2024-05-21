import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';

interface Props {
  children: JSX.Element;
}

export const AppTheme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
