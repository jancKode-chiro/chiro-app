import React from 'react';
import { withRouter } from 'react-router';

import RepsonsiveContainerGrid from '../../../components/common/wrapper/grid-container';

import './createaccount.styles.scss';
import {
  Input,
  InputButton,
  PasswordInput,
} from '../../../components/common/forms/custom-input/input';
import { ContainerWithImage } from '../../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';

import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../../context/auth-context';

type CreateAccountProps = {
  setAuth: () => Boolean;
};

type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
};

const CreateAccount = ({ setAuth }: any) => {
  const { isAuth, setIsAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    setIsAuth(true);
    history.push('/dashboard');
    // setIsAuth(true);
    console.log(data);
  };

  return (
    <div className='create-account'>
      <RepsonsiveContainerGrid>
        <ContainerWithImage>
          <div className='create-account-form'>
            <span className='title'>Create Account</span>
            <div className='form'>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className='text-wrapper'>
                  <Input
                    placeholder='First Name'
                    width={'25vw'}
                    required
                    {...register('firstName', { required: true })}
                  />

                  <Input
                    placeholder='Last Name'
                    width='25vw'
                    required
                    {...register('lastName', { required: true })}
                  />
                </div>

                <div className='text-wrapper'>
                  <Input
                    placeholder='Email'
                    type='email'
                    width='25vw'
                    required
                    {...register('email', { required: true })}
                  />

                  <PasswordInput
                    placeholder='Password'
                    type='password'
                    width='25vw'
                    {...register('password', { required: true })}
                    required
                  />
                </div>

                <div className='text-wrapper'>
                  <Input
                    placeholder='Phone Number'
                    width='25vw'
                    {...register('phoneNumber', {
                      required: true,
                      minLength: 15,
                    })}
                    required
                  />
                </div>
                <div className='text-wrapper'>
                  <Input
                    placeholder='Country'
                    width='25vw'
                    {...register('country', { required: true })}
                  />

                  <Input
                    placeholder='Country Code'
                    width='25vw'
                    {...register('countryCode', {
                      required: true,
                      minLength: 15,
                    })}
                    required
                  />
                </div>
                <div className='create-button'>
                  <InputButton
                    type='submit'
                    value='Create Account'
                    className='bg-green text-white '
                  />
                </div>
              </form>
            </div>
          </div>
        </ContainerWithImage>
      </RepsonsiveContainerGrid>
    </div>
  );
};

export default withRouter(CreateAccount);
