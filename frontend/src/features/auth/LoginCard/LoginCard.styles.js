import styled from '@emotion/styled/macro';

export const LogoWrapper = styled.div`
  display: none;
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.neutral['50']};

  @media (max-width: ${props => props.theme.breakpointsLegacy.lg}) {
    flex-direction: column;

    ${LogoWrapper} {
      display: block;
    }
  }
`;

export const StyledCard = styled.div`
  width: 1000px;
  height: 640px;
  background: ${props => props.theme.colors.neutral['50']};
  border: 2px solid ${props => props.theme.colors.neutral['300']};
  border-radius: 12px;
  display: flex;
  position: relative;

  @media (max-width: ${props => props.theme.breakpointsLegacy.lg}) {
    max-width: 480px;
    height: auto;
    margin-top: 48px;
  }
`;

export const Form = styled.div`
  flex: 1;
  height: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background: white;
  border-left: 2px solid ${props => props.theme.colors.neutral['300']};
  padding: 64px;

  @media (max-width: ${props => props.theme.breakpointsLegacy.lg}) {
    border-left: none;
    border-radius: 12px;
  }
`;
