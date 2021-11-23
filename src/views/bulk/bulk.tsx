import React from 'react';
import { withRouter } from 'react-router';
import { Input as AntInput } from 'antd';

import ResponsiveContainerGrid from '../../components/common/wrapper/grid-container';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import { InputButton } from '../../components/common/forms/custom-input/input';
import { ContainerWithImage } from '../../components/common/wrapper/wrapper-with-image/wrapper-with-bg-image';

import { VscArrowLeft } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import './bulk.scss';

type InputProps = {
  message: string;
};

const Bulk = ({ setAuth }: any) => {
  // const { isAuth, setIsAuth } = useAuth();
  const { handleSubmit } = useForm();
  let history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = (data): void => {
    // setIsAuth(true);
    history.push('/dashboard');
    // setIsAuth(true);
  };

  const onClickHandler = (): void => {
    history.goBack()
  }

  return (
    <ResponsiveContainerGrid>
      <ContainerWithImage>
        <VscArrowLeft className='arrow-sms' onClick={onClickHandler} />
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
