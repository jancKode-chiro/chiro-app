import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import {
  Input,
  InputButton,
  PasswordInput
} from '../../components/common/forms/custom-input/input';

import CustomModal from '../../components/modal/modal';
import AddSelect from '../../components/add-select/add-select';

import { ACTIVATE_ACCOUNT_PATH, ADDUSER_PATH, DASHBOARD_PATH, USERS_PATH } from '../../constants/paths';
import { createUser } from '../../api/users';
import { useAuth } from '../../context/auth-context';
import { InlineSingleErrorMessage } from '../../components/common/notification/inline-notification/inline-notification';
import { toast } from 'react-toastify';
import { Grid } from 'semantic-ui-react'

import './add-user.styles.scss'





type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
};

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
          pathname: DASHBOARD_PATH,
          state: 'Thank you for creating one!',
        });
    } catch (error: any) {
      toast.error(error)
    }
  };


  const showPasswordHandler = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='add-user-account'>
      {/* <RepsonsiveContainerGrid>
        <ContainerWithImage> */}
      <div className='create-account-user-form'>
        <span className='user-title'>Create User</span>
        <div className='user-form'>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='text-user-wrapper'>
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

            <div className='text-user-wrapper'>
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
                <div className='password-user-input'>
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


            <div className='text-user-wrapper'>
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

              <Grid columns='equal' relaxed stackable>
                <Grid.Row className='user-grid-row'>
                  <Grid.Column>
                    <span className='user-text'>Select Role:</span>
                  </Grid.Column>
                  <Grid.Column width='16' >
                    <AddSelect />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </div>



            <div className='text-user-wrapper'>
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
            <div className='create-user-button'>

              <InputButton
                type='submit'
                // disabled={!isValid}
                // disabled={!isDirty || !isValid}
                value='Create User'
                className='bg-green text-white '
              />
              {/* <CustomModal
                headerText='Create User'
                buttonTriggerText='Create User?'
                onOpenCallback={() => setRecipients([])}
                onCloseButtonText='No'
                onOpenButtonText='Yes'
                contentText={''}
              /> */}
            </div>
          </form>
        </div>
      </div>
      {/* </ContainerWithImage>
      </RepsonsiveContainerGrid> */}
    </div>
  );
};

export default withRouter(AddUser);