import React from 'react';
import './login.style.scss';
import CardWithImage from '../../../components/common/wrapper/card-with-image';
import verticalSpacer from '../../../components/common/spacer/vertical-spacer';
import CustomInput from '../../../components/common/forms/custom-input/custom-input';
import Button from '../../../components/common/button/button'

const login = () => {
  return (
    <CardWithImage>
       {verticalSpacer('124px')}
      <h1>Signin to get started</h1>
       {verticalSpacer('80px')}
      <CustomInput name="email" placeholder="Email" />
      {verticalSpacer('27px')}
      <CustomInput name="email" placeholder="Password" />
       {verticalSpacer('70px')}
      <Button className='bg-green text-white'>Login</Button>
    </CardWithImage>
  );
};

export default login;
