import React from 'react';
import { LoadingMask } from '@binarycapsule/ui-capsules';
import { BoardTitle, ActionsRow } from './BoardHeader.styles';

interface Props {}

export const BoardHeaderLoading: React.FC<Props> = () => {
  return (
    <>
      <BoardTitle>
        <LoadingMask width="170px" height="30px" />
      </BoardTitle>
      <ActionsRow>
        <LoadingMask width="30px" height="30px" circular />
        <LoadingMask width="30px" height="30px" circular />
      </ActionsRow>
    </>
  );
};
