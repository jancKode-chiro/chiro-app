import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import CustomSelect from '../../components/select/select';

import Dashboard from '../dashboard/dashboard';
import {
  Input,
  InputButton,
  TextArea,
} from '../../components/common/forms/custom-input/input';

import { sendSMS } from '../../api/sms-service';
import { useForm } from 'react-hook-form';
import { CustomDiv } from '../../components/common/wrapper/custom-wrapper/custom-wrapper';

import './sms-page.styles.scss';


type InputProps = {
  recipients: string[];
  message: string;
};

const SmsPage = () => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const { register, handleSubmit } = useForm();

  const onClickHander = (): void => {
    setRecipients((prevState: string[]) => [...prevState, currentRecipient]);

  };

  const sumbitHanlder = async (data: InputProps) => {
    const combineRecipients = recipients.join(',');

    const result = await sendSMS(
      '/send-messages',
      combineRecipients,
      data.message
    );

    if (result) {
      setRecipients([]);
      setCurrentRecipient('');
    }
  };

  useEffect(() => {

  }, [recipients]);
  return (
    <Dashboard isNavbar={true}>
      <div className='sms-page'>
        <form onSubmit={handleSubmit(sumbitHanlder)}>
          <div className='sms-detail-wrapper'>
            <span className='text'>Select Group:</span>
            <div style={{
              width: '83vw',
            }}>
              <CustomSelect />
            </div>
            {/* <Input borderColor='#000000' {...register('group')} /> */}
          </div>
          <CustomDiv
            justifyContent='center'
            display={recipients.length > 0 ? 'flex' : ''}
            alignItems='center'
            paddingBottom='2rem'
            width='95%'
            margin='auto'
            flexDirection='column'
          >

            <CustomDiv
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <span className='text'>Add Recipient/s:</span>
              <Input
                type='input'
                borderColor='#000000'
                width='12rem'
                marginRight='4rem'
                required
                marginLeft='.2rem'
                {...register('recipients', {
                  onChange: (e) => setCurrentRecipient(e.target.value),

                })}
              />
              <InputButton disabled={!currentRecipient} type='button' value='ADD CONTACT'
                onClick={() => onClickHander()}
                className={`bg-green text-white ${currentRecipient.length < 1 ? 'bg-gray' : ''}`} />
            </CustomDiv>
            <div >
              {recipients.length > 0 ? (<div className='recipients-list-wrapper'><span className='recipient-label'>Recipient/s:</span>
                <div className='recipients-list'>
                  <span>{recipients ? recipients.join(',') : null}</span>
                </div></div>) : null}
            </div>

          </CustomDiv>

          <div className='sms-detail-wrapper'>
            <span className='text'>SMS text:</span>
            <TextArea borderColor='#000000' rows={3} {...register('message')} />
          </div>

          <div className='sms-inputs'>
            <span className='text'>Send SMS: </span>
            <div className='sms-elements'>
              <div>
                <input type='radio' value='Immediately' name='Immediately' />
                Immediately
              </div>
              <div>
                <input type='radio' />
                Start sending at:
              </div>
              <Input width='6.2vw' />
              <div className='button-a'>
                <InputButton
                  disabled={recipients.length < 1}
                  type='submit'
                  value='SEND'
                  className={`bg-green text-white ${recipients.length < 1 ? 'bg-gray' : ''
                    }`}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard >
  );
};

export default withRouter(SmsPage);
