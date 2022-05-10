import React, { useState, useEffect } from 'react';

import { useHistory, withRouter } from 'react-router';
import { VscArrowLeft } from 'react-icons/vsc'

import './profile-info.styles.scss';

import profile from '../../assets/images/icons/profile.png';
import Dashboard from '../dashboard/dashboard';
import { CustomLabel } from './profle-info.styles';
import { CustomDiv } from '../../components/common/wrapper/custom-wrapper/custom-wrapper';
import { InputButton } from '../../components/common/forms/custom-input/input';



const ProfileData = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState<string[] | any>()
  const onClickHander = (): void => {
    history.goBack()
  }

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(localStorage.getItem('user'))
    }
  }, [currentUser])

  const renderProfileDetails = (title: string, info: string) => {
    return (
      <CustomDiv display='flex'
        flexDirection='column'
        justifyContent='center' width='50%'
        paddingTop='2rem'>
        <CustomLabel>{title}:</CustomLabel>
        <CustomLabel fontColor='#b0a6a6' fontSize='1.8em'>{info}</CustomLabel>
      </CustomDiv>
    )
  }
  return (
    <Dashboard isNavbar={false}>

      <div className='profiledata'>
        <VscArrowLeft className='arrow-icon' onClick={onClickHander} />
        <title className='profile-a'>Profile</title>
        <div className='image'>
          <img src={profile} alt='graph-img' width='157px' height='157px' />
        </div>
        <div>
        </div>
        <CustomDiv display='flex' flexDirection='column' paddingLeft='25vw'>
          <div className='info-wrapper'>
            {renderProfileDetails('Username', currentUser!.user_name)}
            {renderProfileDetails('Email', currentUser!.email)}
          </div>
          <div className='info-wrapper'>
            {renderProfileDetails('First name', currentUser.first_name)}
            {renderProfileDetails('Last name', currentUser.last_name)}
          </div>

          <div className='info-wrapper'>
            {renderProfileDetails('Address', currentUser.address)}
            {renderProfileDetails('Phone number', currentUser.phone_number)}
          </div>
          <div className='button'>
            <InputButton value='UPDATE PROFILE' className='bg-green text-white' />
          </div>
        </CustomDiv>

      </div>
    </Dashboard >
  );
};

export default withRouter(ProfileData);
