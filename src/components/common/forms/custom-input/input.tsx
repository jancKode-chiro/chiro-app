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
  width: ${width}
  border-radius: 8px;
  background-color: #FFFFFF;
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

export const PasswordInput = styled(AntInput)<StyledPasswordProps>`
  ${inputStyle}
`;
