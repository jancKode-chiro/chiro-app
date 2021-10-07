import React from 'react';

import CustomInput from '../../components/common/forms/custom-input/custom-input';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import Button from '../../components/common/button/button';

import CheckIcons from '../../assets/images/icons/Card.png';

import './card.style.scss';

const Card = () => {
  return (
    <div className='container'>
      <div className='image'>
        <div>
          <img src={CheckIcons} />
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
      </div>
    </div>
  );
};

export default Card;
