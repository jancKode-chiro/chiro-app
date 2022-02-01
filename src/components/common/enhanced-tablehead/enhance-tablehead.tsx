import React, { useCallback } from "react";
import classNames from "classnames";
import {
  Typography,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  withStyles
} from "@material-ui/core";

const styles = (theme: any) => ({
  tableSortLabel: {
    cursor: "text",
    userSelect: "auto",
    color: "inherit !important"
  },
  noIcon: {
    "& path": {
      display: "none !important"
    }
  },
  paddingFix: {
    paddingLeft: theme.spacing(3)
  }
});

function EnhancedTableHead(props: any) {
  const { order, orderBy, rows, onRequestSort, classes } = props;

  const createSortHandler = useCallback(
    property => (event: any) => {
      onRequestSort(event, property);
    },
    [onRequestSort]
  );

  return (
    <TableHead>
      <TableRow>
        {rows.map((row: any, index: any) => (
          <TableCell
            key={index}
            align={row.numeric ? "right" : "inherit"}
            padding="default"
            sortDirection={orderBy === row.name ? order : false}
            className={index === 0 ? classes.paddingFix : null}
          >
            {onRequestSort ? (
              <Tooltip
                title="Sort"
                placement={row.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  <Typography variant="body2">{row.label}</Typography>
                </TableSortLabel>
              </Tooltip>
            ) : (
              <TableSortLabel
                className={classNames(classes.tableSortLabel, classes.noIcon)}
              >
                <Typography variant="body2" className={classes.label}>
                  {row.label}
                </Typography>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export default withStyles(styles as {}, { withTheme: true })(EnhancedTableHead);
