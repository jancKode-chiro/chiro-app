import { responsiveFontSizes } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

import { Breakpoints } from '../types/styles';

export const devices = {
  mobileS: `(min-width ${Breakpoints.mobileS})`,
  mobileM: `(min-width ${Breakpoints.mobileM})`,
  mobileL: `(min-width ${Breakpoints.mobileL})`,
  tablet: `(min-width ${Breakpoints.tablet})`,
  laptop: `(min-width ${Breakpoints.laptop})`,
  laptopL: `(min-width ${Breakpoints.laptopL})`,
  desktop: `(min-width ${Breakpoints.desktop})`,
};

// colors
const primary = '#b3294e';
const secondary = '#2DCC5A';
const black = '#343a40';

const background = '#f5f5f5';
const warningLight = 'rgba(253, 200, 69, .3)';
const warningMain = 'rgba(253, 200, 69, .5)';
const warningDark = 'rgba(253, 200, 69, .7)';

// border

// spacing
const spacing = 8;

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

const theme = createTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
    common: {
      black,
    },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark,
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: background,
    },
  },
  spacing,
  breakpoints: {
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  },
});

export default responsiveFontSizes(theme);
