import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { theme } from '@binarycapsule/ui-capsules';

const StyledBadge = styled.span`
  display: flex;
  align-items: center;
  border-radius: 999px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  height: 12px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0 4px;
`;

const Badge = ({ color, background, children }) => (
  <StyledBadge color={color} background={background}>
    {children}
  </StyledBadge>
);

Badge.defaultProps = {
  color: theme.blue050,
  background: theme.blue600,
};

Badge.propTypes = {
  color: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default Badge;
