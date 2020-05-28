import React from 'react';
import styled from 'styled-components/macro';
import { Button, Icon } from '@binarycapsule/ui-capsules';
import { IllustrationOldPC } from '../../../icons/Illustrations';
import { Brand } from '../../daysNav/Brand/Brand';

const StyledBoardError = styled.div`
  width: 100%;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-bottom: 24px;
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.red700};
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin-right: 12px;
  }
`;

const Header = styled.div`
  height: 64px;
`;

interface Props {}

export const BoardError: React.FC<Props> = () => {
  return (
    <StyledBoardError>
      <Header>
        <Brand />
      </Header>
      <IllustrationOldPC />
      <ErrorText>
        <Icon icon="exclamation_c" /> Oops, something went wrong...
      </ErrorText>
      <Button appearance="minimal" iconBefore="refresh" onClick={() => document.location.reload()}>
        Refresh the page
      </Button>
    </StyledBoardError>
  );
};
