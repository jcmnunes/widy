import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Code = styled.span`
  text-transform: uppercase;
  color: ${props => props.theme.neutral300};
`;

const Name = styled.div`
  flex: 1;
`;

const CustomLabel = ({ label, shortCode }) => {
  return (
    <StyledLabel>
      <Name>{label}&nbsp;</Name>
      <Code>{shortCode}</Code>
    </StyledLabel>
  );
};

CustomLabel.propTypes = {
  label: PropTypes.string.isRequired,
  shortCode: PropTypes.string.isRequired,
};

export default CustomLabel;
