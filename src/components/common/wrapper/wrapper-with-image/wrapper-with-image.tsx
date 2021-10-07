import React, { ReactNode } from 'react';

import './wrapper-with-image.styles.scss';

type WrapperWithImageProps = {
  children: ReactNode;
};

const WrapperWithImage = ({ children }: WrapperWithImageProps) => {
  return (
    <div className='container'>
      <div className='image'>{children}</div>
    </div>
  );
};

export default WrapperWithImage;
