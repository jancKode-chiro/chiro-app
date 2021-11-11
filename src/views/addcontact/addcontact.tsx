import { withRouter } from 'react-router';

import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';

import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';

import { CONTACTDATA_PATH } from '../../constants/paths';

import './addcontact.styles.scss';

type InputProps = {
  firstname: string;
  lastname: string;
  email: string;
  group: string;
  phonenumber: string;
  country: string;
};

const AddContact = (): JSX.Element => {
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
    await history.push({
      pathname: CONTACTDATA_PATH,
      state: 'Add contacts',
    });
  };

  return (
    <div>
      <span className='text-wrap'>Add Contact</span>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='text-wrapping'>
          <Input
            placeholder='First Name'
            width={'30vw'}
            required
            {...register('firstname', { required: true })}
          />

          <Input
            placeholder='Last Name'
            width={'30vw'}
            required
            {...register('lastname', { required: true })}
          />
        </div>

        <div className='text-wrapping'>
          <Input
            placeholder='Email'
            width={'30vw'}
            required
            {...register('email', { required: true })}
          />

          <Input
            placeholder='Group'
            width={'30vw'}
            required
            {...register('group', { required: true })}
          />
        </div>

        <div className='text-wrapping'>
          <Input
            placeholder='Phone Number'
            width={'30vw'}
            required
            {...register('phonenumber', { required: true })}
          />

          <Input
            placeholder='Country'
            width={'30vw'}
            required
            {...register('country', { required: true })}
          />
        </div>

        <div className='add-contact-button'>
          <InputButton
            type='submit'
            value='Add Contact'
            className='bg-green text-white '
          />
        </div>
      </form>
    </div>
  );
};
export default withRouter(AddContact);
