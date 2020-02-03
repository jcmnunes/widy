import styled from 'styled-components/macro';

export const StyledBoard = styled.div`
  position: relative;
  background: white;
  padding: 0 48px 48px;
  height: 100vh;
  overflow-y: auto;
`;

export const Title = styled.h1`
  font-size: 14px;
  color: ${props => props.theme.neutral700};
}
`;

export const LargeText = styled.span`
  font-size: 20px;
`;

export const Header = styled.div`
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
