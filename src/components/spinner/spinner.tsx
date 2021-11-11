import React, { ReactElement } from 'react';
import './spinner.styles.scss';

interface SpinnerProps {
  theme?: 'blue' | 'black' | 'green' | 'white';
}

export default function Spinner({
  theme = 'black',
}: SpinnerProps): ReactElement {
  return (
    <div className={`spinner-component spinner-component-${theme}`}>
      <div className='spinner'>
        <i className='icon icon-spin6 animate-spin' />
      </div>
    </div>
  );
}
