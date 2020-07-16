import styled from 'styled-components/macro';
import { StyledBrand } from './Brand/Brand.styles';

const daysNavWidth = '254px';

export const StyledDaysNav = styled.div<{ isOpen?: boolean }>`
  background: ${props => props.theme.neutral050};
  padding: 48px 24px 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: ${daysNavWidth};
  flex-shrink: 0;
  position: absolute;
  left: 0;
  z-index: 20000;
  transform: ${({ isOpen }) => `translateX(${isOpen ? 0 : `-${daysNavWidth}`})`};
  transition: transform 0.2s cubic-bezier(0, 0.52, 0, 1);
  box-shadow: 0 10px 20px hsla(0, 0%, 0%, 0.15), 0 3px 6px hsla(0, 0%, 0%, 0.1);

  @media (min-width: 800px) {
    transform: translateX(0);
    position: relative;
    box-shadow: none;
  }

  ${StyledBrand} {
    margin-bottom: 24px;
  }
`;

export const DaysNavCloseButton = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: block;

  @media (min-width: 800px) {
    display: none;
  }
`;

export const LoadMoreDays = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;
