import { createTheme  } from '@material-ui/core/styles';
import orange from "@material-ui/core/colors/deepOrange";
import pink from "@material-ui/core/colors/pink";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[400],
    },
    secondary: {
      main: pink[400],
    },
  },
});

export default theme;
