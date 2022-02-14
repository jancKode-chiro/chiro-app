import React from "react";

import { ListItemText, Button, Toolbar, withStyles } from "@material-ui/core";

const styles = {
  toolbar: {
    justifyContent: "space-between"
  }
};

function SubscriptionInfo(props: any) {
  const { classes, openAddBalanceDialog } = props;
  return (
    <Toolbar className={classes.toolbar}>
      <ListItemText primary="Status" secondary="Premium Account" />
      <Button
        variant="contained"
        color="secondary"
        onClick={openAddBalanceDialog}
        disableElevation
      >
        Add Balance
      </Button>
    </Toolbar>
  );
}

export default withStyles(styles)(SubscriptionInfo);
