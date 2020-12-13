import React from 'react';
import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';

const menuBarWidth = '254px';

export const StyledMenuBar = styled.div`
  background: ${props => props.theme.colors.neutral['50']};
  width: ${menuBarWidth};
  padding: 60px 24px 24px;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  z-index: 999;
  left: 0;
  transform: ${({ isOpen }) => `translateX(${isOpen ? 0 : `-${menuBarWidth}`})`};
  transition: transform 0.2s ease;
  box-shadow: 0 10px 20px hsla(0, 0%, 0%, 0.15), 0 3px 6px hsla(0, 0%, 0%, 0.1);

  @media (min-width: ${props => props.theme.breakpointsLegacy.md}) {
    position: relative;
    transform: translateX(0);
    box-shadow: none;
  }
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

export const MenuBarCloseButton = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: block;

  @media (min-width: ${props => props.theme.breakpointsLegacy.md}) {
    display: none;
  }
`;
