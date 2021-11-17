import React from 'react';


import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import { PROFILEINFO_PATH } from '../../constants/paths';

export const SidebarDataProfile = [
  {
    title: 'Personal Info',
    path: PROFILEINFO_PATH,
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-profile',
    callback: false

  },

  {
    title: 'Card Info',
    path: '/card',
    icon: <AiIcons.AiOutlineIdcard />,
    cName: 'nav-profile',
    callback: false
  },

  {
    title: 'Change Password',
    path: '/forgot-password',
    icon: <RiIcons.RiLockPasswordLine />,
    cName: 'nav-profile',
    callback: false
  },

  {
    title: 'Wallet',
    path: '/wallet',
    icon: <BsIcons.BsWallet />,
    cName: 'nav-profile',
    callback: false
  },

  {
    title: 'Log out',
    path: '/login',
    icon: <BiIcons.BiExit />,
    cName: 'nav-out',
    callback: true,
  }
];
