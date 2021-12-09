import React from 'react';

import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';

import CardWithImage from '../../components/common/wrapper/card-with-image';

import './forgot-passsword.styles.scss';
import { ACTIVATE_ACCOUNT_PATH } from '../../constants/paths';
import { forgotUserPassword } from '../../api/users';
import { toast } from 'react-toastify';

type InputProps = {
  email: string;
};

const ForgotPassword = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { setInputEmail } = useAuth();
  const history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = async (
    data
  ): Promise<void> => {
    setInputEmail(data.email);
    await forgotUserPassword(data.email);
    await history.push({
      pathname: ACTIVATE_ACCOUNT_PATH,
      state: 'forgotPassword',
    });

    await toast.info('Please check your email for the verification code.');
  };

  return (
    <CardWithImage className='welcome' text='Forgot Password'>
      <div className='forgot-password'>
        <span className='header-text'>Enter your registered email</span>
        <form className='form' onSubmit={handleSubmit(submitHandler)}>
          <Input
            placeholder='Email'
            type='email'
            width={'20vw'}
            required
            {...register('email', { required: true })}
          />
          <div className='button'>
            <InputButton
              type='submit'
              value='Submit'
              className='bg-green text-white'
            />
          </div>
        </form>
      </div>
    </CardWithImage>
  );
};

export default withRouter(ForgotPassword);
