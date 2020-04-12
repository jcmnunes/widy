import styled from 'styled-components/macro';

export const StyledBoardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: sticky;
  z-index: 5000;
  top: 0;
  padding-top: 48px;
  background: white;
`;

export const BoardTitle = styled.div`
  flex: 1;
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  & > * + * {
    margin-left: 12px;
  }
`;

export const LargeText = styled.span`
  font-size: 20px;
`;
