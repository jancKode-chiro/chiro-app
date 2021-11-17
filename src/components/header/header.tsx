import React, { ReactNode, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import SlideNavigationProfile from '../../views/slidenavigationprofile/slidenavigationprofile';

import user from '../../assets/images/icons/user.png';

import './header.styles.scss';

type HeaderProps = {
  title: string;
  children?: ReactNode;
};

const CustomHeader: FC<HeaderProps> = ({ title }) => {
  let history = useHistory();
  const submitHandler = () => {
    Auth.signOut().then(() => {
      alert('Loggin out');
      history.push('/login');
    });
  };

  return (
    <header className='header'>
      <h1 className='page-title'>{title}</h1>
      <SlideNavigationProfile />
    </header>
  );
};

export default CustomHeader;
