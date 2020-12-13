import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

const StyledScopeCode = styled.span`
  display: inline-block;
  text-transform: uppercase;
  color: ${props => props.theme.colors.neutral['300']};
  font-size: 14px;
`;

const ScopeCode = ({ scopeCode, ...other }) =>
  !!scopeCode && <StyledScopeCode {...other}>{scopeCode}</StyledScopeCode>;

ScopeCode.defaultProps = {
  scopeCode: null,
};

ScopeCode.propTypes = {
  scopeCode: PropTypes.string,
};

export default ScopeCode;
