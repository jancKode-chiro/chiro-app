import React, { ReactNode, FC } from 'react';

import SideBar from '../../components/sidebar-navigation/sidebar-data/sidebar-data';
import SideBarProfileData from '../../components/sidebar-navigation/sidebar-profile-data/sidebar-profile-data';

import './header.styles.scss';

type HeaderProps = {
  title: string;
  children?: ReactNode;
};

const CustomHeader: FC<HeaderProps> = ({ title }) => {

  return (
    <header className='header'>
      <SideBar />
      <h1 className='page-title'>{title} </h1>
      <SideBarProfileData />
    </header>
  );
};

export default CustomHeader;
