import React, { useState } from "react";

import { OutlinedInput, withStyles } from "@material-ui/core";
import FormDailog from "../../../../../components/shared/form-dailog";
import currencyPrettyPrint from '../../../../../components/shared/currencyprettyprint';

const styles = {
  input: { padding: "0px 9px", cursor: "pointer" },
  outlinedInput: {
    width: 90,
    height: 40,
    cursor: "pointer"
  },
  wrapper: {
    display: "flex",
    alignItems: "center"
  }
};

function Balance(props: any) {
  const { open, onClose, balance, classes, openAddBalanceDialog } = props;

  const [loading, setLoading] = useState(false);

  return (
    <div className={classes.wrapper}>
      {console.log('balance', balance)}
      {console.log('pretter', currencyPrettyPrint(balance))}
      <FormDailog
        open={open}
        onClose={onClose}
        headline="Add Balance"
        hideBackdrop={false}
        loading={loading}
      />
      <OutlinedInput
        value={balance === null ? "" : currencyPrettyPrint(balance)}
        className={classes.outlinedInput}
        classes={{ input: classes.input }}
        readOnly
        labelWidth={0}
        onClick={openAddBalanceDialog}
      />
    </div>
  );
}

export default withStyles(styles)(Balance);
