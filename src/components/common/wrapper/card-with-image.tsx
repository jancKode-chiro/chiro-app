import React, { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import RepsonsiveContainerGrid from './grid-container';
import ResponsiveCard from './card';

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
};

const CardWithImage = ({
  children,
  text,
  footerText1,
  footerText2,
  footerLink1,
  footerLink2,
  subTitle,
}: CardWithImageProps) => {
  return (
    <RepsonsiveContainerGrid className='grid-container'>
      <Grid
        style={{
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <ResponsiveCard>
          <div className='card-with-image'>
            <div className='greetingsContainer'>
              <div className='banner'>
                <span className='banner-title'>{text}</span>
                <span className='banner-sub'>{subTitle}</span>
              </div>
            </div>
            <div className='footer'>
              <StyledLink to={footerLink1 as string} className='footerText1'>
                {footerText1}
              </StyledLink>
              <StyledLink to={footerLink2 as string} className='footerText2'>
                {footerText2}
              </StyledLink>
            </div>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>{children}</ResponsiveCard>
      </Grid>
    </RepsonsiveContainerGrid>
  );
};

export default CardWithImage;
