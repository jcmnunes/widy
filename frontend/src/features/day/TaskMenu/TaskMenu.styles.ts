import styled from 'styled-components/macro';

export const StyledTaskMenu = styled.div`
  height: 24px;
  cursor: pointer;

  svg {
    color: #9dacbe;
  }
`;

export const StyledTrigger = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.neutral100};
  }
`;
