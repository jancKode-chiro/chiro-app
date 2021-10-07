import React from 'react';
import { withRouter } from 'react-router';

import CustomInput from '../../../components/common/forms/custom-input/custom-input';
import verticalSpacer from '../../../components/common/spacer/vertical-spacer';
import Button from '../../../components/common/button/button';
import RepsonsiveContainerGrid from '../../../components/common/wrapper/grid-container';

import './createaccount.styles.scss';
import { Input } from '../../../components/common/forms/custom-input/input';

const CreateAccount = () => {
  return (
    <RepsonsiveContainerGrid className='image'>
      <div className='create-account-form'>
        <h1 className='title'>Create Account</h1>
        <div className='form'>
          <div>
            <div className='inputwrapper'>
              <Input
                placeholder='First Name'
                name='firstName'
                width={'25vw'}
                marginBottom='37px'
              />

              <Input placeholder='Last Name' name='lastName' width='25vw' />
            </div>

            <div className='inputwrapper'>
              <Input
                placeholder='Email'
                name='email'
                type='email'
                width='25vw'
              />

              <Input
                placeholder='Password'
                name='password'
                type='password'
                width='25vw'
              />
            </div>
          </div>
          <div className='inputwrapper1'>
            <Input placeholder='Phone Number' name='phoneNumber' width='25vw' />
          </div>
          <div className='inputwrapper'>
            <Input placeholder='Country' name='country' width='25vw' />

            <Input placeholder='Country Code' name='countryCode' width='25vw' />
          </div>

          <div className='create-button'>
            <Button className='bg-green text-white '>Create Account</Button>
          </div>
        </div>
      </div>
    </RepsonsiveContainerGrid>
  );
};

export default withRouter(CreateAccount);
