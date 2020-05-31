import React from 'react';
import { theme } from '@binarycapsule/ui-capsules';
import { useParams } from 'react-router';
import Heading1 from '../../../components/Typography/Heading1';
import { IconWidy, IconWidyText } from '../../../icons/widy';
import { Brand, Links, StyledMenuBar, StyledLink } from './MenuBar.styles';

const MenuBar = () => {
  const { pageId, dayId } = useParams();

  const getRoute = route => `/settings/${route}${dayId ? `/${dayId}` : ''}`;

  return (
    <StyledMenuBar>
      <Brand to="/">
        <IconWidy size={30} yesterdayColor={theme.blue600} />
        <IconWidyText size={60} textColor={theme.blue600} />
      </Brand>
      <Heading1>Settings</Heading1>
      <Links>
        <StyledLink to={getRoute('account')} isActive={pageId === 'account'}>
          Account
        </StyledLink>
        <StyledLink to={getRoute('changePassword')} isActive={pageId === 'changePassword'}>
          Change Password
        </StyledLink>
        <StyledLink to={getRoute('scopes')} isActive={pageId === 'scopes'}>
          Scopes
        </StyledLink>
      </Links>
    </StyledMenuBar>
  );
};

export default MenuBar;
