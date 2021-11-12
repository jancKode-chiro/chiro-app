import React from 'react';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/Dashboard',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text',
  },

  {
    title: 'Campaigns',
    path: '/wallet',
    icon: <AiIcons.AiOutlineDatabase />,
    cName: 'nav-text',
  },

  {
    title: 'Contacts',
    path: '/contactdata',
    icon: <AiIcons.AiFillContacts />,
    cName: 'nav-text',
  },

  // {
  //   title: 'Team',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: 'nav-text',
  // },

  // {
  //   title: 'Home',
  //   path: '/',
  //   icon: <AiIcons.AiFillHome />,
  //   cName: 'nav-text',
  // },

  {
    title: 'Message',
    path: '/sms',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
  },

  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text',
  // },
];
