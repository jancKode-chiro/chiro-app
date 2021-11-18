import React, { ReactNode, FC } from 'react';

import SlideNavigationProfile from '../../views/slidenavigationprofile/slidenavigationprofile';
import SlideNavigation from '../../views/slidenavigation/slidenavigation';
import './header.styles.scss';

type HeaderProps = {
  title: string;
  children?: ReactNode;
};

const CustomHeader: FC<HeaderProps> = ({ title }) => {

  return (
    <header className='header'>
      <SlideNavigation />
      <h1 className='page-title'>{title}</h1>
      <SlideNavigationProfile />
    </header>
  );
};

export default CustomHeader;
