import styled from '@emotion/styled/macro';

export const StyledReportPage = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px 16px;

  @media (min-width: ${props => props.theme.breakpointsLegacy.mobile}) {
    padding: 48px 32px;
  }
`;

export const ReportTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export const ReportDescription = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.neutral['500']};
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 48px 0;
  position: relative;
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
  font-size: 14px;
  color: ${props => props.theme.colors.neutral['300']};
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
  font-size: 14px;
  color: ${props => props.theme.colors.neutral['300']};
`;

export const LoadingReport = styled.div`
  flex-direction: column;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinnerText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.neutral['400']};
  margin-bottom: 12px;
`;

export const ReportLoader = styled.div`
  position: absolute;
  top: -37px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ReportLoaderText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral['300']};
  margin-left: 6px;
`;

export const ReportTitleContainer = styled.div`
  margin-top: 8px;
`;
