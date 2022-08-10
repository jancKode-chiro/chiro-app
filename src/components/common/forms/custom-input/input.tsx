import '../../../../styles/lib/include-media.scss'
import styled, { css } from 'styled-components';
import { PasswordProps } from 'antd/lib/input';
import {
  space,
  SpaceProps,
  typography,
  TypographyProps,
  width,
} from 'styled-system';

import { TextArea } from 'semantic-ui-react'

import { TypographyStyles, UIColors } from '../../../../types/styles';
type InputProps = SpaceProps &
  TypographyProps & {
    error?: boolean;
    borderColor?: string;
  };

type StyledPasswordProps = PasswordProps & SpaceProps;

const inputStyle = css`
  ${space};
  ${typography}
  ${width}
  /* width: 85%; */
  height: 52px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid
    ${(props: any) => (props.borderColor ? props.borderColor : '#2dcc5a')};
  padding-left: 1rem;
  font-size: 16px;
  color: #aca6a6;
   input[type=number]::-webkit-inner-spin-button, 
   input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
  
@media screen and (max-width: 768px) {
  width: 100%
}
 
  input {
    border: none;
    
  }

  

  &:focus {
    border: 1px solid
      ${(props: any) => (props.borderColor ? props.borderColor : '#2dcc5a')};
    outline: none;
  }
`;

export const Input = styled.input<InputProps>`
  ${inputStyle};

`;

export const InputButton = styled.input<InputProps>`
  ${width}
  display: flex;
  justify-content: center;
  min-height: 47px;
  border-radius: 8px;
  /* width: 240px; */
  border: 1px solid ${UIColors.primaryGreen};
  font-weight: ${TypographyStyles.FontWeightBold};
  font-size: 18px;
  color: ${UIColors.primaryGreen};
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  width: 191px;
  &.button:disabled {
    opacity: 0.3;
  }

  &.mini-button {
    min-height: 42px;
    width: 84px;
    border-radius: 3px;
    font-family: ${TypographyStyles.FontFamilyPoppins};
    font-size: 0.75em;
  }

  &:hover:not(:disabled):not(.disabled) {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }

  &.bg-green {
    background-color: ${UIColors.primaryGreen};
    border: none;
  }

  &.bg-blue {
    background-color: ${UIColors.primaryBlue};
    border: none;
  }

  &.text-white {
    color: ${UIColors.white};
  }

  &.text-blue {
    color: ${UIColors.primaryBlue};
  }

  &.with-next-icon {
    position: relative;
    padding: 15px 40px;
  }

  &.tiny-button {
    min-height: 28px;
    width: 84px;
    border-radius: 2px;
    font-family: ${TypographyStyles.FontFamilyPoppins};
    font-size: 12px;
  }

  &.text-green {
    color: ${UIColors.primaryGreen};
  }

  &.right {
    margin-left: auto;
  }

  &.btn-icon {
    border-radius: 100%;
    width: auto;
  }

  &.bg-gray {
    background-color: gray;
  }
`;

const PasswordInputStyle = css`
    ${width}
  ${typography}
  ${space}
   font-size: 16px;
  border: none;
  border-radius: 8px;
  color: #aca6a6;
  background-color: #FFFFFF;

  :focus {
    outline: none;
  }
@media screen and (max-width: 768px) {
  width: 100%
}
`

export const PasswordInput = styled.input<StyledPasswordProps>`
${PasswordInputStyle}
  width: 100%;
  padding: 1rem;
`;

export const CustomTextArea = styled(TextArea) <InputProps>`
  ${inputStyle}
  resize: none;
  width: 88%;
  padding-top: 1rem;
  height: 15rem;
  margin-left: 1rem;
`;

Input.defaultProps = {
  width: '85%',
};

PasswordInput.defaultProps = {
  width: '85%',
};

InputButton.defaultProps = {
  width: '15rem',
};
