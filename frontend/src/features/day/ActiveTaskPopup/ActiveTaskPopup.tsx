import React from 'react';
import moment from 'moment';
import { IllustratedIcon, Text, Tooltip } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ActiveTaskPopupHeader, StyledActiveTaskPopup } from './ActiveTaskPopup.styles';
import { useActiveTaskQuery } from '../api/useActiveTaskQuery';
import { Task } from '../Task/Task';
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation';
import { Time } from '../Timer/Time/Time';
import { activeTaskTickSelector } from '../activeTask/activeTaskSelectors';
import { DayRouteParams } from '../dayTypes';
import { useTheme } from '@emotion/react';

interface Props {}

export const ActiveTaskPopup: React.FC<Props> = () => {
  const theme = useTheme();

  const { data: activeTask, status } = useActiveTaskQuery();

  const { dayId } = useParams<DayRouteParams>();

  const history = useHistory();

  const { mutate: updateTask } = useUpdateTaskMutation();

  useSelector(activeTaskTickSelector);

  const shouldRender = !!(
    status === 'success' &&
    activeTask &&
    activeTask.dayId !== dayId &&
    activeTask.taskId
  );

  return shouldRender && activeTask ? (
    <StyledActiveTaskPopup>
      <ActiveTaskPopupHeader>
        <Text variant="label" mb="8">
          Working on:
        </Text>
        <Time time={activeTask.time + moment().diff(activeTask.start!, 'seconds')} size="sm" />
      </ActiveTaskPopupHeader>
      <Task
        isActive
        dayId={activeTask.dayId}
        sectionId={activeTask.sectionId}
        task={{ id: activeTask.taskId, title: activeTask.title }}
        onClick={() =>
          history.push(`/day/${activeTask.dayId}/${activeTask.sectionId}/${activeTask.taskId}`)
        }
        onCompletedChange={() => {
          updateTask({
            taskId: activeTask.taskId,
            body: {
              dayId: activeTask.dayId,
              sectionId: activeTask.sectionId,
              payload: {
                completed: true,
                start: null,
                time: activeTask.time + moment.utc().diff(activeTask.start, 'seconds'),
              },
            },
          });

          history.push(`/day/${activeTask.dayId}/${activeTask.sectionId}/${activeTask.taskId}`);
        }}
      >
        <Tooltip placement="top" content="Stop the task">
          <IllustratedIcon
            icon="stop"
            onClick={e => {
              e.stopPropagation();

              updateTask({
                taskId: activeTask.taskId,
                body: {
                  dayId: activeTask.dayId,
                  sectionId: activeTask.sectionId,
                  payload: {
                    start: null,
                    time: activeTask.time + moment.utc().diff(activeTask.start, 'seconds'),
                  },
                },
              });
            }}
            primaryColor={theme.colors.yellow['400']}
            primaryColorHover={theme.colors.yellow['500']}
            secondaryColor={theme.colors.yellow['900']}
            secondaryColorHover={theme.colors.yellow['900']}
          />
        </Tooltip>
      </Task>
    </StyledActiveTaskPopup>
  ) : null;
};
