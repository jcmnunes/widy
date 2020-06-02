import React from 'react';
import styled from 'styled-components/macro';
import { LoadingMask, theme } from '@binarycapsule/ui-capsules';

const Section = styled.div`
  margin: 32px 0;

  & > * {
    margin-bottom: 18px;
  }
`;

export const BoardLoading = () => {
  return (
    <>
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
    </>
  );
};
