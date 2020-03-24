import React from 'react';
import styled from 'styled-components/macro';
import { IllustratedIcon, theme } from '@binarycapsule/ui-capsules';

const StyledSideBar = styled.div`
  background: ${props => props.theme.yellow050};
  flex: 0.5;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    display: flex;
  }

  @media (min-width: ${props => props.theme.breakpoints.xxl}) {
    flex: 1;
  }
`;

const SideBar = () => {
  return (
    <StyledSideBar>
      <IllustratedIcon
        icon="pie"
        size="128px"
        primaryColor={theme.yellow100}
        secondaryColor={theme.yellow100}
      />
    </StyledSideBar>
  );
};

export default SideBar;
