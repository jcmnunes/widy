import styled from 'styled-components/macro';

export const StyledPopup = styled.div`
  position: fixed;
  width: 450px;
  padding: 18px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.12), 0 1px 2px hsla(0, 0%, 0%, 0.24);
  right: 32px;
  bottom: 32px;
  border-radius: 4px;
  z-index: 7000;
  background: white;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Time = styled.div`
  font-size: 16px;
`;

export const Units = styled.span`
  font-size: 12px;
`;
