import React from 'react';

import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';

export const SidebarDataProfile = [
  {
    title: 'Personal Info',
    path: '/profiledata',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-profile',
  },

  {
    title: 'Card Info',
    path: '/card',
    icon: <AiIcons.AiOutlineIdcard />,
    cName: 'nav-profile',
  },

  {
    title: 'Change Password',
    path: '/forgot-password',
    icon: <RiIcons.RiLockPasswordLine />,
    cName: 'nav-profile',
  },

  {
    title: 'Wallet',
    path: '/wallet',
    icon: <BsIcons.BsWallet />,
    cName: 'nav-profile',
  },

  {
    title: 'Log out',
    path: '/login',
    icon: <BiIcons.BiExit />,
    cName: 'nav-out',
  },
];
