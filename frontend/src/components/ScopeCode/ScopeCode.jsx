import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledScopeCode = styled.span`
  display: inline-block;
  text-transform: uppercase;
  color: ${props => props.theme.neutral300};
  font-size: 16px;
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
