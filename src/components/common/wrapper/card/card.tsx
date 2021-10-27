import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';
import { breakpoint } from '../../../../utilities/break-points';
import { CustomCard } from '../../box/box';

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

function ResponsiveCard({ classes, children, xsSize, smSize, mdSize }: any) {
  return (
    <CustomCard xs={xsSize} sm={smSize} md={mdSize}>
      {children}
    </CustomCard>
  );
}

export default withStyles(stylesheet)(ResponsiveCard);
