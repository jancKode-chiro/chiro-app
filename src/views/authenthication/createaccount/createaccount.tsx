import React from 'react';
import { withRouter } from 'react-router';
import CustomInput from '../../../components/common/forms/custom-input/custom-input';
import verticalSpacer from '../../../components/common/spacer/vertical-spacer';
import Button from '../../../components/common/button/button';

import './createaccount.styles.scss';

const CreateAccount = () => {
  return (
    <div className='container'>
      <div className='image'>
        <h1 className='title'>Create Account</h1>
        <div>
          <div className='inputwrapper'>
            <CustomInput name='First Name' placeholder='First Name' />
            {verticalSpacer('37px')}
            <CustomInput name='Last Name' placeholder='Last Name' />
          </div>

          <div className='inputwrapper'>
            <CustomInput name='Email' placeholder='Email' />
            <CustomInput name='Password' placeholder='Password' />
          </div>
        </div>
        <div className='inputwrapper1'>
          <CustomInput name='Phone Number' placeholder='Phone Number' />
        </div>
        <div className='inputwrapper'>
          <CustomInput name='Country' placeholder='Country' />
          {verticalSpacer('22px')}
          <CustomInput name='Country Code' placeholder=' Country Code' />
        </div>

        <div className='button'>
          <Button className='bg-green text-white'>Create Account</Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateAccount);
