import React from 'react';
import { theme } from '@binarycapsule/ui-capsules';
import { StyledStatusBar } from './StatusBar.styles';

const colors = {
  working: theme.colors.yellow['400'],
  inBreak: theme.colors.blue['200'],
  idle: theme.colors.neutral['400'],
};

interface Props {
  status?: 'working' | 'inBreak';
}

export const StatusBar: React.FC<Props> = ({ status }) => {
  return <StyledStatusBar color={status ? colors[status] : colors.idle} />;
};
