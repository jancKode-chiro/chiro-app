import React from 'react';
import CardWithImage from '../../components/common/wrapper/card-with-image';
import verticalSpacer from '../../components/common/spacer/vertical-spacer';
import './about.styles.scss';

//import card with image
const AboutUsPage = () => {
  return (
    <CardWithImage>
      <div>
        <div>
          {verticalSpacer('36px')}
          <span className='title'>Lorem Ipsum</span>
          {verticalSpacer('56px')}
          <div>
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

export default AboutUsPage;
