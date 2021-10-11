import React from 'react';

import ResponsiveContainerGrid from '../../components/common/wrapper/grid-container';
import Button from '../../components/common/button/button';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';

import { Input as AntInput } from 'antd';

import './bulk.scss';

const Bulk = () => {
  return (
    <ResponsiveContainerGrid className='image'>
      <div className='sms'>
        <div>
          <span className='bulk'>Bulk SMS</span>
        </div>
        {verticalSpacer('28px')}
        <div>
          <div>
            <span className='search'>Search</span>
            <div className='choosefile'>Choose File</div>
          </div>

          {verticalSpacer('28px')}

          <div>
            <span className='bar'>MESSAGE</span>

            <AntInput.TextArea rows={15} cols={50} />

            {verticalSpacer('16px')}
            <div>
              <Button className='bg-green text-white'>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainerGrid>
  );
};

export default Bulk;
