import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { theme } from '@binarycapsule/ui-capsules';

const StyledBadge = styled.span`
  display: flex;
  align-items: center;
  border-radius: 999px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  height: 12px;
  font-size: 8px;
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
  color: theme.colors.blue['50'],
  background: theme.colors.blue['600'],
};

Badge.propTypes = {
  color: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default Badge;
