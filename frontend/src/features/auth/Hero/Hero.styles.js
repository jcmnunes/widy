import styled from '@emotion/styled/macro';

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

  @media (max-width: ${props => props.theme.breakpointsLegacy.lg}) {
    display: none;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  color: ${props => props.theme.colors.neutral['700']};
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
  background: #eceef2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemTitle = styled.h2`
  color: ${props => props.theme.colors.neutral['500']};
  font-size: 14px;
`;

export const ItemDescription = styled.p`
  color: ${props => props.theme.colors.neutral['300']};
  font-size: 14px;
`;
