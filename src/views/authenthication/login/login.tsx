import React from 'react';
import './login.style.scss';
import CardWithImage from '../../../components/common/wrapper/card-with-image';
import spacer from '../../../components/common/spacer/spacer';
import CustomInput from '../../../components/common/forms/custom-input/custom-input';
import button from '../../../components/common/button/button';

const login = () => {
  return (
    <CardWithImage>
      <CustomInput name="email" placeholder="Email" />
      {spacer('27px')}
      <CustomInput name="email" placeholder="Password" />
    </CardWithImage>
  );
};

export default login;
