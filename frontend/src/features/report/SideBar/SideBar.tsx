import React from 'react';
import styled from '@emotion/styled/macro';
import { IllustratedIcon, theme } from '@binarycapsule/ui-capsules';

const StyledSideBar = styled.div`
  background: ${props => props.theme.colors.yellow['50']};
  flex: 0.5;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpointsLegacy.xl}) {
    display: flex;
  }

  @media (min-width: ${props => props.theme.breakpointsLegacy.xxl}) {
    flex: 1;
  }
`;

interface Props {}

const SideBar: React.FC<Props> = () => {
  return (
    <StyledSideBar>
      <IllustratedIcon
        icon="pie"
        size="128px"
        primaryColor={theme.colors.yellow['100']}
        secondaryColor={theme.colors.yellow['100']}
      />
    </StyledSideBar>
  );
};

export default SideBar;
