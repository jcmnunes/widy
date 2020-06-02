import React from 'react';
import styled from 'styled-components/macro';
import { IllustrationNoDays } from '../../illustrations/IllustrationNoDays';

const StyledNoDays = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const StyledIllustration = styled(IllustrationNoDays)`
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 18px;
`;

const SubTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 12px;
`;

const NoDays = () => {
  return (
    <StyledNoDays data-test="NoDays">
      <StyledIllustration />
      <Title>
        <span role="img" aria-label="tada">
          🎉
        </span>{' '}
        Welcome to WIDY{' '}
        <span role="img" aria-label="tada">
          🎉
        </span>
      </Title>
      <SubTitle>WIDY will help you to track your daily work</SubTitle>
      <SubTitle>
        <span role="img" aria-label="point-left">
          👈
        </span>{' '}
        Click the &quot;+ Add Day&quot; button to get started
      </SubTitle>
    </StyledNoDays>
  );
};

export default NoDays;
