import React, { useState, useEffect, ChangeEvent } from 'react';
import { withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import * as XLSX from 'xlsx'

import CustomSelect from '../../components/select/select';
import Dashboard from '../dashboard/dashboard';
import {
  Input,
  InputButton,
  TextArea,
} from '../../components/common/forms/custom-input/input';

import { sendSMS } from '../../api/sms-service';
import { CustomDiv } from '../../components/common/wrapper/custom-wrapper/custom-wrapper';

import './sms-page.styles.scss';
import { readExcelFile } from '../../utilities/excel-parser';


type InputProps = {
  recipients: string[];
  message: string;
};

const SmsPage = () => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange"
  });

  const { isValid } = formState;

  const onClickHander = (): void => {
    setRecipients((prevState: string[]) => [...prevState, `+${currentRecipient}`]);
    setCurrentRecipient('')



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


  const readExcelHandler = async (file: any) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file[0] as any);

    fileReader.onload = (e) => {
      const bufferArray = e.target?.result;

      const workBook = XLSX.read(bufferArray, { type: 'buffer' });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const data = XLSX.utils.sheet_to_json(workSheet);

      const joinData = data.filter((o: any) => o['Name'] === 'Juan Od').map((person: any) => person.contact_number).join(',')

      setRecipients([joinData])

      return data;
    };
  }


  return (
    <Dashboard isNavbar={true}>
      <div className='sms-page'>
        <form onSubmit={handleSubmit(sumbitHanlder)} >
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
                type='number'
                className='input-number'
                borderColor='#000000'
                width='12rem'
                marginRight='4rem'
                marginLeft='.2rem'
                pattern='^[0-9]*$'
                {...register('recipients', {
                  onChange: (e) => setCurrentRecipient(e.target.value),
                  required: true,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Invalid contact number'
                  }
                })}
              />
              <InputButton disabled={!currentRecipient} type='button' value='ADD CONTACT'
                onClick={() => onClickHander()}
                className={`bg-green text-white ${currentRecipient.length < 1 ? 'bg-gray' : ''}`} />


              <label className="upload-contacts">
                UPLOAD CONTACTS
                <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  readExcelHandler(e.target.files)
                }} />

              </label>
            </CustomDiv>
            <div >
              {recipients.length > 0 ?
                (<div className='recipients-list-wrapper'><span className='recipient-label'>Recipient/s:</span>
                  <div className='recipients-list'>
                    <div>
                      <span>{recipients ? recipients.join(',') : null}</span>

                    </div>
                    <span className='clear-button' onClick={() => setRecipients([])}>X</span>
                  </div>
                </div>) : null}
            </div>

          </CustomDiv>

          <div className='sms-detail-wrapper'>
            <span className='text'>SMS text:</span>
            <TextArea
              required borderColor='#000000' rows={3} {...register('message', {
                required: true
              })} />
          </div>

          <div className='sms-inputs'>
            {/* <span className='text'>Send SMS: </span> */}
            <div className='sms-elements'>
              {/* <div>
                <input type='radio' value='Immediately' name='Immediately' />
                Immediately
              </div>
              <div>
                <input type='radio' />
                Start sending at:
              </div>
              <Input width='6.2vw' /> */}
              <div className='button-a'>

                <InputButton
                  disabled={!isValid || recipients.length < 1}
                  type='submit'
                  value='SEND'
                  className={`bg-green text-white ${(!isValid || recipients.length < 1) ? 'bg-gray' : ''
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
