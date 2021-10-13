import React, { FC } from 'react';
import './login.style.scss';
import CardWithImage from '../../../components/common/wrapper/card-with-image';
import verticalSpacer from '../../../components/common/spacer/vertical-spacer';
import Button from '../../../components/common/button/button';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm } from 'react-hook-form';

import {
  CREATE_ACCOUNT_PATH,
  FORGOT_PASSWORD,
  ABOUT_PATH,
  CONTACT_PATH,
  LETS_TALK_PATH,
  CARD_PATH,
} from '../../../constants/paths';
import {
  Input,
  InputButton,
  PasswordInput,
} from '../../../components/common/forms/custom-input/input';
import { StyledLink } from '../../../components/link/link';
import { useAuth } from '../../../context/auth-context';

type LoginProps = {
  setAuth: () => boolean;
};

const Login = ({ setAuth }: any) => {
  const { isAuth, setIsAuth } = useAuth();
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const submitHandler = () => {
    setIsAuth(true);
    history.push('/dashboard');
    // setIsAuth(true);
  };

  return (
    <CardWithImage
      text='Welcome'
      footerText1='About us'
      footerText2='Contact us'
      footerLink1={ABOUT_PATH}
      footerLink2={LETS_TALK_PATH}
      className='welcome'
    >
      {console.log('isAuth', isAuth)}
      <div className='login'>
        <span className='signin'>Signin to get started</span>
        <form>
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
            <InputButton
              type='submit'
              value='Login'
              className='bg-green text-white'
            />

            <Button
              className='bg-green text-white'
              onClick={() => submitHandler()}
            >
              Login
            </Button>
          </div>
        </form>
        <div className='buttomWrapper'>
          {verticalSpacer('80px')}
          <div className='account'>
            <div>
              <span>Don't have an Account?</span>

              <StyledLink className='create' to={CREATE_ACCOUNT_PATH}>
                Create one
              </StyledLink>
            </div>
            <div>
              {/* <span className='forgot'>Forgot Password?</span> */}
              <StyledLink className='forgot' to={FORGOT_PASSWORD}>
                Forgot Password
              </StyledLink>
            </div>
          </div>
        </div>
      </div>
    </CardWithImage>
  );
};

export default withRouter(Login);
