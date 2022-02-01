import React from "react";

import {
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  withStyles
} from "@material-ui/core";

const styles = (theme: any) => ({
  helpPadding: {
    "@media (max-width:  400px)": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  fullWidth: {
    width: "100%"
  }
});

function ActionPaper(props: any) {
  const {
    theme,
    classes,
    title,
    content,
    maxWidth,
    actions,
    helpPadding,
    fullWidthActions
  } = props;
  return (
    <Box pt={1}>
      <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth] }}>
        {/* {title && <DialogTitle>{title}</DialogTitle>}
        {content && (
          <DialogContent
            classe={helpPadding ? { root: classes.helpPadding } : null}
          >
            {content}
          </DialogContent>
        )}
        {actions && (
          <Box pb={2} pr={2}>
            <DialogActions
              classes={{ action: fullWidthActions ? classes.fullWidth : null }}
            >
              {actions}
            </DialogActions>
          </Box>
        )} */}
      </Paper>
    </Box>
  );
}
export default withStyles(styles, { withTheme: true })(ActionPaper);
