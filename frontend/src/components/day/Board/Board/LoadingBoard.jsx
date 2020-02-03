import React from 'react';
import styled from 'styled-components/macro';
import { LoadingMask, theme } from '@binarycapsule/ui-capsules';

const StyledLoadingBoard = styled.div`
  background: white;
  padding: 48px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    margin-left: 16px;
  }
`;

const Section = styled.div`
  margin: 32px 0;

  & > * {
    margin-bottom: 18px;
  }
`;

const LoadingBoard = () => {
  return (
    <StyledLoadingBoard>
      <Header>
        <div>
          <LoadingMask width="170px" height="30px" />
        </div>
        <FlexRow>
          <LoadingMask width="30px" height="30px" circular />
          <LoadingMask width="30px" height="30px" circular />
        </FlexRow>
      </Header>
      <Section>
        <LoadingMask width="100px" height="30px" background={theme.neutral200} />
        <LoadingMask width="100%" height="30px" />
        <LoadingMask width="100%" height="30px" />
        <LoadingMask width="100%" height="30px" />
        <LoadingMask width="100%" height="30px" />
      </Section>
      <Section>
        <LoadingMask width="100px" height="30px" background={theme.neutral200} />
        <LoadingMask width="100%" height="30px" />
        <LoadingMask width="100%" height="30px" />
      </Section>
    </StyledLoadingBoard>
  );
};

export default LoadingBoard;
