import React from 'react';
import styled from 'styled-components';
import CardWithImage from '../wrapper/card-with-image';

function getWidth(span: any) {
  if (!span) return;

  let width = (span / 12) * 100;
  return `width: ${width}%`;
}
type CustomBoxProps = {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
};

export const Row = styled.div<any>`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;

export const CustomCard = styled.div<any>`
  display: flex;
  ${({ xs }) => (xs ? getWidth(xs) : 'width: 100%')};

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidth(sm)};
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidth(md)};
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidth(lg)};
  }
`;
