import React, { ReactNode, FC } from 'react';

import user from '../../assets/images/icons/user.png';

import './header.styles.scss';

type HeaderProps = {
  title: string;
  children?: ReactNode;
};

const CustomHeader: FC<HeaderProps> = ({ title }) => {
  return (
    <header className='header'>
      <h1 className='page-title'>{title}</h1>
      <img src={user} alt='user-icon' />
    </header>
  );
};

export default CustomHeader;
