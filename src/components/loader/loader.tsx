import React, { ReactElement } from 'react';
import clsx from 'clsx';
import './loader.styles.scss';

interface LoaderProps {
  color?: string;
  className?: string;
  isOverlay?: boolean;
  parentOnly?: boolean;
}

export default function Slider({
  color = 'blue',
  className,
  isOverlay = false,
  parentOnly = false,
}: LoaderProps): ReactElement {
  return (
    <div className='loader-component'>
      {isOverlay && <div className='overlay' />}
      <div className={clsx('loader', `loader-${color}`, { parentOnly })}>
        <i className={`icon icon-spin6 animate-spin ${className ?? ''}`} />
      </div>
    </div>
  );
}
