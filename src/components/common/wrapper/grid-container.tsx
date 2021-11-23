import React, { ReactElement } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

import { breakpoint } from '../../../utilities/break-points';

type Theme = {
  [key: string]: any;
};

type RepsonsiveGridProps = {
  classes: Theme;
  children: any;
  className?: string;
};

const stylesheet = (theme: Theme) => ({
  root: {
    [theme?.breakpoints?.up(breakpoint.mobileBreakpoint)]: {
      'min-height': 1000,
    },
  },
});

function RepsonsiveContainerGrid({
  classes,
  children,
  className,
}: RepsonsiveGridProps): ReactElement {

  return (
    <Grid
      className={`${classes.root} ${className ?? ''}`}
      container
      direction='row'
      justifyContent='center'
      alignContent='center'
    >

      {children}

    </Grid>
  );
}

export default withStyles(stylesheet)(RepsonsiveContainerGrid);
