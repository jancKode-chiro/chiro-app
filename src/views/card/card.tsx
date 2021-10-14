import React from 'react';
import { withRouter } from 'react-router';

import CustomInput from '../../components/common/forms/custom-input/custom-input';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import Button from '../../components/common/button/button';
import ResponsiveGridContainer from '../../components/common/wrapper/grid-container';

import CheckIcons from '../../assets/images/icons/Card.png';

import './card.style.scss';
import { ContainerWithImage } from '../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';

const Card = () => {
  return (
    <ResponsiveGridContainer>
      <ContainerWithImage>
        <div>
          <img src={CheckIcons} alt='check-icon' />
          {verticalSpacer('1.25em')}
          <div className='bank'>
            <CustomInput name='Bank Name' placeholder='Bank Name' />
          </div>
          {verticalSpacer('1.25em')}
          <div>
            <CustomInput name='Name' placeholder='Name ' />
          </div>
          {verticalSpacer('1.625em')}
          <div>
            <CustomInput name='Card Number' placeholder='Card Number' />
          </div>
          {verticalSpacer('1.5625em')}
          <div>
            <Button className='bg-green text-white'>Save</Button>
          </div>
        </div>
      </ContainerWithImage>
    </ResponsiveGridContainer>
  );
};

export default withRouter(Card);
