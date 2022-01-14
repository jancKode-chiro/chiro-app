import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button, MuiThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles'

const ColoredButton = (props: any) => {
  const { color, children, theme } = props;
  const buttonTheme = createTheme({
    ...theme,
    palette: {
      primary: {
        main: color
      }
    }
  });
  const buttonProps = (({ color, theme, children, ...o }) => o)(props);
  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Button {...buttonProps} color="primary">
        {children}
      </Button>
    </MuiThemeProvider>
  );
}

export default memo(ColoredButton);
