import React from 'react';
import { withRouter } from 'react-router';

import CardWithImage from '../../components/common/wrapper/card-with-image';
import './about.styles.scss';

//import card with image
const AboutUsPage = () => {
  return (
    <CardWithImage text='About us' className='welcome'>
      <div className='about'>
        <div>
          <span className='title'>Lorem Ipsum</span>

          <div className='description-wrapper'>
            <span className='description'>
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minin veniam, quis nodtrud ecercitation ullamnco laboris
              nisi ut aliquip ex ea commodo consequat
            </span>
          </div>
        </div>
      </div>
    </CardWithImage>
  );
};

export default withRouter(AboutUsPage);
