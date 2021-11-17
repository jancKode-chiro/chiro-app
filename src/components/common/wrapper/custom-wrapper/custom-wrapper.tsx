import styled, { css } from 'styled-components'
import {
  space,
  SpaceProps,
  typography,
  TypographyProps,
  width,
  size,
  flexbox,
  FlexDirectionProps, FlexboxProps
  , layout,
  LayoutProps
} from 'styled-system';

type DivProps = LayoutProps & SpaceProps & TypographyProps & FlexDirectionProps & FlexboxProps & {
  isMobile?: boolean;
};


const divStyles = css`
${space}
${typography}
${width}
${size}
${flexbox}
${layout}
`

export const CustomDiv = styled.div<DivProps>`
  ${divStyles}
`