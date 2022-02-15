import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { FaEyeSlash, FaEye } from "react-icons/fa";


import CardWithImage from '../../../components/common/wrapper/card-with-image';
import verticalSpacer from '../../../components/common/spacer/vertical-spacer';
import { toast } from 'react-toastify';
import './login.styles.scss';

import {
  CREATE_ACCOUNT_PATH,
  ABOUT_PATH,
  LETS_TALK_PATH,
  DASHBOARD_PATH,
  PASSWORDFORGOT_PATH,
} from '../../../constants/paths';
import {
  Input,
  InputButton,
  PasswordInput,
} from '../../../components/common/forms/custom-input/input';
import { StyledLink } from '../../../components/link/link';
import { useAuth } from '../../../context/auth-context';
import { getCurrentSession } from '../../../helpers/user-helpers';
// import useNav from '../../../hooks/use-nav';
import { getUser } from '../../../api/users';
import { InlineSingleErrorMessage } from '../../../components/common/notification/inline-notification/inline-notification';
import HighlightedInformation from '../../../components/common/highlighted-information/highlighted-information';

type InputProps = {
  email: string;
  password: string;
};

const Login = (props: any): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState,
    watch
  } = useForm();

  const history = useHistory();
  const { setAuthState, setInputEmail, setCurrentUserId } =
    useAuth();
  // const { goTo } = useNav();
  // const backToHome = (): void => history.push(LOGIN_PATH);
  const watchFields = watch(['email', 'password'])

  const submitHandler: SubmitHandler<InputProps> = async (
    data
  ): Promise<void> => {

    setInputEmail(data.email);
    setCurrentUserId(await getUser(data.email));

    Auth.signIn(data.email, data.password)
      .then(async () => {
        const session = await getCurrentSession();

        await setAuthState(session);
        history.push(DASHBOARD_PATH);
        toast.success('Welcome back')

      })
      .catch((err) => {
        toast.error(err.message)
      });

  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword)
  }

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
            {...register('email', { required: 'Email is required' })}
          />
          <InlineSingleErrorMessage
            errors={formState.errors}
            name='email'
          />
          <div className='password-input'>
            <PasswordInput
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              {...register('password', {
                required: 'Passwrord is required', minLength: {
                  value: 8,
                  message: 'The minimum length is 8'
                },
              })}
            />
            {showPassword ? <FaEyeSlash onClick={showPasswordHandler} className='eye-icon' /> : <FaEye onClick={showPasswordHandler} className='eye-icon' />}
          </div>

          <InlineSingleErrorMessage
            errors={formState.errors}
            name='password'
          />


          <div className='button'>
            <InputButton
              disabled={formState.isValid}
              type='submit'
              value='Login'
              className={`text-white ${watchFields[0] && watchFields[1] ? 'bg-green' : 'bg-gray'}`}
            />
          </div>

          <HighlightedInformation>
            Demo account:
            <br />
            Email: <b>gynnanne@gmail.com</b>
            <br />
            password: <b>Chir_1234.</b>
          </HighlightedInformation>

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
              <StyledLink className='forgot' to={PASSWORDFORGOT_PATH}>
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
