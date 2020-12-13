import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

const StyledEmptyScopesTable = styled.div`
  border: 1px solid ${props => props.theme.colors.neutral['200']};
  border-radius: 4px;
  margin-top: 24px;
  height: 76px;
  color: ${props => props.theme.colors.neutral['200']};
  background: ${props => props.theme.colors.neutral['50']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const EmptyScopesTable = ({ message }) => (
  <StyledEmptyScopesTable>{message}</StyledEmptyScopesTable>
);

EmptyScopesTable.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyScopesTable;
