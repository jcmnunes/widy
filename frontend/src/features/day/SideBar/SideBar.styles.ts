import styled from 'styled-components/macro';

export const StyledSidebar = styled.div`
  flex: 1;
  min-width: 640px;
  padding: 48px;
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.yellow050};
`;

export const SidebarSection = styled.div`
  margin: 12px 0;
`;

export const SideBarEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

export const SideBarEmptyStateText = styled.h2`
  font-size: 16px;
  color: ${props => props.theme.neutral300};
  margin-top: 24px;
`;
