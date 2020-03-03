import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import times from 'lodash/times';
import { Icon24 } from '@binarycapsule/ui-capsules';
import { pomodoroSettingsSelector } from '../../../../selectors/settings/settingsSelectors';
import { getNumberOfPomodoros, getTotalTime } from '../../../../helpers/pomodoro';
import { Empty, Multiplier, Pomodoros, StyledStats, Td, Units, Value } from './Stats.styles';

const Stats = ({ time }) => {
  const pomodoro = useSelector(pomodoroSettingsSelector);

  const renderTime = () => {
    const timeMinutesHours = getTotalTime(time);
    return (
      <>
        {timeMinutesHours.hours > 0 && (
          <>
            <Value>{timeMinutesHours.hours}</Value>
            <Units>h</Units>
          </>
        )}
        <Value>{timeMinutesHours.minutes}</Value>
        <Units>min</Units>
      </>
    );
  };

  const renderPomodoros = () => {
    const numPomodoros = getNumberOfPomodoros(time, pomodoro);
    if (numPomodoros === 0) return <Empty>---</Empty>;
    if (numPomodoros > 5) {
      return (
        <Pomodoros>
          <Multiplier>{numPomodoros} x</Multiplier>
          <Icon24 icon="TIME" />
        </Pomodoros>
      );
    }
    return (
      <Pomodoros>
        {times(numPomodoros).map(key => (
          <Icon24 key={key} icon="TIME" />
        ))}
      </Pomodoros>
    );
  };

  return (
    <StyledStats>
      <tbody>
        <tr>
          <Td>Total time worked on task:</Td>
          <Td>{renderTime()}</Td>
        </tr>
        <tr>
          <Td>Total number of pomodoros:</Td>
          <Td>{renderPomodoros()}</Td>
        </tr>
      </tbody>
    </StyledStats>
  );
};

Stats.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Stats;
