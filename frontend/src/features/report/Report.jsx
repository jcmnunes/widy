import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components/macro';
import MainBar from './MainBar/MainBar';
import Navigation from './Navigation/Navigation';
import SideBar from './SideBar/SideBar';
import ReportPage from './ReportPage/ReportPage';

const StyledReport = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Report = () => {
  const { dayId } = useParams();

  return (
    <StyledReport>
      <MainBar />
      <Navigation />
      <ReportPage dayId={dayId} />
      <SideBar />
    </StyledReport>
  );
};

export default Report;
