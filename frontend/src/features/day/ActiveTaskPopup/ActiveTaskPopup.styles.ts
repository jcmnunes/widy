import styled from '@emotion/styled/macro';

export const StyledActiveTaskPopup = styled.div`
  position: fixed;
  width: 450px;
  padding: 18px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.12), 0 1px 2px hsla(0, 0%, 0%, 0.24);
  right: 32px;
  bottom: 32px;
  border-radius: 4px;
  z-index: 20000;
  background: white;
`;

export const ActiveTaskPopupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
