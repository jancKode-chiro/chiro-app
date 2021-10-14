import styled, { css } from 'styled-components';
import bgFull from '../../../../assets/images/bg-full.png';
import {
  layout,
  space,
  typography,
  SpaceProps,
  TypographyProps,
  LayoutProps,
} from 'styled-system';

type ContainerProps = SpaceProps & TypographyProps & LayoutProps;

const containerStyle = css`
  ${layout}
  ${space}
  ${typography}
`;

export const Container = styled.div<ContainerProps>`
  ${containerStyle}
`;

export const ContainerWithImage = styled.div<ContainerProps>`
  ${containerStyle};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${bgFull});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
`;
