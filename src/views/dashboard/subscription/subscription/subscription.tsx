import React from "react";

import { List, Divider, Paper, withStyles } from "@material-ui/core";
import SubscriptionTable from "../subscription-table/subscription.table";
import SubscriptionInfo from "../subscription-info/subscription.info";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Subscription(props: any) {
  const {
    transactions,
    classes,
    openAddBalanceDialog,
  } = props;

  // useEffect(selectSubscription, [selectSubscription]);

  return (
    <Paper>
      <List disablePadding>
        <SubscriptionInfo openAddBalanceDialog={openAddBalanceDialog} />
        <Divider className={classes.divider} />
        <SubscriptionTable transactions={transactions} />
      </List>
    </Paper>
  );
}
export default withStyles(styles)(Subscription);
