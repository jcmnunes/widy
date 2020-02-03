import React from 'react';
import styled from 'styled-components/macro';
import { Icon24, theme } from '@binarycapsule/ui-capsules';

const StyledSideBar = styled.div`
  background: ${props => props.theme.yellow050};
  flex: 0.5;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.bp_xlarge}) {
    display: flex;
  }

  @media (min-width: ${props => props.theme.bp_xxlarge}) {
    flex: 1;
  }
`;

const SideBar = () => {
  return (
    <StyledSideBar>
      <Icon24
        icon="PIE"
        size="128px"
        primaryColor={theme.yellow100}
        secondaryColor={theme.yellow100}
      />
    </StyledSideBar>
  );
};

export default SideBar;
