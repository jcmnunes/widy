import React from 'react';
import { theme } from '@binarycapsule/ui-capsules';
import { IconWidy, IconWidyText } from '../../../icons/widy';
import { StyledBrand } from './Brand.styles';

interface Props {}

export const Brand: React.FC<Props> = () => {
  return (
    <StyledBrand>
      <IconWidy size={30} yesterdayColor={theme.blue600} />
      <IconWidyText size={60} textColor={theme.blue600} />
    </StyledBrand>
  );
};
