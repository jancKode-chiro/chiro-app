import { useState } from 'react';
import { withRouter } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import RepsonsiveContainerGrid from '../../components/common/wrapper/grid-container';

import { ContainerWithImage } from '../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';
import NavBar from '../dashboard/navigation/navigation-bar/navigation-bar';

import './wallet.style.scss';

type InputProps = {
  availableBalance: string;
  cardDetails: string;
  amountInUSD: number;
};

const Wallet = () => {
  const [availableBalance, setAvailabsleBalance] = useState<number>(0);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    // history.push('/dashboard');
    // setIsAuth(true);
    setAvailabsleBalance(data.amountInUSD);
  };

  return (
    <RepsonsiveContainerGrid className='image'>
      <NavBar />
      <ContainerWithImage>
        <div className='wallet'>
          <form className='container' onSubmit={handleSubmit(submitHandler)}>
            <div className='balance-container'>
              <span className='balance-label'>Available Balance</span>
              <div className='balance-details'>
                <span className='balance-text'>${availableBalance}</span>
              </div>
            </div>

            <Input
              placeholder='Card Details'
              width='25vw'
              required
              marginBottom='2rem'
              {...register('cardDetails', { required: true })}
            />

            <Input
              placeholder='Amount in USD'
              width='25vw'
              marginBottom='2rem'
              required
              type='number'
              {...register('amountInUSD', { required: true })}
            />

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
