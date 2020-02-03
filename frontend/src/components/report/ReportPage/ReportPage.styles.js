import styled from 'styled-components/macro';

export const StyledReportPage = styled.div`
  flex: 1;
  padding: 48px 32px;
  overflow-y: auto;
`;

export const ReportTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export const ReportDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.neutral300};
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 48px 0;
`;

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 48px 0;
  height: 250px;
  justify-content: space-between;
  width: 100%;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & + & {
    margin-left: 64px;
  }
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const StatLabel = styled.div`
  font-size: 16px;
  color: ${props => props.theme.neutral300};
`;

export const ActionsTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: 12px;
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmptyStateText = styled.div`
  font-size: 16px;
  color: ${props => props.theme.neutral400};
`;
