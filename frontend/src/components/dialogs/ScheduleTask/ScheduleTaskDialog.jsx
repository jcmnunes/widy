import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@binarycapsule/ui-capsules';
import { scheduleTask } from '../../../actions/tasks/scheduleTask.actions';
import { selectedDayIdSelector } from '../../../selectors/days/daysSelectors';
import { selectedTaskIndexSelector } from '../../../selectors/sections/sectionsSelectors';

const ScheduleTaskDialog = ({ isOpen, taskId, sectionId, onRequestClose }) => {
  const dayId = useSelector(selectedDayIdSelector);
  const taskIndex = useSelector(selectedTaskIndexSelector);

  const dispatch = useDispatch();

  const scheduleTaskCallback = useCallback(
    e => {
      e.stopPropagation();
      dispatch(scheduleTask({ dayId, sectionId, taskId, taskIndex }));
    },
    [dayId, dispatch, sectionId, taskId, taskIndex],
  );

  return (
    <Dialog
      isOpen={isOpen}
      contentLabel="schedule-task-dialog"
      actions={[
        {
          name: 'Cancel',
          appearance: 'secondary',
          action: onRequestClose,
        },
        {
          name: 'Schedule',
          appearance: 'primary',
          action: scheduleTaskCallback,
        },
      ]}
      onRequestClose={onRequestClose}
    >
      Are you sure you want to schedule this task for later?
    </Dialog>
  );
};

ScheduleTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  taskId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ScheduleTaskDialog;
