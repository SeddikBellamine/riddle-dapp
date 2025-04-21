import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffd209',
      contrastText: '#000',
    },
    secondary: {
      main: '#4caf50',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'black',
          boxShadow: '6px 6px rgba(0,0,0,1)',
          border: '1px solid black',
          borderRadius: '0px',
        },
        containedPrimary: {
          backgroundColor: '#ffd209',
          color: 'black',
          '&:hover': {
            backgroundColor: '#ffd209',
          },
          '&:active': {
            backgroundColor: '#ffd209',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#388e3c',
          },
        },
      },
    },
  },
});

export default theme;
