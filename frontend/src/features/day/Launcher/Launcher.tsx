import React, { useState } from 'react';
import { Button, IconButton, theme, Tooltip } from '@binarycapsule/ui-capsules';
import { useParams } from 'react-router';
import { LaunchTaskModal } from '../modals/LaunchTaskModal/LaunchTaskModal';
import { TaskDto } from '../api/useDay';

const colors = [theme.neutral200, theme.neutral400, theme.blue100, theme.blue500];

interface Props {
  sectionId: string;
  task: TaskDto;
  size?: string;
  taskIndex: number;
  isButton?: boolean;
}

export const Launcher: React.FC<Props> = ({ size, sectionId, task, taskIndex, isButton }) => {
  const { dayId } = useParams();
  const [showLaunchTaskModal, setShowLaunchTaskModal] = useState(false);

  if (!dayId) return null;

  return (
    <>
      <Tooltip tooltip="Start working on this task" delayShow={1000}>
        {isButton ? (
          <Button
            appearance="minimal"
            iconBefore="rocket"
            onClick={() => setShowLaunchTaskModal(true)}
          >
            Launch task
          </Button>
        ) : (
          <IconButton
            colors={colors}
            icon="launch"
            onClick={() => setShowLaunchTaskModal(true)}
            size={size}
          />
        )}
      </Tooltip>

      {showLaunchTaskModal && (
        <LaunchTaskModal
          dayId={dayId}
          taskIndex={taskIndex}
          task={task}
          sectionId={sectionId}
          onRequestClose={() => setShowLaunchTaskModal(false)}
        />
      )}
    </>
  );
};
