import React from 'react';
import { IconWidy, IconWidyText } from '../../../icons/widy';
import { StyledBrand } from './Brand.styles';
import { useTheme } from '@emotion/react';

interface Props {}

export const Brand: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <StyledBrand>
      <IconWidy size={30} yesterdayColor={theme.colors.blue['600']} />
      <IconWidyText size={60} textColor={theme.colors.blue['600']} />
    </StyledBrand>
  );
};
