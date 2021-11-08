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

type InputProps = {
  email: string;
  activationCode: string;
};

const ActivateCode = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  let history = useHistory();
  const { email } = useAuth();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    Auth.confirmSignUp(data.email, data.activationCode)
      .then(() => {
        alert('Success! Redirecting you to the login page.');
        history.push(LOGIN_PATH);
      })
      .catch((err) => {
        alert(err.message);
        console.log('Error while trying to activate account', err);
      });
  };
  return (
    <CardWithImage text='Activate account'>
      <div className='activation-page'>
        <form onSubmit={handleSubmit(submitHandler)} className='form'>
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
