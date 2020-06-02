import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledEmptyScopesTable = styled.div`
  border: 1px solid ${props => props.theme.neutral200};
  border-radius: 4px;
  margin-top: 24px;
  height: 76px;
  color: ${props => props.theme.neutral200};
  background: ${props => props.theme.neutral025};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const EmptyScopesTable = ({ message }) => (
  <StyledEmptyScopesTable>{message}</StyledEmptyScopesTable>
);

EmptyScopesTable.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyScopesTable;
