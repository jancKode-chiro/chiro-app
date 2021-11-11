import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import moment from 'moment';

import CardWithImage from '../../../components/common/wrapper/card-with-image';
import verticalSpacer from '../../../components/common/spacer/vertical-spacer';
import './login.style.scss';

import {
  CREATE_ACCOUNT_PATH,
  ABOUT_PATH,
  LETS_TALK_PATH,
  DASHBOARD_PATH,
  LOGIN_PATH,
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
import { isEmpty } from 'lodash';
import { getUser } from '../../../api/users';
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
  const history = useHistory();

  const { email, setAuthState, authState, setInputEmail, setCurrentUserId } =
    useAuth();
  // const { goTo } = useNav();
  const backToHome = (): void => history.push(LOGIN_PATH);

  const submitHandler: SubmitHandler<InputProps> = async (
    data
  ): Promise<void> => {
    setInputEmail(data.email);
    setCurrentUserId(await getUser(data.email));
    Auth.signIn(data.email, data.password)
      .then(async () => {
        const session = await getCurrentSession();

        await setAuthState(session);
        // goTo(DASHBOARD_PATH);
        history.push(DASHBOARD_PATH);
      })
      .catch((err) => {
        console.log(err.message);
      });

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
      <div className='login'>
        <span className='signin'>Sign in to get started</span>
        <form className='form' onSubmit={handleSubmit(submitHandler)}>
          <Input
            marginTop='80px'
            placeholder='Email'
            type='email'
            required
            defaultValue='gynnanne@gmail.com'
            {...register('email', { required: true })}
          />

          <PasswordInput
            marginTop='27px'
            type='password'
            placeholder='Password (minimum of 8, alphanumeric and symbols)'
            defaultValue='Chir_1234.'
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
