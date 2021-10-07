import React from 'react';
import './login.style.scss';
import CardWithImage from '../../../components/common/wrapper/card-with-image';
import verticalSpacer from '../../../components/common/spacer/vertical-spacer';
import CustomInput from '../../../components/common/forms/custom-input/custom-input';
import Button from '../../../components/common/button/button';
import { Link } from 'react-router-dom';

import {
  CREATE_ACCOUNT_PATH,
  FORGOT_PASSWORD,
  ABOUT_PATH,
  CONTACT_PATH,
  LETS_TALK_PATH,
} from '../../../constants/paths';
import {
  Input,
  PasswordInput,
} from '../../../components/common/forms/custom-input/input';

const login = () => {
  return (
    <CardWithImage
      text='Welcome'
      footerText1='About us'
      footerText2='Contact us'
      footerLink1={ABOUT_PATH}
      footerLink2={LETS_TALK_PATH}
    >
      <div className='login'>
        <span className='signin'>Signin to get started</span>

        <Input
          marginTop='80px'
          width={'85%'}
          placeholder='Email'
          name='email'
          type='email'
          required
        />

        <PasswordInput
          marginTop='27px'
          width={'85%'}
          type='password'
          placeholder='Password'
          name=''
          required
        />
        {verticalSpacer('70px')}
        <div>
          <Button className='bg-green text-white'>Login</Button>
        </div>

        <div className='buttomWrapper'>
          {verticalSpacer('80px')}
          <div className='account'>
            <div>
              <span>Don't have an Account?</span>
              <Link className='create' to={CREATE_ACCOUNT_PATH}>
                Create one
              </Link>
            </div>
            <div>
              {/* <span className='forgot'>Forgot Password?</span> */}
              <Link className='forgot' to={FORGOT_PASSWORD}>
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CardWithImage>
  );
};

export default login;
