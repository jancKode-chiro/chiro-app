import React from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';
import CardWithImage from '../../components/common/wrapper/card-with-image';
import { LOGIN_PATH } from '../../constants/paths';
import './activation-page.styles.scss';
import { useAuth } from '../../context/auth-context';
import { confirmSignup, submitForgotPasswordCode } from '../../api/users';

type InputProps = {
  email: string;
  activationCode: string;
  password: string;
};

const ActivateCode = () => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be minimum of 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  let history = useHistory();
  const path = history.location.state || '';
  const isSignUp = path === 'signUp';

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const { email } = useAuth();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    switch (path) {
      case 'signUp':
        confirmSignup(data.email, data.activationCode);
        break;
      case 'forgotPassword':
        try {
          const result = submitForgotPasswordCode(
            data.email,
            data.activationCode,
            data.password
          );

          alert('Success, redirecting you to the Login Page');
          history.push(LOGIN_PATH);
        } catch (err: any) {
          console.log(
            'Error while trying to reset your password ',
            err.message
          );
        }

        break;
      default:
        history.push(LOGIN_PATH);
    }
  };

  const renderHanlder = () => {
    return (
      <div>
        {isSignUp ? (
          <>
            <Input
              id='email'
              placeholder='Email'
              type='email'
              required
              defaultValue={email}
              readOnly
              marginBottom={'3.5rem'}
              {...register('email', { required: true })}
            />
            <Input
              id='code'
              placeholder='Activation Code'
              required
              marginBottom={'3.5rem'}
              {...register('activationCode', { required: true })}
            />
          </>
        ) : (
          <div className='recover-account'>
            <Input
              id='email'
              placeholder='Email'
              type='email'
              required
              defaultValue={email}
              readOnly
              marginBottom={'3.5rem'}
              {...register('email', { required: true })}
            />
            <Input
              id='code'
              placeholder='Verification code'
              type='text'
              required
              marginBottom={'3.5rem'}
              {...register('activationCode', { required: true })}
            />
            <Input
              id='password'
              placeholder='new password'
              type='password'
              required
              marginBottom={!errors.password ? '3.5rem' : ''}
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='alert' role='alert'>
                {errors.password.message}
              </span>
            )}
            <Input
              id='new-password'
              placeholder='confirm password'
              type='password'
              required
              marginBottom={!errors.confirmPassword ? '3.5rem' : ''}
              {...register('confirmPassword', { required: true })}
            />
            {errors.confirmPassword && (
              <span className='alert' role='alert'>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <CardWithImage text={isSignUp ? 'Activate account' : 'Forgot Password'}>
      <div className='activation-page'>
        <label className='label'>
          {isSignUp ? 'Enter Activation Code' : 'Reset your password'}
        </label>
        <form onSubmit={handleSubmit(submitHandler)} className='form'>
          {renderHanlder()}
          <InputButton
            type='submit'
            value='Confirm'
            className='bg-green text-white'
            paddingBottom={!isSignUp ? '8.5rem' : ''}
          />
        </form>
      </div>
    </CardWithImage>
  );
};

export default withRouter(ActivateCode);
