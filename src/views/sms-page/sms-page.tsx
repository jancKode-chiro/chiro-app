import React, { ReactNode } from 'react';
import { withRouter } from 'react-router';

import Button from '../../components/common/button/button';
import './sms-page.styles.scss';
import Dashboard from '../dashboard/dashboard';
import {
  Input,
  TextArea,
} from '../../components/common/forms/custom-input/input';

const SmsPage = () => {
  return (
    <Dashboard>
      <div className='sms-page'>
        <form>
          <div className='sms-detail-wrapper'>
            <span className='text'>Select Group:</span>
            <Input borderColor='#000000' />
          </div>

          <div className='sms-detail-wrapper'>
            <span className='text'>Recepients:</span>
            <Input borderColor='#000000' />
          </div>

          <div className='sms-detail-wrapper'>
            <span className='text'>SMS text:</span>
            <TextArea borderColor='#000000' rows={3} />
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
                <Button>SEND</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default withRouter(SmsPage);
