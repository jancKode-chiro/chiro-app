import React from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';

import RepsonsiveContainerGrid from '../../../components/common/wrapper/grid-container';
import {
  Input,
  InputButton,
  PasswordInput,
} from '../../../components/common/forms/custom-input/input';
import { ContainerWithImage } from '../../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';
import './createaccount.styles.scss';
import { ACTIVATE_ACCOUNT_PATH } from '../../../constants/paths';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    // history.push('/dashboard');

    console.log(data);
    Auth.signUp({
      username: data.email,
      password: data.password,
      attributes: {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        phone_number: data.phoneNumber,
      },
    })
      .then(() => {
        alert('Success, please check your email for the confirmation code');
        history.push(ACTIVATE_ACCOUNT_PATH);
        // notification.success({
        //   message: 'Succesfully signed up user!',
        //   description:
        //     'Account created successfully, Redirecting you in a few!',
        //   placement: 'topRight',
        //   duration: 1.5,
        //   onClose: () => {
        //     console.log('Success');
        //   },
        // });
      })
      .catch((err) => {
        alert(err.message);
        // notification.error({
        //   message: 'Error',
        //   description: 'Error signing up user',
        //   placement: 'topRight',
        //   duration: 1.5,
        // });
      });
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
                    placeholder='Password (minimum of 8, alphanumeric and symbols)'
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
