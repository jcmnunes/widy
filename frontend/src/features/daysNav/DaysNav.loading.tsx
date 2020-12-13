import React from 'react';
import { Skeleton } from '@binarycapsule/ui-capsules';

export const DaysNavLoading: React.FC = () => {
  return (
    <>
      <Skeleton width="100%" height="40px" mb="8" />
      <Skeleton width="100%" height="40px" mb="8" />
      <Skeleton width="100%" height="40px" mb="8" />
      <Skeleton width="100%" height="40px" mb="8" />
    </>
  );
};
