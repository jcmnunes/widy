import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PomodoroForm from './Pomodoro.form';
import { resetState } from './Pomodoro.actions';
import { pomodoroSettingsSelector } from '../../../../selectors/settings/settingsSelectors';
import { PageDescription, PageTitle } from '../Page.styles';

const Pomodoro = () => {
  const dispatch = useDispatch();
  const pomodoroSettings = useSelector(pomodoroSettingsSelector);

  useEffect(() => () => dispatch(resetState()), [dispatch]);

  return (
    <div>
      <PageTitle>Pomodoro</PageTitle>
      <PageDescription>Change your pomodoro settings</PageDescription>
      <div>
        <PomodoroForm pomodoroSettings={pomodoroSettings} />
      </div>
    </div>
  );
};

export default Pomodoro;
