import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import ResponsiveGridContainer from '../../components/common/wrapper/grid-container';
import CheckIcons from '../../assets/images/icons/Card.png';

import './card.style.scss';
import { ContainerWithImage } from '../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';

import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';

type CardProps = {
  setAuth: () => Boolean;
};

type InputProps = {
  bankName: string;
  name: string;
  cardNumber: string;
};

const Card = () => {
  const { isAuth, setIsAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();
  const [bankName, setBankName] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    history.push('/dashboard');
    // setIsAuth(true);
    console.log(data);
  };

  useEffect(() => {
    document.title = ` ${caches} `;
  });

  return (
    <ResponsiveGridContainer>
      <ContainerWithImage>
        {console.log(bankName)}
        <div>
          <img src={CheckIcons} alt='check-icon' />
          {verticalSpacer('1.25em')}
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='bank'>
              <Input
                placeholder='Bank Name'
                value={bankName}
                required
                {...register('bankName', { required: true })}
              />
            </div>
            {verticalSpacer('1.25em')}
            <div>
              <Input
                placeholder='Name '
                value={name}
                required
                {...register('Name', { required: true })}
              />
            </div>
            {verticalSpacer('1.625em')}
            <div>
              <Input
                placeholder='Card Number'
                value={cardNumber}
                required
                {...register('cardNumber', { required: true })}
              />
            </div>
            {verticalSpacer('1.5625em')}

            <div>
              <InputButton
                type='submit'
                value='Save'
                onClick={() => alert('Saved')}
                className='bg-green text-white'
              />
            </div>
          </form>
        </div>
      </ContainerWithImage>
    </ResponsiveGridContainer>
  );
};
export default withRouter(Card);
