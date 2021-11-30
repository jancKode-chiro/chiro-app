import React, { useState } from 'react';

import { SidebarDataProfile } from '../../../constants/sidebar-options';
import { IconContext } from 'react-icons';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify'


import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

import './sidebar-profile-navigation.styles.scss'
import CustomModal from '../../modal/modal';
import { LOGIN_PATH } from '../../../constants/paths';
import { CustomDiv } from '../../common/wrapper/custom-wrapper/custom-wrapper';


function SideBarProfile() {
  const [sidebar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sidebar);
  const history = useHistory();


  const onClickHanlder = (callback: boolean) => {
    if (callback) {
      console.log('inside callback', callback)
      localStorage.clear()
      Auth.signOut();
      history.push(LOGIN_PATH)
    }

  }

  const renderListOptions = () => {

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
                    {item.callback ? <CustomModal
                      buttonTriggerText='Logout'
                      headerText='You are about to Logout from your account'
                      contentText='Are you sure?'
                      onCloseButtonText='No'
                      onOpenButtonText='Logout'
                      customComponent={<CustomDiv
                        display='flex'
                        fontSize='1.3em'
                        justifyContent='center'
                        alignItems='center'
                        marginLeft='1rem'
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </CustomDiv>}
                      onOpenCallback={() => onClickHanlder(item.callback)}
                    /> : <Link to={item.path} >

                      {item.icon}
                      <span>{item.title}</span>

                    </Link>
                    }

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