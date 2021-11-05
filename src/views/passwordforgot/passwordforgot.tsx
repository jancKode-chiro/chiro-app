import React from 'react';

import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';

import ResponsiveContainerGrid from '../../components/common/wrapper/grid-container';
import CardWithImage from '../../components/common/wrapper/card-with-image';

import './passwordforgot.styles.scss';

type InputProps = {
  email: string;
};

const PasswordForget = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const { setAuthState, authState } = useAuth();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    history.push('/login');
  };

  return (
    <ResponsiveContainerGrid>
      <CardWithImage className='text-a' text='Forgot Password'>
        <div className='details-2'>
          <span className='enter'>Enter your registered email</span>
          <form className='details-1' onSubmit={handleSubmit(submitHandler)}>
            <Input
              placeholder='Email'
              type='email'
              width={'20vw'}
              required
              {...register('email', { required: true })}
            />

            <InputButton
              type='submit'
              value='Submit'
              className='bg-green text-white'
            />
          </form>
        </div>
      </CardWithImage>
    </ResponsiveContainerGrid>
  );
};

export default withRouter(PasswordForget);
