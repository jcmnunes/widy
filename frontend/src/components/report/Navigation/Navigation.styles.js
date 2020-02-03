import styled from 'styled-components/macro';

export const StyledNavigation = styled.div`
  background: ${props => props.theme.neutral050};
  width: 254px;
  height: 100%;
  padding: 36px 24px 24px;
  display: flex;
  flex-direction: column;
`;

export const Brand = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: flex-end;

  svg:last-child {
    margin-left: 8px;
  }
`;
