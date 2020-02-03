import React from 'react';
import styled from 'styled-components/macro';
import { Icon24, theme } from '@binarycapsule/ui-capsules';

const StyledSideBar = styled.div`
  background: ${props => props.theme.neutral050};
  flex: 1;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.bp_xlarge}) {
    display: flex;
  }
`;

const SideBar = () => {
  return (
    <StyledSideBar>
      <Icon24
        icon="SETTINGS"
        size="128px"
        primaryColor={theme.neutral100}
        secondaryColor={theme.neutral100}
      />
    </StyledSideBar>
  );
};

export default SideBar;
