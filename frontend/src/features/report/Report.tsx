import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components/macro';
import MainBar from './MainBar/MainBar';
import SideBar from './SideBar/SideBar';
import { DaysNav } from '../daysNav/DaysNav';
import { ReportPage } from './ReportPage/ReportPage';

const StyledReport = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

interface Props {}

const Report: React.FC<Props> = () => {
  const { dayId } = useParams();

  return (
    <StyledReport>
      <MainBar />
      <DaysNav />
      <ReportPage dayId={dayId} />
      <SideBar />
    </StyledReport>
  );
};

export default Report;
