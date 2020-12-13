import React from 'react';
import styled from '@emotion/styled/macro';
import { IllustratedIcon, theme } from '@binarycapsule/ui-capsules';

const StyledSideBar = styled.div`
  background: ${props => props.theme.colors.neutral['50']};
  flex: 1;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpointsLegacy.xl}) {
    display: flex;
  }
`;

const SideBar = () => {
  return (
    <StyledSideBar>
      <IllustratedIcon
        icon="settings"
        size="128px"
        primaryColor={theme.colors.neutral['100']}
        secondaryColor={theme.colors.neutral['100']}
      />
    </StyledSideBar>
  );
};

export default SideBar;
