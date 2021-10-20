import { withRouter } from 'react-router';

import RepsonsiveContainerGrid from '../../components/common/wrapper/grid-container';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';

import { ContainerWithImage } from '../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';
import { Input as AntInput } from 'antd';

import './wallet.style.scss';

import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';

type WalletProps = {
  setAuth: () => Boolean;
};

type InputProps = {
  cardDetails: string;
  amountInUSD: string;
};

const Wallet = () => {
  const { isAuth, setIsAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    history.push('/dashboard');
    // setIsAuth(true);
    console.log(data);
  };

  return (
    <RepsonsiveContainerGrid className='image'>
      <ContainerWithImage>
        <div>
          <form className='container' onSubmit={handleSubmit(submitHandler)}>
            <AntInput.TextArea
              rows={12}
              cols={41}
              placeholder='Available Balance'
              className='balance'
              required
              {...register('cardDetails', { required: true })}
            />

            {verticalSpacer('60px')}

            <Input
              placeholder='Card Details'
              width='25vw'
              required
              {...register('cardDetails', { required: true })}
            />
            {verticalSpacer('40px')}
            <Input
              placeholder='Amount in USD'
              width='25vw'
              required
              {...register('amountInUSD', { required: true })}
            />

            {verticalSpacer('50px')}

            <InputButton
              type='submit'
              value='Save'
              className='bg-green text-white'
            />
          </form>
        </div>
      </ContainerWithImage>
    </RepsonsiveContainerGrid>
  );
};
export default withRouter(Wallet);
