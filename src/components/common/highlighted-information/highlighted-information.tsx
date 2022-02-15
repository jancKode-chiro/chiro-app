import React from "react";
import classNames from "classnames";
import { styles } from '../../../components/styles-menu/highlighted-information-styles/highlighted-information.styles';
import { Typography, withStyles } from "@material-ui/core";

function HighlighedInformation(props: any) {
  const { className, children, classes } = props;
  return (
    <div className={classNames(classes.main, className ? className : null)}>
      <Typography variant="body2">{children}</Typography>
    </div>
  );
}

export default withStyles(styles as {}, { withTheme: true })(HighlighedInformation);
