import React from 'react';
import { getTotalTime } from '../../../../helpers/timeHelpers';
import { StyledTime, Units, Values } from './Time.styles';

interface Props {
  size?: 'sm' | 'md';
  time: number;
}

export const Time: React.FC<Props> = ({ time, size = 'md' }) => {
  const { hours, minutes, seconds } = getTotalTime(time);

  return (
    <StyledTime>
      {hours > 0 && (
        <>
          <Values size={size}>{hours}</Values>
          <Units size={size}>h</Units>
        </>
      )}
      <>
        <Values size={size}>{minutes}</Values>
        <Units size={size}>min</Units>
      </>
      <>
        <Values size={size}>{seconds}</Values>
        <Units size={size}>s</Units>
      </>
    </StyledTime>
  );
};
