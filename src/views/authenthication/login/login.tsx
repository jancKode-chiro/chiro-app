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
} from '../../../constants/paths';

const login = () => {
  return (
    <CardWithImage
      text='Welcome'
      footerText1='About us'
      footerText2='Contact us'
      footerLink1={ABOUT_PATH}
      footerLink2={CONTACT_PATH}
    >
      <div>
        {verticalSpacer('124px')}
        <h1>Signin to get started</h1>
        {verticalSpacer('80px')}
        <CustomInput name='email' placeholder='Email' />
        {verticalSpacer('27px')}
        <CustomInput name='email' placeholder='Password' />
        {verticalSpacer('70px')}
        <Button className='bg-green text-white'>Login</Button>
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
