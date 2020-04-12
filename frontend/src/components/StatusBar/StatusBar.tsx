import React from 'react';
import { theme } from '@binarycapsule/ui-capsules';
import { StyledStatusBar } from './StatusBar.styles';

const colors = {
  working: theme.yellow400,
  inBreak: theme.blue200,
  idle: theme.neutral400,
};

interface Props {
  status?: 'working' | 'inBreak';
}

export const StatusBar: React.FC<Props> = ({ status }) => {
  return <StyledStatusBar color={status ? colors[status] : colors.idle} />;
};
