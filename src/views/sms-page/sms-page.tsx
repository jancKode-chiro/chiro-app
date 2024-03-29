import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { withRouter } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as XLSX from 'xlsx'

import CustomSelect from '../../components/select/select';
import Dashboard from '../dashboard/dashboard';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';
import { sendSMS } from '../../api/sms-service';
import { Grid, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker'
import CustomModal from '../../components/modal/modal';

import "react-datepicker/dist/react-datepicker.css"
import './sms-page.styles.scss';
import { usePayment } from '../../context/payment-context';
import { isEmpty, toNumber } from 'lodash';
import { updateBalance } from '../../api/payments';
import { useAuth } from '../../context/auth-context';
import { getTemplates } from '../../api/template';

type InputProps = {
  recipients: string[];
  message: string;
};

const SmsPage = () => {
  const { data } = useQuery(['templates'], () =>
    getTemplates());

  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [smsContent, setSmsContent] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [templates, setTemplates] = useState<any>([])
  const { register, handleSubmit, formState, reset, control, } = useForm({
    mode: "onChange"
  });
  const { balance, setCurrentBalance } = usePayment()
  const { currentUserId } = useAuth()

  const { isValid } = formState;
  const loadId = useRef(null) as any;
  const loadDate = useRef(new Date() as any);


  const notifyDate = () => toast.update(loadDate.current, { render: 'Schedule has been set', type: toast.TYPE.SUCCESS, autoClose: 10000 })


  let handleColor = (time: { getHours: () => number; }) => {
    return time.getHours() > 12 ? "text-success" : "text-error";

  };

  const onClickHander = (): void => {
    setRecipients((prevState: string[]) => [...prevState, `+${currentRecipient}`]);
    setCurrentRecipient('')
    reset({ currentRecipient: '', smsContent: smsContent });
  };

  const notify = () => loadId.current = toast('Sending message...', { type: toast.TYPE.INFO, autoClose: false });

  const update = () => toast.update(loadId.current, { render: 'Message was successfully delivered', type: toast.TYPE.SUCCESS, autoClose: 3000 })
  const updateError = () => toast.update(loadId.current, {
    render: 'Something went wrong when trying to send your message, please check if the number is valid',
    type: toast.TYPE.ERROR, autoClose: 3000
  })
  const sumbitHanlder = async (data: InputProps) => {
    notify();
    const combineRecipients = recipients.join(',');
    const result = await sendSMS(
      'api/sms',
      combineRecipients,
      smsContent,
      '0101',
      selectedDate!
    );
    if (result?.data?.status === 200) {
      const toDeduct: number = recipients.length * .08;
      const updatedBaLance = toNumber(balance) - toDeduct
      update()
      setRecipients([]);
      setCurrentRecipient('');
      setCurrentBalance(updatedBaLance)
      await updateBalance(currentUserId, updatedBaLance, toDeduct)
      reset({ message: smsContent, recipients: setRecipients });
    } else {
      updateError()
    }
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      let template = data?.map((template) => {
        return {
          value: template.content,
          label: template.title
        }
      })
      setTemplates(template);
    }
  }, [recipients, data]);


  const readExcelHandler = async (file: any) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file[0] as any);

    fileReader.onload = (e) => {
      const bufferArray = e.target?.result;

      const workBook = XLSX.read(bufferArray, { type: 'buffer' });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const data = XLSX.utils.sheet_to_json(workSheet);

      // const joinData = data.filter((o: any) => o['Name'] === 'Juan Od').map((person: any) => person.contact_number).join(',')
      const joinData = data.map((person: any) => person.contact_number).join(',')

      setRecipients([joinData])

      return data;
    };
  }

  const handleChange = (value: any) => {
    if (!isEmpty(value)) {
      setSmsContent(value?.value)
    }
  }

  return (

    <Dashboard isNavbar={true}>
      <Form className='sms-page' onSubmit={handleSubmit(sumbitHanlder)}>
        <Grid columns='equal' relaxed stackable>
          <Grid.Row className='grid-row'>
            <Grid.Column width='2'>
              <span className='text'>Select Group:</span>
            </Grid.Column>
            <Grid.Column width='8' mobile={4} >
              <CustomSelect isDisabled={true} />
            </Grid.Column>
            <Grid.Column width='3' mobile={4} tablet={6}>
              <label className="upload-contacts">
                UPLOAD CONTACTS
                <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  readExcelHandler(e.target.files)
                }} />

              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='grid-row' >
            <Grid.Column width={2}>
              <span className='text'>Add Recipient/s:</span>
            </Grid.Column>
            <Grid.Column width='8'>
              <Input
                type='number'
                inputMode='numeric'
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

          </Grid.Row>
          {recipients.length > 0 ? <Grid.Row className='recipients-list-wrapper'>
            <Grid.Column width={2} >
              <span className='recipient-label'>Recipient/s:</span>
            </Grid.Column>
            <Grid.Column className='recipients-list' width={6}>
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
          <Grid.Row>
            <Grid.Column width={2}>
              <span className='text'>Choose a schedule:</span>
            </Grid.Column>
            <Grid.Column width={2} tablet={8}>
              <Controller
                name=''
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    onChange={(date: Date) => setSelectedDate(date)}
                    selected={selectedDate}
                    placeholderText="Select date and time"
                    showTimeSelect={true}
                    dateFormat="Pp"
                    isClearable
                    timeClassName={handleColor}
                    withPortal
                  // disabled
                  />
                )}
              />

            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='grid-row'>
            <Grid.Column width='2'>
              <span className='text'>Select a Template:</span>
            </Grid.Column>

            <Grid.Column width='8' mobile={4} >
              <CustomSelect options={templates} onChange={handleChange} isMultiple={false} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='sms-detail-wrapper' >
            <Grid.Column width={2} >
              <span className='text'>SMS text:</span>
            </Grid.Column>
            <Controller
              name='message'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Grid.Column width={8} mobile={8}>
                  <textarea {...register('smsContent', {
                    onChange: (e: any) => setSmsContent(e.target.value),
                  })} value={smsContent} />
                </Grid.Column>
              )}

            />
            {(recipients.length && smsContent && Boolean(toNumber(balance) > 0)) ? <Grid.Column className='sms-inputs'>
              <InputButton
                width='85%'
                type='submit'
                value='SEND'
                className={`bg-green text-white ${(!isValid && recipients.length === 0) ? 'bg-gray' : ''
                  }`}
              />
            </Grid.Column> : null}
          </Grid.Row>

        </Grid>
      </Form>

    </Dashboard >
  );
};

export default withRouter(SmsPage);
