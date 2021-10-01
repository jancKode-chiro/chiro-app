import React from 'react';

import login from '../../../views/authenthication/login/login';
import './button.style.scss';

const CustomButton = (props: any) => {
  return (
    <div>
      <button className="button">{props.title}</button>
    </div>
  );
};

export default CustomButton;
