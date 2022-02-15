import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';
import { breakpoint } from '../../../../utilities/break-points';

import './responsive-card.styles.scss';

type Theme = {
  [key: string]: any;
};

const stylesheet = (theme: Theme) => ({
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
  return <Card className={`responsive-card`}>{children}</Card>;
}

export default withStyles(stylesheet)(ResponsiveCard);
