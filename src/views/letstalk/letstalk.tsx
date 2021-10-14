import React from 'react';
import { withRouter } from 'react-router';
import { SmileOutlined } from '@ant-design/icons';
import { PhoneFilled } from '@ant-design/icons';
import { MailFilled } from '@ant-design/icons';

import CardWithImage from '../../components/common/wrapper/card-with-image';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';

import './letstalk.styles.scss';

type LetsTalkProps = {
  icon: () => JSX.Element;
  description?: string;
  subDescription?: string;
};

const LetsTalk = () => {
  const listitems: LetsTalkProps[] = [
    {
      icon: () => <SmileOutlined />,
      description: 'Address',
      subDescription: 'USA',
    },
    {
      icon: () => <PhoneFilled />,
      description: 'Phone Number',
      subDescription: '213-800-8046',
    },

    {
      icon: () => <MailFilled />,
      description: 'General Support',
      subDescription: 'chriopractadvertising@gmail.com',
    },
  ];

  return (
    <CardWithImage text="Let's Talk" subTitle='Book an appointment now.'>
      <div className='lets-talk-style'>
        {listitems.map((item) => {
          return (
            <div className='list-style'>
              <div>
                <span className='icon'>{item.icon()}</span>
              </div>
              {verticalSpacer('200px')}
              <div className='description-container'>
                <span className='phone'>{item.description}</span>
                <span className='envelope'>{item.subDescription}</span>
              </div>
            </div>
          );
        })}
      </div>
    </CardWithImage>
  );
};

export default withRouter(LetsTalk);
