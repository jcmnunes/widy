import React from 'react';
import moment from 'moment';
import { IconButton, Tooltip } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ActiveTaskPopupHeader, StyledActiveTaskPopup } from './ActiveTaskPopup.styles';
import { Heading2 } from '../../../components/Typography';
import { useActiveTask } from '../api/useActiveTask';
import { Task } from '../Task/Task';
import { colors as playButtonColors } from '../Timer/TimerButton/TimerButton';
import { useToggleActiveTask } from '../api/useToggleActiveTask';
import { useUpdateTask } from '../api/useUpdateTask';
import { Time } from '../Timer/Time/Time';
import { activeTaskTickSelector } from '../activeTask/activeTaskSelectors';

interface Props {}

export const ActiveTaskPopup: React.FC<Props> = () => {
  const { data, status } = useActiveTask();
  const { dayId } = useParams();
  const history = useHistory();

  const [updateTask] = useUpdateTask();
  const toggleActiveTask = useToggleActiveTask();

  useSelector(activeTaskTickSelector);

  const stopTask = () => {
    if (!data) return;

    toggleActiveTask({
      dayId: data.dayId,
      sectionId: data.sectionId,
      task: {
        id: data.taskId,
        title: data.title,
        time: data.time,
      },
    });
  };

  const shouldRender = !!(status === 'success' && data && data.dayId !== dayId && data.taskId);

  return shouldRender && data ? (
    <StyledActiveTaskPopup>
      <ActiveTaskPopupHeader>
        <Heading2>Working on:</Heading2>
        <Time time={data.time + moment().diff(data.start!, 'seconds')} size="sm" />
      </ActiveTaskPopupHeader>
      <Task
        isActive
        dayId={data.dayId}
        sectionId={data.sectionId}
        task={{ id: data.taskId, title: data.title }}
        onClick={() => history.push(`/day/${data.dayId}/${data.sectionId}/${data.taskId}`)}
        onCompletedChange={() => {
          stopTask();
          updateTask({
            taskId: data.taskId,
            body: {
              dayId: data.dayId,
              sectionId: data.sectionId,
              payload: {
                completed: true,
              },
            },
          });

          history.push(`/day/${data.dayId}/${data.sectionId}/${data.taskId}`);
        }}
      >
        <Tooltip placement="top" tooltip="Stop the task">
          <IconButton
            icon="stop"
            colors={playButtonColors.active}
            onClick={e => {
              e.stopPropagation();
              stopTask();
            }}
          />
        </Tooltip>
      </Task>
    </StyledActiveTaskPopup>
  ) : null;
};
