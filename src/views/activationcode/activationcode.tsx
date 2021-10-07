import React from 'react';

import checkIcon from '../../assets/icons/tick-circle.png';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';

import './activationcode.styles.scss';

const ActivationCode = () => {
  return (
    <div className='container'>
      <div className='image'>
        <div className='title'>
          <img src={checkIcon} />
          {verticalSpacer('20px')}
          <span>Check your email for verfication</span>
        </div>
      </div>
    </div>
  );
};

export default ActivationCode;
