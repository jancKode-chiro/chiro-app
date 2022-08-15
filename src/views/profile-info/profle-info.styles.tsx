import styled, { css } from 'styled-components'
import {
  space,
  SpaceProps,
  typography,
  TypographyProps,
  width,

} from 'styled-system';
import { } from '../../types/styles';

import { TypographyStyles, UIColors } from '../../types/styles'

type LabelProps = SpaceProps & TypographyProps & {
  fontColor?: string;
  fontSize?: string;
};

const labelStyle = css`
    ${space}
    ${typography}
    ${width}
    font-size: ${(props: any) => props.fontSize ? props.fontSize : ' 2rem'};
    font-family:  ${TypographyStyles.FontFamilyPoppins};
    color: ${(props: any) => props.fontColor ? props.fontColor : UIColors.black}
`
export const CustomLabel = styled.label<LabelProps>`
  ${labelStyle}
`