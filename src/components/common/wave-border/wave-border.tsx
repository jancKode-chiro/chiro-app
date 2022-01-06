import { withStyles } from '@material-ui/core';
import React from 'react'
import { styles } from './wave-border.styles';


const WaveBorder = (props: any) => {
  const id = String(Math.random());
  const {
    className,
    lowerColor,
    upperColor,
    classes,
    animationNegativeDelay,
    ...rest
  } = props;

  return (
    <div className={className} style={{ background: upperColor }} {...rest}>
      {console.log('classes', classes.root)}
      <svg
        className={classes.root}
        xmlns="http://www.w3.org/2000/svg"
        // xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id={id}
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={classes.parallax}>
          <use href={`#${id}`} x="48" y="0" fill={lowerColor} />
        </g>
      </svg>
    </div>
  )
}

export default withStyles(styles)(WaveBorder);
