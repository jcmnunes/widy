import React from 'react';
import { Skeleton } from '@binarycapsule/ui-capsules';
import { ActionsRow, BoardTitle } from './BoardHeader.styles';

interface Props {}

export const BoardHeaderLoading: React.FC<Props> = () => {
  return (
    <>
      <BoardTitle>
        <Skeleton width="170px" height="30px" />
      </BoardTitle>
      <ActionsRow>
        <Skeleton width="30px" height="30px" circular mr="8" />
        <Skeleton width="30px" height="30px" circular />
      </ActionsRow>
    </>
  );
};
