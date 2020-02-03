import React from 'react';
import { StyledIconWidy, StyledIconWidyText, StyledLogo } from './Logo.styles';

const LogoComponent = () => (
  <StyledLogo>
    <StyledIconWidy size={60} />
    <StyledIconWidyText size={80} />
  </StyledLogo>
);

export default LogoComponent;
