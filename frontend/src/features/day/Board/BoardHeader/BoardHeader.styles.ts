import styled from 'styled-components/macro';

export const StyledBoardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
  z-index: 998;
  top: 0;
  padding-top: 32px;
  background: white;

  @media (min-width: 800px) {
    padding-top: 48px;
    align-items: center;
    position: sticky;
  }
`;

export const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;

  > * + * {
    margin-left: 8px;
    margin-top: 3px;
  }

  @media (min-width: 800px) {
    display: none;
  }
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

export const BoardHeaderMobileActions = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 800px) {
    display: none;
  }
`;
