import React from 'react';
import { getTotalTime } from '../../../../helpers/pomodoro';
import { StyledTime, Units, Values } from './Time.styles';

interface Props {
  time: number;
}

export const Time: React.FC<Props> = ({ time }) => {
  const { hours, minutes, seconds } = getTotalTime(time);

  return (
    <StyledTime>
      {hours > 0 && (
        <>
          <Values>{hours}</Values>
          <Units>h</Units>
        </>
      )}
      <>
        <Values>{minutes}</Values>
        <Units>min</Units>
      </>
      <>
        <Values>{seconds}</Values>
        <Units>s</Units>
      </>
    </StyledTime>
  );
};
