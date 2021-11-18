import React, { useState } from 'react';

import { SidebarDataProfile } from '../../components/sidebarprofile/sidebarprofile';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify'

import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

import './slidenavigationprofile.styles.scss';


function SlideNavigationProfile() {
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
      <div className='slideprofile'>
        <IconContext.Provider value={{ color: '#000000eb' }}>
          <div>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaUserAlt
                onClick={showSideBar}
                color={'#fffffff1'}
                fontSize={'2.125em'}
              />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSideBar}>
              <div className='top-button'>
                <Link to='#' className='menu-bars'>
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

export default SlideNavigationProfile;
