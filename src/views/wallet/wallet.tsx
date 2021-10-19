import React from 'react';

import CardWithImage from '../../components/common/wrapper/card-with-image';
import CustomInput from '../../components/common/forms/custom-input/custom-input';
import Button from '../../components/common/button/button';
import RepsonsiveContainerGrid from '../../components/common/wrapper/grid-container';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import { Input } from '../../components/common/forms/custom-input/input';
import { Input as AntInput } from 'antd';

import './wallet.style.scss';

const Wallet = () => {
  return (
    <RepsonsiveContainerGrid className='image'>
      <div>
        <div className='box'>
          <div>
            <span className='available'>Available Balance</span>
            <AntInput.TextArea rows={10} cols={50} />
          </div>
        </div>
        {verticalSpacer('60px')}

        <div className='text'>
          <CustomInput name=' Card Details' placeholder='Card Details' />
          {verticalSpacer('60px')}
          <CustomInput name=' Topup amount' placeholder='Amount in USD' />
        </div>
        {verticalSpacer('90px')}
        <div>
          <Button className='bg-green text-white'>Save</Button>
        </div>
      </div>
    </RepsonsiveContainerGrid>
  );
};

export default Wallet;
