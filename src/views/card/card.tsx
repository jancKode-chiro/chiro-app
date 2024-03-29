import { useEffect } from 'react';
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
import NavBar from '../dashboard/navigation/navigation-bar/navigation-bar';

type InputProps = {
  bankName: string;
  name: string;
  cardNumber: string;
};

const Card = () => {
  // const { isAuth, setIsAuth } = useAuth();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  let history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    history.push('/dashboard');
    // setIsAuth(true);
  };

  useEffect(() => {
    document.title = ` ${caches} `;
  });

  return (
    <ResponsiveGridContainer>
      <NavBar />
      <ContainerWithImage>

        <div>
          <div className='cardimage'>
            <img src={CheckIcons} alt='check-icon' />
          </div>
          {verticalSpacer('1.25em')}
          <div>
            <form className='container' onSubmit={handleSubmit(submitHandler)}>
              <Input
                placeholder='Bank Name'
                // value={bankName}
                width='25vw'
                required
                {...register('bankName', { required: true })}
              />

              {verticalSpacer('1.25em')}

              <Input
                placeholder='Name '
                // value={name}
                width='25vw'
                required
                {...register('Name', { required: true })}
              />

              {verticalSpacer('1.625em')}

              <Input
                placeholder='Card Number'
                // value={cardNumber}
                width='25vw'
                required
                {...register('cardNumber', { required: true })}
              />

              {verticalSpacer('1.5625em')}

              <InputButton
                type='submit'
                value='Save'
                onClick={() => alert('Saved')}
                className='bg-green text-white'
              />
            </form>
          </div>
        </div>
      </ContainerWithImage>
    </ResponsiveGridContainer>
  );
};
export default withRouter(Card);
