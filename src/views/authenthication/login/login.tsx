import React from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';

import CardWithImage from '../../../components/common/wrapper/card-with-image';
import verticalSpacer from '../../../components/common/spacer/vertical-spacer';
import './login.style.scss';

import {
  CREATE_ACCOUNT_PATH,
  FORGOT_PASSWORD,
  ABOUT_PATH,
  LETS_TALK_PATH,
  DASHBOARD_PATH,
} from '../../../constants/paths';
import {
  Input,
  InputButton,
  PasswordInput,
} from '../../../components/common/forms/custom-input/input';
import { StyledLink } from '../../../components/link/link';
type InputProps = {
  email: string;
  password: string;
};

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    Auth.signIn(data.email, data.password)
      .then(() => {
        history.push(DASHBOARD_PATH);
      })
      .catch((err) => {
        alert(err.message);
      });

    // setIsAuth(true);
    console.log(data);
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
      <div className='login'>
        <span className='signin'>Sign in to get started</span>
        <form className='form' onSubmit={handleSubmit(submitHandler)}>
          <Input
            marginTop='80px'
            placeholder='Email'
            type='email'
            required
            {...register('email', { required: true })}
          />

          <PasswordInput
            marginTop='27px'
            type='password'
            placeholder='Password (minimum of 8, alphanumeric and symbols)'
            {...register('password', { required: true, minLength: 8 })}
            required
          />
          {errors.password &&
            'The required minimum length is 8 with alphanumeric and symbols'}
          <div className='button'>
            <InputButton
              type='submit'
              value='Login'
              className='bg-green text-white'
            />
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
