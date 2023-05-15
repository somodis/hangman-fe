import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

// import { Montserrat, MontserratSemiBold, MontserratBold } from './fonts';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

// Let the theme object be available quickly during development
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log(theme);
}

export default theme;
