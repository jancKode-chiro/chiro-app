import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';
import { breakpoint } from '../../../utilities/break-points';

type Theme = {
  [key: string]: any;
};

type RepsonsiveGridProps = {
  classes: Theme;
  children: any;
};

const stylesheet = (theme: any) => ({
  root: {
    [theme.breakpoints.down(breakpoint.mobileBreakpoint)]: {
      boxShadow: theme.shadows[0],
    },
    [theme.breakpoints.up(breakpoint.mobileBreakpoint)]: {
      width: '25vw',
      boxShadow: theme.shadows[2],
    },
    // height: '100%',
  },
});

function ResponsiveCard({ classes, children }: any) {
  return <Card className={classes.root}>{children}</Card>;
}

export default withStyles(stylesheet)(ResponsiveCard);
