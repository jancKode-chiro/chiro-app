import { Input as AntInput, InputNumber } from 'antd';
import styled, { css } from 'styled-components';
import { PasswordProps } from 'antd/lib/input';
import {
  space,
  SpaceProps,
  typography,
  TypographyProps,
  width,
} from 'styled-system';

type InputProps = SpaceProps &
  TypographyProps & {
    error?: boolean;
  };

type StyledPasswordProps = PasswordProps & SpaceProps;

const inputStyle = css`
  ${space};
  ${typography}
  ${width}
  height: 52px;
  width: ${width};
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #2dcc5a;
  padding-left: 16px;

  font-size: 16px;
  color: #aca6a6;

  input {
    border: none;
  }

  &:focus {
    border: 1px solid #2dcc5a;
    outline: none;
  }
`;

export const Input = styled(AntInput)<InputProps>`
  ${inputStyle};
`;

export const InputButton = styled(AntInput)<InputProps>`
  ${inputStyle}
  min-height: 53px;
  border-radius: 8px;
  width: 240px;
  border: 1px solid #52ae32;
  font-family: $font-family-poppins;
  font-weight: $font-weight-bold;
  font-size: 18px;
  color: #52ae32;
  background-color: transparent;
  cursor: pointer;

  &.button:disabled {
    opacity: 0.3;
  }

  &.mini-button {
    min-height: 42px;
    width: 84px;
    border-radius: 3px;
    font-family: $font-family-poppins;
    font-size: 12px;
  }

  &:hover:not(:disabled):not(.disabled) {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }

  &.bg-green {
    background-color: #52ae32;
    border: none;
  }

  &.bg-blue {
    background-color: $primary-blue;
    border: none;
  }

  &.text-white {
    color: white;
  }

  &.text-blue {
    color: $primary-blue;
  }

  &.with-next-icon {
    position: relative;
    padding: 15px 40px;
  }

  &.tiny-button {
    min-height: 28px;
    width: 84px;
    border-radius: 2px;
    font-family: $font-family-poppins;
    font-size: 12px;
  }

  &.text-green {
    color: $primary-green;
  }

  &.right {
    margin-left: auto;
  }

  &.btn-icon {
    border-radius: 100%;
    width: auto;
  }
`;

export const PasswordInput = styled(AntInput)<StyledPasswordProps>`
  ${inputStyle}
`;
