import React from 'react';
import styled from 'styled-components/macro';
import MenuBar from './MenuBar/MenuBar';
import Page from './Page/Page';
import SideBar from './SideBar/SideBar';

const StyledSettings = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Settings = () => {
  return (
    <StyledSettings>
      <MenuBar />
      <Page />
      <SideBar />
    </StyledSettings>
  );
};

export default Settings;
