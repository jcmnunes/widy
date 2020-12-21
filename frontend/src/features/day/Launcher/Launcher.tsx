import React, { useState } from 'react';
import { Button, IllustratedIcon, Tooltip } from '@binarycapsule/ui-capsules';
import { useParams } from 'react-router';
import { LaunchTaskModal } from '../modals/LaunchTaskModal/LaunchTaskModal';
import { TaskDto } from '../api/useDay';
import { DayRouteParams } from '../dayTypes';
import { useTheme } from '@emotion/react';

interface Props {
  sectionId: string;
  task: TaskDto;
  size?: number;
  taskIndex: number;
  isButton?: boolean;
}

export const Launcher: React.FC<Props> = ({ size, sectionId, task, taskIndex, isButton }) => {
  const theme = useTheme();

  const { dayId } = useParams<DayRouteParams>();

  const [showLaunchTaskModal, setShowLaunchTaskModal] = useState(false);

  if (!dayId) return null;

  return (
    <>
      <Tooltip content="Start working on this task" delay={1000} placement="bottom">
        {isButton ? (
          <Button
            leftIcon="rocket"
            variant="ghost"
            variantColor="neutral"
            onClick={() => setShowLaunchTaskModal(true)}
          >
            Launch task
          </Button>
        ) : (
          <IllustratedIcon
            icon="launch"
            onClick={() => setShowLaunchTaskModal(true)}
            size={size}
            primaryColor={theme.colors.neutral['200']}
            primaryColorHover={theme.colors.blue['100']}
            secondaryColor={theme.colors.neutral['400']}
            secondaryColorHover={theme.colors.blue['500']}
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
