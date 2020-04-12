import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Button } from '@binarycapsule/ui-capsules';
import { TimerButton } from './TimerButton/TimerButton';
import { Time } from './Time/Time';
import { activeTaskTickSelector } from '../activeTask/activeTaskSelectors';
import { useActiveTask } from '../api/useActiveTask';
import { SectionDto, TaskDto } from '../api/useDay';
import { StyledTimer } from './Timer.styles';
import { RegisterTimeModal } from '../modals/RegisterTimeModal/RegisterTimeModal';
import { Launcher } from '../Launcher/Launcher';

interface Props {
  task: TaskDto;
  section: SectionDto;
}

export const Timer: React.FC<Props> = ({ task, section }) => {
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
            {!task.completed && <TimerButton task={task} sectionId={section.id} size="48px" />}
            <Time
              time={
                isTaskActive && task.start
                  ? task.time + moment().diff(task.start, 'seconds')
                  : task.time
              }
            />

            {!isTaskActive && (
              <Button
                appearance="minimal"
                iconBefore="pencil"
                onClick={() => setIsRegisterModalOpen(true)}
              />
            )}
          </>
        )}
      </StyledTimer>

      {isRegisterModalOpen && (
        <RegisterTimeModal closeModal={() => setIsRegisterModalOpen(false)} />
      )}
    </>
  );
};
