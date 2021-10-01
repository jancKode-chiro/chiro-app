import React, {ReactElement} from 'react';

import './custom-input.styles.scss'


type CustomInputProps = {
  id? : string;
  className?: string;
  name: string;
  label?: string;
  info? : string;
  placeholder?: string;
  type?: string | 'text';
  error?: boolean;
  disabled?: boolean;
  setRef?: (arg: string | number | boolean) => void;
  value?: string | number | boolean;
  defaultValue?: string | number | boolean;
  onChange?: (arg: string | number | boolean) => void;
  onClick?: (arg: string | number | boolean) => void;
  dataId?: string;
  maxLength?: number;
}

const CustomInput = ({id,
  className,
  label,
  info,
  placeholder,
  error,
  setRef,
  name,
  disabled,
  type = 'text',
  value,
  defaultValue,
  onChange,
  onClick,
  dataId,
  maxLength}: CustomInputProps):ReactElement => {
  

  return (
    <div>
      <input className={className ? className : 'input'} 
      placeholder={placeholder}/>
    </div>
  )
}

export default CustomInput
