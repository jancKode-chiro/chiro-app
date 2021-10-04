import React, {ReactElement} from 'react';
import {Button as AntdButton} from 'antd'
import './button.style.scss';

type ButtonProps = {
  className?: string;
  children: string | ReactElement
}

const CustomButton = ({children, className}:ButtonProps):ReactElement => {
  return (
      <AntdButton className={`button ${className ?? ''}`}>
       {children}
        </AntdButton>
  );
};

export default CustomButton;
