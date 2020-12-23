import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { IconButton } from '@binarycapsule/ui-capsules';
import { useParams } from 'react-router';
import { TimerButton } from './TimerButton/TimerButton';
import { Time } from './Time/Time';
import { activeTaskTickSelector } from '../activeTask/activeTaskSelectors';
import { useActiveTask } from '../api/useActiveTask';
import { SectionDto, TaskDto } from '../api/useDay';
import { StyledTimer } from './Timer.styles';
import { RegisterTimeModal } from '../modals/RegisterTimeModal/RegisterTimeModal';
import { Launcher } from '../Launcher/Launcher';
import { DayRouteParams } from '../dayTypes';

interface Props {
  task: TaskDto;
  section: SectionDto;
}

export const Timer: React.FC<Props> = ({ task, section }) => {
  const { dayId } = useParams<DayRouteParams>();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { data: activeTaskData } = useActiveTask();

  useSelector(activeTaskTickSelector);

  const isTaskActive = activeTaskData?.taskId === task.id;

  const taskIndex = section.tasks.findIndex(({ id }) => id === task.id);

  return (
    <>
      <StyledTimer>
        {section.isPlan ? (
          <Launcher task={task} sectionId={section.id} taskIndex={taskIndex} isButton />
        ) : (
          <>
            {!task.completed && <TimerButton task={task} sectionId={section.id} size={48} />}

            <Time
              time={
                isTaskActive && task.start
                  ? task.time + moment().diff(task.start, 'seconds')
                  : task.time
              }
            />

            {!isTaskActive && (
              <IconButton
                variant="ghost"
                variantColor="neutral"
                icon="pencil"
                onClick={() => setIsRegisterModalOpen(true)}
              />
            )}
          </>
        )}
      </StyledTimer>

      {isRegisterModalOpen && (
        <RegisterTimeModal
          taskId={task.id}
          sectionId={section.id}
          dayId={dayId}
          closeModal={() => setIsRegisterModalOpen(false)}
        />
      )}
    </>
  );
};
