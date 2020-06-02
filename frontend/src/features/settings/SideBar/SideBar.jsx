import React from 'react';
import styled from 'styled-components/macro';
import { IllustratedIcon, theme } from '@binarycapsule/ui-capsules';

const StyledSideBar = styled.div`
  background: ${props => props.theme.neutral050};
  flex: 1;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    display: flex;
  }
`;

const SideBar = () => {
  return (
    <StyledSideBar>
      <IllustratedIcon
        icon="settings"
        size="128px"
        primaryColor={theme.neutral100}
        secondaryColor={theme.neutral100}
      />
    </StyledSideBar>
  );
};

export default SideBar;
