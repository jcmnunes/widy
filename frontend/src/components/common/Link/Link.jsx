import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as RRLink } from 'react-router-dom';

export const StyledLink = styled(RRLink)`
  text-decoration: none;
  color: #186faf;

  &:hover {
    box-shadow: inset 0 -2px 0 0;
  }
`;

const Link = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Link;
