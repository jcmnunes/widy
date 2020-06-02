import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const StyledMenuBar = styled.div`
  background: ${props => props.theme.neutral050};
  width: 254px;
  height: 100%;
  padding: 36px 24px 24px;
`;

export const Brand = styled(Link)`
  margin-bottom: 24px;
  display: flex;
  align-items: flex-end;

  svg:last-child {
    margin-left: 8px;
  }
`;

export const Links = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 6px;
  }
`;

export const StyledLink = styled(({ ...other }) => <Link {...other} />)`
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  line-height: 28px;
`;
