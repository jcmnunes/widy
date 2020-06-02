import React from 'react';
import { StyledScopeCode } from './ScopeCode.styles';

interface Props {
  scopeCode?: string;
}

export const ScopeCode: React.FC<Props> = ({ scopeCode }) => {
  if (!scopeCode) {
    return null;
  }

  return <StyledScopeCode>{scopeCode}</StyledScopeCode>;
};
