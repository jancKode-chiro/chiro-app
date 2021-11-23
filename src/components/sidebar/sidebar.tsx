import React from 'react';

import * as GoIcons from 'react-icons/go';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as TiIcons from 'react-icons/ti';
import { CONTACTS_PATH, SEND_SMS_PATH } from '../../constants/paths';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/Dashboard',
    icon: <GoIcons.GoDashboard />,
    cName: 'nav-text',
  },

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
