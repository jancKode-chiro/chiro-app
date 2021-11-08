import React from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';
import CardWithImage from '../../components/common/wrapper/card-with-image';
import { LOGIN_PATH } from '../../constants/paths';
import './activation-page.styles.scss';
import { useAuth } from '../../context/auth-context';
import { submitForgotPasswordCode } from '../../api/users';

type InputProps = {
  email: string;
  activationCode: string;
  password: string;
};

const ActivateCode = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  let history = useHistory();
  const path = history.location.state || '';

  const { email } = useAuth();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    switch (path) {
      case 'signUp':
        Auth.confirmSignUp(data.email, data.activationCode)
          .then(() => {
            alert('Success! Redirecting you to the login page.');
            history.push(LOGIN_PATH);
          })
          .catch((err) => {
            alert(err.message);
            console.log('Error while trying to activate account', err);
          });
        break;
      case 'forgotPassword':
        submitForgotPasswordCode(
          data.email,
          data.activationCode,
          data.password
        );
        break;
      default:
        history.push(LOGIN_PATH);
    }
  };

  const renderHanlder = () => {
    return (
      <>
        {path === 'signUp' ? (
          <>
            <Input
              placeholder='Email'
              type='email'
              required
              defaultValue={email}
              readOnly
              marginBottom={'3.5rem'}
              {...register('email', { required: true })}
            />
            <Input
              placeholder='Activation Code'
              required
              marginBottom={'3.5rem'}
              {...register('activationCode', { required: true })}
            />
          </>
        ) : (
          <>
            <Input
              placeholder='Email'
              type='email'
              required
              defaultValue={email}
              readOnly
              marginBottom={'3.5rem'}
              {...register('email', { required: true })}
            />
            <Input
              placeholder='Verification code'
              type='text'
              required
              readOnly
              marginBottom={'3.5rem'}
              {...register('activationCode', { required: true })}
            />
            <Input
              placeholder='new password'
              type='password'
              required
              readOnly
              marginBottom={'3.5rem'}
              {...register('password', { required: true })}
            />
            <Input
              placeholder='confirm password'
              type='password'
              required
              readOnly
              marginBottom={'3.5rem'}
              {...register('confirmPassword', { required: true })}
            />
          </>
        )}
      </>
    );
  };

  return (
    <CardWithImage text='Activate account'>
      <div className='activation-page'>
        <form onSubmit={handleSubmit(submitHandler)} className='form'>
          {renderHanlder()}
          <InputButton
            type='submit'
            value='Confirm'
            className='bg-green text-white'
          />
        </form>
      </div>
    </CardWithImage>
  );
};

export default withRouter(ActivateCode);
