import React from 'react';

import { useHistory, withRouter } from 'react-router';
import { VscArrowLeft } from 'react-icons/vsc'

import './profile-info.styles.scss';

import VerticalSpacer from '../../components/common/spacer/vertical-spacer';
import profile from '../../assets/images/icons/profile.png';
import Dashboard from '../dashboard/dashboard';
import { CustomLabel } from './profle-info.styles';
import { CustomDiv } from '../../components/common/wrapper/custom-wrapper/custom-wrapper';
import CustomButton from '../../components/common/button/button';
import { InputButton } from '../../components/common/forms/custom-input/input';



const ProfileData = () => {
  const history = useHistory();

  const onClickHander = (): void => {
    history.goBack()
  }


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
            {renderProfileDetails('Username', 'iamSam')}
            {renderProfileDetails('Email', 'myawesome@email.com')}
          </div>
          <div className='info-wrapper'>
            {renderProfileDetails('First name', 'Sam')}
            {renderProfileDetails('Last name', 'Smith')}
          </div>

          <div className='info-wrapper'>
            {renderProfileDetails('Address', '123 Charles Avenue')}
            {renderProfileDetails('Phone number', '+1229031239')}
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
