import React, { useState, useEffect, ChangeEvent } from 'react';
import { withRouter } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import * as XLSX from 'xlsx'

import CustomSelect from '../../components/select/select';
import Dashboard from '../dashboard/dashboard';
import {
  Input,
  InputButton,
  CustomTextArea,
} from '../../components/common/forms/custom-input/input';

import { sendSMS } from '../../api/sms-service';
import { CustomDiv } from '../../components/common/wrapper/custom-wrapper/custom-wrapper';

import './sms-page.styles.scss';
import { readExcelFile } from '../../utilities/excel-parser';
import { Button, Grid, Form, Segment } from 'semantic-ui-react';
import CustomModal from '../../components/modal/modal';


type InputProps = {
  recipients: string[];
  message: string;
};

const SmsPage = () => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [smsContent, setSmsContent] = useState('')
  const { register, handleSubmit, formState, reset, control } = useForm({
    mode: "onChange"
  });

  const { isValid } = formState;

  const onClickHander = (): void => {
    setRecipients((prevState: string[]) => [...prevState, `+${currentRecipient}`]);
    setCurrentRecipient('')
    reset({ currentRecipient: '' })
  };

  const sumbitHanlder = async (data: InputProps) => {
    const combineRecipients = recipients.join(',');

    const result = await sendSMS(
      '/send-messages',
      combineRecipients,
      smsContent
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
      <Form className='sms-page' onSubmit={handleSubmit(sumbitHanlder)}>
        <Grid columns='equal' relaxed stackable>
          <Grid.Row className='grid-row'>
            <Grid.Column width='3'>
              <span className='text'>Select Group:</span>
            </Grid.Column>
            <Grid.Column width='9' >
              <CustomSelect />
            </Grid.Column>
            <Grid.Column width='3' >
              <Button>Search</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='grid-row'>
            <Grid.Column width='3'>
              <span className='text'>Add Recipient/s:</span>
            </Grid.Column>
            <Grid.Column width='4'>
              <Input
                type='number'
                className='input-number'
                borderColor='#000000'
                width='12rem'
                marginRight='4rem'
                marginLeft='.2rem'
                pattern='^[0-9]*$'
                {...register('currentRecipient', {
                  onChange: (e) => setCurrentRecipient(e.target.value),
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Invalid contact number'
                  }
                })}
              />
            </Grid.Column>
            <Grid.Column width='3' >
              <InputButton disabled={!currentRecipient} type='button' value='ADD CONTACT'
                onClick={() => onClickHander()}
                className={`bg-green text-white ${currentRecipient.length < 1 ? 'bg-gray' : ''}`} />
            </Grid.Column>
            <Grid.Column width='4'>

              <label className="upload-contacts">
                UPLOAD CONTACTS
                <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  readExcelHandler(e.target.files)
                }} />

              </label>
            </Grid.Column>
          </Grid.Row>
          {recipients.length > 0 ? <Grid.Row className='recipients-list-wrapper'>
            <Grid.Column width='3' >
              <span className='recipient-label'>Recipient/s:</span>
            </Grid.Column>
            <Grid.Column className='recipients-list' width='12'>
              <span className='recipient-label'>{recipients ? recipients.join(',') : null}</span>
              <CustomModal
                headerText='Clear recipients'
                contentText='Are you sure you want to clear all the recipients?'
                buttonTriggerText='Clear recipients?'
                onOpenCallback={() => setRecipients([])}
                customComponent={<span className='clear-button'>X</span>}
                onCloseButtonText='No'
                onOpenButtonText='Yes'
              />
            </Grid.Column>
          </Grid.Row> : null}
          <Grid.Row className='sms-detail-wrapper'>
            <Grid.Column width='3'>
              <span className='text'>SMS text:</span>
            </Grid.Column>
            {console.log('message', smsContent)}
            <Controller
              name='message'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Grid.Column width='10'>
                  <CustomTextArea
                    rows={3}
                    onChange={(e: any) => setSmsContent(e.target.value)}
                    value={value}

                  />
                </Grid.Column>
              )}

            />
            {/* <Grid.Column width='10'>
              <CustomTextArea
                borderColor='#000000'
                rows={3} {...register('message')}
              />
            </Grid.Column> */}
          </Grid.Row>
          {recipients.length && smsContent ? <Grid.Row className='sms-inputs'>

            <InputButton
              width='85%'
              type='submit'
              value='SEND'
              className={`bg-green text-white ${(!isValid && recipients.length === 0) ? 'bg-gray' : ''
                }`}
            />

          </Grid.Row> : null}
        </Grid>
      </Form>
    </Dashboard >
  );
};

export default withRouter(SmsPage);
