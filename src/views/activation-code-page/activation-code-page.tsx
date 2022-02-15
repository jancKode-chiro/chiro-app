import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import {
  Input,
  InputButton,
  PasswordInput,
} from '../../components/common/forms/custom-input/input';
import CardWithImage from '../../components/common/wrapper/card-with-image';
import { LOGIN_PATH } from '../../constants/paths';
import './activation-page.styles.scss';
import { useAuth } from '../../context/auth-context';
import { confirmSignup, submitForgotPasswordCode } from '../../api/users';
import { toast } from 'react-toastify';
import { InlineSingleErrorMessage } from '../../components/common/notification/inline-notification/inline-notification';
import { CustomDiv } from '../../components/common/wrapper/custom-wrapper/custom-wrapper';


type InputProps = {
  email: string;
  activationCode: string;
  password: string;
};

const ActivateCode = () => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'A minimimum combination 8 characters with alphanumeric and symbols'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Password must match'),
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

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

          toast.success('Success, redirecting you to the Login Page');
          history.push(LOGIN_PATH);
        } catch (err: any) {
          toast.error('Error while trying to process your request, try again later')
          history.push(LOGIN_PATH);
        }

        break;
      default:
        history.push(LOGIN_PATH);
    }
  };

  const showPasswordHandler = (type: string) => {
    console.log('type', type)
    switch (type) {
      case 'password':
        setShowPassword(!showPassword);
        break;
      case 'confirmPassword':
        setShowConfirmPassword(!showConfirmPassword)
        break;
      default:
        return null
    }

  }

  const renderHanlder = () => {
    return (

      <CustomDiv
        paddingBottom='2rem'>
        {
          isSignUp ? (
            <>
              <Input
                id='email'
                placeholder='Email'
                type='email'
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
                width='100%'
                marginBottom={'3.5rem'}
                {...register('email', { required: true })}
              />
              <Input
                id='code'
                placeholder='Verification code'
                type='text'
                required
                width='100%'
                {...register('activationCode', { required: true })}
              />
              <div className='password-input'>
                <PasswordInput
                  id='password'
                  placeholder='new password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  marginBottom={!errors.password ? '3.5rem' : ''}
                  {...register('password', { required: true })}
                />
                {showPassword ? <FaEyeSlash
                  onClick={() => showPasswordHandler('password')}
                  className='eye-icon' /> :
                  <FaEye
                    onClick={() => showPasswordHandler('password')}
                    className='eye-icon' />}
              </div>

              <InlineSingleErrorMessage
                errors={errors}
                name='password'
              />
              <div className='password-input'>

                <PasswordInput
                  id='new-password'
                  placeholder='confirm password'
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  marginBottom={!errors.confirmPassword ? '3.5rem' : ''}
                  {...register('confirmPassword', { required: true })}
                />
                {showConfirmPassword ? <FaEyeSlash
                  onClick={() => showPasswordHandler('confirmPassword')}
                  className='eye-icon' /> :
                  <FaEye
                    onClick={() => showPasswordHandler('confirmPassword')}
                    className='eye-icon' />}
              </div>
              <InlineSingleErrorMessage
                errors={errors}
                name='confirmPassword'
              />
            </div>
          )}
      </CustomDiv >
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
