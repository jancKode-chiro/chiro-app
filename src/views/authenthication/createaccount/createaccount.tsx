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
import { createUser } from '../../../api/users';
import { useAuth } from '../../../context/auth-context';

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
    // formState: { errors },
  } = useForm();
  let history = useHistory();
  const { setInputEmail } = useAuth();

  const submitHandler: SubmitHandler<InputProps> = async (
    data
  ): Promise<void> => {
    // history.push('/dashboard');
    setInputEmail(data.email);
    const name = `${data.firstName} ${data.lastName}`;

    try {
      let result = await createUser(
        name,
        data.email,
        data.phoneNumber,
        'User',
        data.password,
        data.country,
        data.countryCode
      );
      console.log('crate-account-result', result);
      if (result)
        await history.push({
          pathname: ACTIVATE_ACCOUNT_PATH,
          state: 'signUp',
        });
    } catch (error) {
      alert(error);
    }
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
                    type='text'
                    pattern='^[0-9]*$'
                    // pattern='/^\+\d+$/'
                    {...register('phoneNumber', {
                      required: true,
                      minLength: 11,
                      min: 0,
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
