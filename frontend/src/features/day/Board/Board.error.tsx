import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import { Button, Icon } from '@binarycapsule/ui-capsules';
import { AxiosError } from 'axios';
import { Brand } from '../../daysNav/Brand/Brand';
import { IllustrationOldPC } from '../../../illustrations/IllustrationOldPC';

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

interface Props {
  error?: AxiosError;
}

// TODO ➜ Improve error handling
export const BoardError: React.FC<Props> = ({ error }) => {
  const history = useHistory();

  const status = error?.response?.status;

  return (
    <StyledBoardError>
      <Header>
        <Brand />
      </Header>
      <IllustrationOldPC />
      <ErrorText>
        <Icon icon="exclamation_c" />{' '}
        {status === 404 ? 'Day not found' : 'Oops, something went wrong...'}
      </ErrorText>

      <Button appearance="minimal" iconBefore="refresh" onClick={() => history.push('/day')}>
        Refresh the page
      </Button>
    </StyledBoardError>
  );
};
