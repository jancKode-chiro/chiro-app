import React from 'react';
import { withRouter } from 'react-router';

import Button from '../../../components/common/button/button';
import RepsonsiveContainerGrid from '../../../components/common/wrapper/grid-container';

import './createaccount.styles.scss';
import { Input } from '../../../components/common/forms/custom-input/input';
import WrapperWithImage from '../../../components/common/wrapper/wrapper-with-image/wrapper-with-image';

const CreateAccount = () => {
  return (
    <div className='create-account'>
      <RepsonsiveContainerGrid>
        <WrapperWithImage>
          <div className='create-account-form'>
            <span className='title'>Create Account</span>
            <div className='form'>
              <div>
                <div className='text-wrapper'>
                  <Input
                    placeholder='First Name'
                    name='firstName'
                    width={'25vw'}
                  />

                  <Input placeholder='Last Name' name='lastName' width='25vw' />
                </div>

                <div className='text-wrapper'>
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
              <div className='text-wrapper'>
                <Input
                  placeholder='Phone Number'
                  name='phoneNumber'
                  width='25vw'
                />
              </div>
              <div className='text-wrapper'>
                <Input placeholder='Country' name='country' width='25vw' />

                <Input
                  placeholder='Country Code'
                  name='countryCode'
                  width='25vw'
                />
              </div>

              <div className='create-button'>
                <Button className='bg-green text-white '>Create Account</Button>
              </div>
            </div>
          </div>
        </WrapperWithImage>
      </RepsonsiveContainerGrid>
    </div>
  );
};

export default withRouter(CreateAccount);
