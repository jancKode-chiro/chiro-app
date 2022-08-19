import React from 'react';

import * as GoIcons from 'react-icons/go';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as TiIcons from 'react-icons/ti';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import { CONTACTS_PATH, SEND_SMS_PATH, PROFILEINFO_PATH, TEMPLATES_PATH } from '../constants/paths'

export const SidebarData = [


  {
    title: 'Campaigns',
    path: '/sms',
    icon: <AiIcons.AiOutlineDatabase />,
    cName: 'nav-text',
  },

  {
    title: 'Contacts',
    path: CONTACTS_PATH,
    icon: <RiIcons.RiContactsLine />,
    cName: 'nav-text',
  },

  {
    title: 'Message',
    path: SEND_SMS_PATH,
    icon: <TiIcons.TiMessages />,
    cName: 'nav-text',
  },
];

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
    title: 'Tempaltes',
    path: TEMPLATES_PATH,
    icon: <AiIcons.AiOutlineIdcard />,
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
    cName: 'nav-out-profile',
    callback: true,
  }
];
