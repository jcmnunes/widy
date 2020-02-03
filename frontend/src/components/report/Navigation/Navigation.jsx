import React from 'react';
import { theme } from '@binarycapsule/ui-capsules';
import { IconWidy, IconWidyText } from '../../../icons/widy';
import { Heading1 } from '../../common/Typography';
import { Brand, StyledNavigation } from './Navigation.styles';
import Days from './Days/Days';

const Navigation = () => {
  return (
    <StyledNavigation>
      <Brand>
        <IconWidy size={30} yesterdayColor={theme.blue600} />
        <IconWidyText size={60} textColor={theme.blue600} />
      </Brand>
      <Heading1 style={{ marginBottom: 16 }}>Days</Heading1>
      <Days />
    </StyledNavigation>
  );
};

export default Navigation;
