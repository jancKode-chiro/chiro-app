import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import RepsonsiveContainerGrid from '../../../components/common/wrapper/grid-container';
import {
  Input,
  InputButton,
  PasswordInput,
} from '../../../components/common/forms/custom-input/input';
import { ContainerWithImage } from '../../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';
import './createaccount.styles.scss';
import { ACTIVATE_ACCOUNT_PATH } from '../../../constants/paths';
import { createUser } from '../../../api/users';
import { useAuth } from '../../../context/auth-context';
import { InlineSingleErrorMessage } from '../../../components/common/notification/inline-notification/inline-notification';
import { toast } from 'react-toastify';

type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
};

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();
  const { setInputEmail } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const submitHandler: SubmitHandler<InputProps> = async (
    data
  ): Promise<void> => {
    // history.push('/dashboard');
    setInputEmail(data.email);

    try {
      let result = await createUser(
        data.firstName,
        data.lastName,
        data.email,
        data.phoneNumber,
        'User',
        data.password,
        data.country,
        data.countryCode
      );

      if (result)
        await history.push({
          pathname: ACTIVATE_ACCOUNT_PATH,
          state: 'signUp',
        });
    } catch (error: any) {
      toast.error(error)
    }
  };


  const showPasswordHandler = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='create-account'>
      <RepsonsiveContainerGrid>
        <ContainerWithImage>
          <div className='create-account-form'>
            <span className='title'>Create Account</span>
            <div className='form'>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className='text-wrapper'>
                  <div>
                    <Input
                      placeholder='First Name'
                      width={'25vw'}
                      {...register('firstName', { required: 'First name is Required' })}
                    />

                    <InlineSingleErrorMessage
                      errors={errors}
                      name='firstName'
                    />
                  </div>
                  <div>
                    <Input
                      placeholder='Last Name'
                      width='25vw'
                      {...register('lastName', { required: 'Last name is required' })}
                    />

                    <InlineSingleErrorMessage
                      errors={errors}
                      name='lastName'
                    />
                  </div>
                </div>

                <div className='text-wrapper'>
                  <div>
                    <Input
                      placeholder='Email'
                      type='email'
                      width='25vw'
                      {...register('email', { required: 'Email is required' })}
                    />

                    <InlineSingleErrorMessage
                      errors={errors}
                      name='email'
                    />
                  </div>
                  <div>
                    <div className='password-input'>
                      <PasswordInput
                        placeholder='Password (minimum of 8, alphanumeric and symbols)'
                        type={showPassword ? 'text' : 'password'}
                        width='25vw'
                        {...register('password', { required: 'Password is required' })}
                      />
                      {showPassword ? <FaEyeSlash onClick={showPasswordHandler} className='eye-icon' />
                        : <FaEye onClick={showPasswordHandler} className='eye-icon' />}
                    </div>
                    <InlineSingleErrorMessage
                      errors={errors}
                      name='password'
                    />
                  </div>

                </div>

                <div className='text-wrapper'>
                  <div>
                    <Input
                      placeholder='Phone Number'
                      width='25vw'
                      type='text'
                      pattern='^[0-9]*$'
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        minLength: {
                          value: 11,
                          message: 'Minimum length is 11'
                        },
                        min: 0,
                      })}
                    />
                    <InlineSingleErrorMessage
                      errors={errors}
                      name='phoneNumber'
                    />
                  </div>
                </div>

                <div className='text-wrapper'>
                  <div>
                    <Input
                      placeholder='Country'
                      width='25vw'
                      {...register('country', { required: 'Country is required' })}
                    />

                    <InlineSingleErrorMessage
                      errors={errors}
                      name='country'
                    />
                  </div>
                  <div>
                    <Input
                      placeholder='Country Code'
                      width='25vw'
                      {...register('countryCode', {
                        required: 'Country code is required',
                      })}
                    />
                    <InlineSingleErrorMessage
                      errors={errors}
                      name='countryCode'
                    />
                  </div>
                </div>
                <div className='create-button'>
                  <InputButton
                    type='submit'
                    // disabled={!isDirty || !isValid}
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
