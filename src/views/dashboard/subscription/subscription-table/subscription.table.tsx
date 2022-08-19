import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  withStyles
} from "@material-ui/core";
import EnhancedTableHead from '../../../../components/common/enhanced-tablehead/enhance-tablehead'
import ColorfulChip from "../../../../components/common/colorful-chip/colorful-chip";
import HighlightedInformation from "../../../../components/common/highlighted-information/highlighted-information";
import currencyPrettyPrint from "../../../../components/shared/currencyprettyprint";

const styles = (theme: any) => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    width: "100%"
  },
  dBlock: {
    display: "block !important"
  },
  dNone: {
    display: "none !important"
  },
  firstData: {
    paddingLeft: theme.spacing(3)
  }
});

const rows = [
  {
    id: "description",
    numeric: false,
    label: "Action"
  },
  {
    id: "balanceChange",
    numeric: false,
    label: "Balance change"
  },
  {
    id: "date",
    numeric: false,
    label: "Date"
  },
  {
    id: "paidUntil",
    numeric: false,
    label: "Paid until"
  }
];


function SubscriptionTable(props: any) {
  const { transactions, theme, classes } = props;

  if (transactions > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={transactions} rows={rows} />
          <TableBody>
            <TableRow hover tabIndex={-1}>
              <TableCell
                component="th"
                scope="row"
                className={classes.firstData}
              >
              </TableCell>
              <TableCell component="th" scope="row">
                <ColorfulChip
                  label={`+${currencyPrettyPrint(
                    transactions.balanceChange
                  )}`}
                  color={theme.palette.secondary.main}
                />
                <ColorfulChip
                  label={currencyPrettyPrint}
                  color={theme.palette.error.dark}
                />
              </TableCell>
              <TableCell component="th" scope="row">

              </TableCell>
              <TableCell component="th" scope="row">

              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No transactions received yet.
      </HighlightedInformation>
    </div>
  );
}


export default withStyles(styles as {}, { withTheme: true })(SubscriptionTable);
