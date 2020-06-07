import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, theme } from '@binarycapsule/ui-capsules';
import { useParams } from 'react-router';
import Heading1 from '../../../components/Typography/Heading1';
import { IconWidy, IconWidyText } from '../../../icons/widy';
import { Brand, Links, MenuBarCloseButton, StyledLink, StyledMenuBar } from './MenuBar.styles';
import { isSettingsMenuOpenSelector } from '../Settings.selectors';
import { settingsSliceActions } from '../Settings.slice';

const MenuBar = () => {
  const { pageId, dayId } = useParams();
  const dispatch = useDispatch();

  const isOpen = useSelector(isSettingsMenuOpenSelector);

  const closeMenu = useCallback(() => {
    dispatch(settingsSliceActions.closeSettingsSidebar());
  }, [dispatch]);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, pageId]);

  const getRoute = route => `/settings/${route}${dayId ? `/${dayId}` : ''}`;

  return (
    <StyledMenuBar isOpen={isOpen}>
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

      <MenuBarCloseButton>
        <Button onClick={closeMenu} appearance="minimal" iconBefore="x" />
      </MenuBarCloseButton>
    </StyledMenuBar>
  );
};

export default MenuBar;
