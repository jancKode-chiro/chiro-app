import React, { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';

import RepsonsiveContainerGrid from './grid-container';
import ResponsiveCard from './card/card';

import './grid-container.styles.scss';
import { StyledLink } from '../../link/link';

type CardWithImageProps = {
  children?: ReactNode;
  text?: string;
  footerText1?: string;
  footerText2?: string;
  footerLink1?: string;
  footerLink2?: string;
  subTitle?: string;
  className?: string;
};

const CardWithImage = ({
  children,
  text,
  footerText1,
  footerText2,
  footerLink1,
  footerLink2,
  subTitle,
  className,
}: CardWithImageProps) => {
  const renderFooter = () => {
    if (footerLink1 || footerLink2) {
      return (
        <div className='footer'>
          <StyledLink to={footerLink1 as string} className='footerText1'>
            {footerText1}
          </StyledLink>
          <StyledLink to={footerLink2 as string} className='footerText2'>
            {footerText2}
          </StyledLink>
        </div>
      );
    }
  };
  return (
    <RepsonsiveContainerGrid className='grid-container'>
      <Grid
        style={{
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <ResponsiveCard xsSize='12' smSize='6' mdSize='8'>
          <div className='card-with-image'>
            <div className='greetingsContainer'>
              <div className={`banner ${className ?? className}`}>
                <span className='banner-title'>{text}</span>
                <span className='banner-sub'>{subTitle}</span>
              </div>
            </div>

            {renderFooter()}
          </div>
        </ResponsiveCard>
        <ResponsiveCard xsSize='12' smSize='6' mdSize='8'>
          {children}
            { @media only screen and (min-device-width: 320px) and (max-device-width: 480px)} 
        </ResponsiveCard>
      </Grid>
    </RepsonsiveContainerGrid>
  );
};

export default CardWithImage;
