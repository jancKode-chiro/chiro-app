import React from 'react';

import ResponsiveContainerGrid from '../../components/common/wrapper/grid-container';
import Button from '../../components/common/button/button';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import WrapperWithImage from '../../components/common/wrapper/wrapper-with-image/wrapper-with-image';
import { Input as AntInput } from 'antd';

import './bulk.scss';

const Bulk = () => {
  return (
    <ResponsiveContainerGrid>
      <WrapperWithImage>
        <div className='sms'>
          <div>
            <span className='bulk'>Bulk SMS</span>
          </div>
          {verticalSpacer('28px')}
          <div>
            <div className='group'>
              <span className='search'>Search</span>
              <button className='choosefile'>Choose File</button>

              {verticalSpacer('28px')}

              <span className='bar'>MESSAGE</span>
            </div>
            <AntInput.TextArea rows={15} cols={50} />

            {verticalSpacer('16px')}
            <div>
              <Button className='bg-green text-white'>Send</Button>
            </div>
          </div>
        </div>
      </WrapperWithImage>
    </ResponsiveContainerGrid>
  );
};

export default Bulk;
