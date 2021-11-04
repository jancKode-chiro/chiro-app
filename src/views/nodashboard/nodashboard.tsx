import React, { ReactNode } from 'react';
import CustomHeader from '../../components/header/header';
import { withRouter } from 'react-router';
// import { StyledLink } from '../../components/link/link';
// import { CONTACTDATA_PATH, SMS_PATH } from '../../constants/paths';

// import home from '../../assets/images/icons/home.png';
// import contacts from '../../assets/images/icons/contacts.png';
// import chart from '../../assets/images/icons/chart.png';
// import message from '../../assets/images/icons/message.png';
// import cog from '../../assets/images/icons/cog.png';
// import './nodashboard.styles.scss';

type NoDashboardProps = {
  children?: ReactNode;
};

const NoDashboard = ({ children }: NoDashboardProps) => {
  return (
    <div>
      <CustomHeader title='Logo here' />
      <div className='dashboard'>);</div>
      <div>{children}</div>
    </div>
  );
};

export default withRouter(NoDashboard);
