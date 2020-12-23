import styled from '@emotion/styled/macro';

export const StyledSidebar = styled.div<{ isOpen?: boolean }>`
  flex: 0.75;
  padding: 32px;
  width: 320px;
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.yellow['50']};
  position: fixed;
  z-index: 999;
  right: 0;
  transform: ${({ isOpen }) => `translateX(${isOpen ? 0 : '448px'})`};
  transition: transform 0.2s cubic-bezier(0, 0.52, 0, 1);
  box-shadow: 0 10px 20px hsla(0, 0%, 0%, 0.15), 0 3px 6px hsla(0, 0%, 0%, 0.1);
  border-left: 1px solid ${({ theme }) => theme.colors.yellow['100']};

  @media (min-width: ${props => props.theme.breakpointsLegacy.mobile}) {
    width: 448px;
  }

  @media (min-width: ${props => props.theme.breakpointsLegacy.xl}) {
    position: relative;
    transform: translateX(0);
    box-shadow: none;
  }

  @media (min-width: ${props => props.theme.breakpointsLegacy.xxl}) {
    flex: 1;
    padding: 40px 48px;
  }
`;

export const SidebarCloseButton = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
  display: block;

  @media (min-width: ${props => props.theme.breakpointsLegacy.xl}) {
    display: none;
  }
`;

export const SidebarSection = styled.div`
  margin: 12px 0 16px;

  &:first-child {
    margin-top: 0;
  }
`;

export const SideBarEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

export const SideBarEmptyStateText = styled.h2`
  font-size: 14px;
  color: ${props => props.theme.colors.neutral['300']};
  margin-top: 24px;
`;
