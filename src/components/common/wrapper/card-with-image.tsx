import React, { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';

import RepsonsiveContainerGrid from './grid-container';
import ResponsiveCard from './card';

import './grid-container.styles.scss';
import { StyledLink } from '../../link/link';
import { useHistory } from 'react-router-dom';
import { VscArrowLeft } from 'react-icons/vsc';


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
  const history = useHistory();

  const onClickHandler = (): void => {
    history.goBack()
  }
  const renderFooter = () => {
    if (footerLink1 || footerLink2) {
      return (
        <div>
          <div className='footer'>
            <StyledLink to={footerLink1 as string} className='footerText1'>
              {footerText1}
            </StyledLink>
            <StyledLink to={footerLink2 as string} className='footerText2'>
              {footerText2}
            </StyledLink>
          </div>
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
        <ResponsiveCard>

          <div className='card-with-image'>
            <div className='arrow'>
              <VscArrowLeft onClick={onClickHandler} />
            </div>
            <div className='greetingsContainer'>

              <div className={`banner ${className ?? className}`}>
                <span className='banner-title'>{text}</span>
                <span className='banner-sub'>{subTitle}</span>
              </div>
            </div>
            {renderFooter()}
          </div>
        </ResponsiveCard>
        <ResponsiveCard>{children}</ResponsiveCard>
      </Grid>
    </RepsonsiveContainerGrid>
  );
};

export default CardWithImage;
