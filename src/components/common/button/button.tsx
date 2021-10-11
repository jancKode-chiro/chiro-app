import React, { ReactElement } from 'react';
import { Button as AntdButton } from 'antd';
import './button.style.scss';

type ButtonProps = {
  className?: string;
  children: string | ReactElement;
  onClick?: () => void;
};

const CustomButton = ({
  children,
  className,
  onClick,
}: ButtonProps): ReactElement => {
  return (
    <AntdButton className={`button ${className ?? ''}`} onClick={onClick}>
      {children}
    </AntdButton>
  );
};

export default CustomButton;
