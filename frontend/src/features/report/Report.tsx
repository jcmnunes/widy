import React from 'react';
import { useParams } from 'react-router';
import styled from '@emotion/styled/macro';
import SideBar from './SideBar/SideBar';
import { DaysNav } from '../daysNav/DaysNav';
import { ReportPage } from './ReportPage/ReportPage';
import { DayRouteParams } from '../day/dayTypes';

const StyledReport = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

interface Props {}

const Report: React.FC<Props> = () => {
  const { dayId } = useParams<DayRouteParams>();

  return (
    <StyledReport>
      <DaysNav />
      <ReportPage dayId={dayId} />
      <SideBar />
    </StyledReport>
  );
};

export default Report;
