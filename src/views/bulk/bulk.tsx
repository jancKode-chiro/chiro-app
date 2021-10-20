import React from 'react';
import { withRouter } from 'react-router';

import ResponsiveContainerGrid from '../../components/common/wrapper/grid-container';
import Button from '../../components/common/button/button';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';

import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';
import { Input as AntInput } from 'antd';
import { ContainerWithImage } from '../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';

import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';

import './bulk.scss';

type BulkProps = {
  setAuth: () => Boolean;
};

type InputProps = {
  message: string;
};

const Bulk = ({ setAuth }: any) => {
  const { isAuth, setIsAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    setIsAuth(true);
    history.push('/dashboard');
    // setIsAuth(true);
    console.log(data);
  };

  return (
    <ResponsiveContainerGrid>
      <ContainerWithImage>
        <div className='sms'>
          <div>
            <span className='bulk'>Bulk SMS</span>
          </div>
          {verticalSpacer('28px')}
          <div>
            <form className='form' onSubmit={handleSubmit(submitHandler)}>
              <div className='group'>
                <span className='search'>Search</span>
                <button className='choosefile'>Choose File</button>

                {verticalSpacer('28px')}

                <span className='bar'>MESSAGE</span>
              </div>
              <AntInput.TextArea rows={15} cols={50} />

              {verticalSpacer('16px')}
              <div>
                <InputButton
                  type='submit'
                  value='Send'
                  className='bg-green text-white'
                />
              </div>
            </form>
          </div>
        </div>
      </ContainerWithImage>
    </ResponsiveContainerGrid>
  );
};
export default withRouter(Bulk);
