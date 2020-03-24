import styled from 'styled-components/macro';

export const Container = styled.div`
  flex: 1;
  height: 100%;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  display: grid;
  grid-gap: 16px;
  padding: 64px;
  align-content: center;
  justify-items: start;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.neutral700};
  margin-bottom: 32px;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 18px;
  margin-bottom: 16px;
  align-items: center;
`;

export const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.neutral075};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemTitle = styled.h2`
  color: ${props => props.theme.neutral500};
  font-size: 18px;
`;

export const ItemDescription = styled.p`
  color: ${props => props.theme.neutral300};
  font-size: 18px;
`;
