import React from "react";
import { CircularProgress, Box, withStyles } from "@material-ui/core";

const styles = (theme: any) => ({
  circularProgress: {
    color: theme.palette.secondary.main
  }
});

function ButtonCircularProgress(props: any) {
  const { size, classes } = props;
  return (
    <Box color="secondary.main" pl={1.5} display="flex" alignItems={'center'} justifyContent='center'>
      <CircularProgress
        size={size ? size : 24}
        thickness={size ? (size / 5) * 25 : 8}
        className={classes.circularProgress}
      />
    </Box>
  );
}

export default withStyles(styles as {}, { withTheme: true })(ButtonCircularProgress);
