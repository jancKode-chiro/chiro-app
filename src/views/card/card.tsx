import React from 'react';

import CustomInput from '../../components/common/forms/custom-input/custom-input';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import Button from '../../components/common/button/button';
import ResponsiveGridContainer from '../../components/common/wrapper/grid-container';

import CheckIcons from '../../assets/images/icons/Card.png';

import './card.style.scss';
import WrapperWithImage from '../../components/common/wrapper/wrapper-with-image/wrapper-with-image';

const Card = () => {
  return (
    <ResponsiveGridContainer>
      <WrapperWithImage>
        <div>
          <img src={CheckIcons} alt='check-icon' />
          {verticalSpacer('46.52px')}
          <div className='bank'>
            <CustomInput name='Bank Name' placeholder='Bank Name' />
          </div>
          {verticalSpacer('20px')}
          <div>
            <CustomInput name='Name' placeholder='Name ' />
          </div>
          {verticalSpacer('26px')}
          <div>
            <CustomInput name='Card Number' placeholder='Card Number' />
          </div>
          {verticalSpacer('25px')}
          <div>
            <Button className='bg-green text-white'>Save</Button>
          </div>
        </div>
      </WrapperWithImage>
    </ResponsiveGridContainer>
  );
};

export default Card;
