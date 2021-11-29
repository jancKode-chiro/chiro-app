import React, { useState } from 'react';

import { SidebarDataProfile } from '../../../constants/sidebar-options';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify'

import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

import './sidebar-profile-navigation.styles.scss'


function SideBarProfile() {
  const [sidebar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sidebar);


  const onClickHanlder = (callback: boolean) => {
    if (callback) {
      localStorage.clear()
      Auth.signOut();
    }


  }
  return (
    <>
      <div className='sidebarprofile'>
        <IconContext.Provider value={{ color: '#000000eb' }}>
          <div className='sidebarprofile-icon'>
            <Link to='#'>
              <FaIcons.FaUserAlt
                onClick={showSideBar}
                color={'#fffffff1'}
                fontSize={'2.125em'}

              />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu-profile active' : 'nav-menu-profile'}>
            <ul className='nav-menu-profile-items' onClick={showSideBar}>
              <div className='top-button-profile'>
                <Link to='#' >
                  <AiIcons.AiOutlineClose fontSize={'2.341em'} />
                </Link>
              </div>
              {SidebarDataProfile.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path} onClick={() => onClickHanlder(item.callback)}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    </>
  );
}

export default SideBarProfile;