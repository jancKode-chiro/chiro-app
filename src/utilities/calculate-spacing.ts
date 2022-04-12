/**
 * This calculates the spacing for the
 * grid container component based on the viewsize
 */

import { isWidthUp } from '@material-ui/core/withWidth';

function calculateSpacing(width: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
  if (isWidthUp('lg', width)) {
    return 3;
  }
  if (isWidthUp('md', width)) {
    return 4;
  }
  if (isWidthUp('sm', width)) {
    return 3;
  }
  return 2;
}

export default calculateSpacing;
