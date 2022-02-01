import React from "react";

import { withStyles } from "@material-ui/core";

const styles = (theme: any) => ({
  wrapper: {
    border: `50px`
  },
  greyed: {
    border: `${theme.border.borderWidth}px solid rgba(0, 0, 0, 0.23)`
  }
});

function Bordered(props: any) {
  const {
    classes,
    theme,
    disableVerticalPadding,
    disableBorderRadius,
    children,
    variant
  } = props;
  return (
    <div
      className={variant === "greyed" ? classes.greyed : classes.wrapper}
      style={{
        paddingLeft: disableVerticalPadding ? 0 : theme.spacing(2),
        paddingRight: disableVerticalPadding ? 0 : theme.spacing(2),
        borderRadius: disableBorderRadius ? 0 : theme.shape.borderRadius
      }}
    >
      {children}
    </div>
  );
}
export default withStyles(styles, { withTheme: true })(Bordered);
