import React from 'react';

import ResponsiveContainerGrid from '../../components/common/wrapper/grid-container';
import Button from '../../components/common/button/button';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import { withRouter } from 'react-router';

import { Input as AntInput } from 'antd';

import './bulk.scss';
import { ContainerWithImage } from '../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';

const Bulk = () => {
  return (
    <ResponsiveContainerGrid>
      <ContainerWithImage>
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
      </ContainerWithImage>
    </ResponsiveContainerGrid>
  );
};

export default withRouter(Bulk);
