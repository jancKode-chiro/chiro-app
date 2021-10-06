import React, { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import RepsonsiveContainerGrid from './grid-container';
import ResponsiveCard from './card';
import bg from '../../../assets/images/bg-half.png';

import './grid-container.styles.scss';

type CardWithImageProps = {
  children?: ReactNode;
  text?: string;
  footerText1?: string;
  footerText2?: string;
  footerLink1?: string;
  footerLink2?: string;
};

const CardWithImage = ({
  children,
  text,
  footerText1,
  footerText2,
  footerLink1,
  footerLink2,
}: CardWithImageProps) => {
  return (
    <RepsonsiveContainerGrid className='container'>
      <Grid
        style={{
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <ResponsiveCard>
          <div>
            <img src={bg} alt='bg' width='100%' />

            <div className='greetingsContainer'>
              <div>
                <span className='text'>{text}</span>
              </div>
              {/* <div className='footer'>
            <span  className='footerText1'>{footerText1}</span>
             <span  className='footerText2'>{footerText2}</span>
            </div> */}
            </div>
            <div className='footer'>
              <Link to={footerLink1 as string} className='footerText1'>
                {footerText1}
              </Link>
              <span className='footerText2'>{footerText2}</span>
            </div>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>{children}</ResponsiveCard>
      </Grid>
    </RepsonsiveContainerGrid>
  );
};

export default CardWithImage;
