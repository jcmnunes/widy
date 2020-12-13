import React from 'react';
import { Box, Skeleton } from '@binarycapsule/ui-capsules';
import { useTheme } from '@emotion/react';

export const BoardLoading = () => {
  const theme = useTheme();
  return (
    <>
      <Box my="32">
        <Skeleton width="100px" height="24px" bg={theme.colors.neutral['200']} mb="16" />
        <Skeleton width="100%" height="30px" mb="16" />
        <Skeleton width="100%" height="30px" mb="16" />
        <Skeleton width="100%" height="30px" mb="16" />
        <Skeleton width="100%" height="30px" mb="16" />
      </Box>
      <Box my="32">
        <Skeleton width="100px" height="24px" bg={theme.colors.neutral['200']} mb="16" />
        <Skeleton width="100%" height="30px" mb="16" />
        <Skeleton width="100%" height="30px" mb="16" />
      </Box>
    </>
  );
};
