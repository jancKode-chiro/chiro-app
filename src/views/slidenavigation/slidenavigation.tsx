import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { SidebarData } from '../../components/sidebar/sidebar';
import { IconContext } from 'react-icons';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import './slidenavigation.styles.scss';

function SlideNavigation() {
  const [sidebar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sidebar);
  return (
    <>
      <div className='slidenav-a'>
        <IconContext.Provider value={{ color: '#f8f8f8ef' }}>
          <div>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars
                onClick={showSideBar}
                color={'#000000f1'}
                fontSize={'2.125em'}
              />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSideBar}>
              <div className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose fontSize={'2.341em'} />
                </Link>
              </div>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
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

export default SlideNavigation;
