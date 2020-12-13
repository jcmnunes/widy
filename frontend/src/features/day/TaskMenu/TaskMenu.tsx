import React, { useState } from 'react';
import { Icon, IllustratedIcon, Menu, MenuItem } from '@binarycapsule/ui-capsules';
import { StyledTaskMenu, StyledTrigger } from './TaskMenu.styles';
import { DeleteTaskDialog } from '../dialogs/DeleteTaskDialog';
import { ScheduleTaskDialog } from '../dialogs/ScheduleTaskDialog';
import { RenameTaskModal } from '../modals/RenameTaskModal/RenameTaskModal';
import { TaskDto } from '../api/useDay';
import { RegisterTimeModal } from '../modals/RegisterTimeModal/RegisterTimeModal';

const Trigger = (
  <StyledTrigger>
    <IllustratedIcon icon="dots_h" onClick={() => {}} />
  </StyledTrigger>
);

interface Props {
  dayId: string;
  sectionId: string;
  task: TaskDto;
  isPlan: boolean;
}

export const TaskMenu: React.FC<Props> = ({ dayId, sectionId, task, isPlan }) => {
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);
  const [showScheduleTaskDialog, setShowScheduleTaskDialog] = useState(false);
  const [showRenameTaskModal, setShowRenameTaskModal] = useState(false);
  const [showRegisterTimeModal, setShowRegisterTimeModal] = useState(false);

  const isSchedule = sectionId === 'schedule';
  const isActiveTask = task.start !== null;
  const canRegisterTime = !(isPlan || isSchedule || isActiveTask || task.completed);
  const canScheduleTask = !(isSchedule || isActiveTask || task.completed || task.time > 0);

  return (
    <>
      <StyledTaskMenu>
        <Menu trigger={Trigger} placement="right">
          {canRegisterTime ? (
            <MenuItem
              text="Register Time"
              leftAddon={<Icon icon="clock" size="18px" />}
              onClick={() => setShowRegisterTimeModal(true)}
            />
          ) : null}
          <MenuItem
            text="Rename"
            leftAddon={<Icon icon="pencil" size="18px" />}
            onClick={() => setShowRenameTaskModal(true)}
          />
          {canScheduleTask ? (
            <MenuItem
              text="Schedule"
              leftAddon={<Icon icon="calendar" size="18px" />}
              onClick={() => setShowScheduleTaskDialog(true)}
            />
          ) : null}
          <MenuItem
            text="Delete"
            leftAddon={<Icon icon="trash" size="18px" color="red.500" />}
            onClick={() => setShowDeleteTaskDialog(true)}
          />
        </Menu>
      </StyledTaskMenu>

      {showDeleteTaskDialog && (
        <DeleteTaskDialog
          taskId={task.id}
          sectionId={sectionId}
          dayId={dayId}
          onRequestClose={() => setShowDeleteTaskDialog(false)}
        />
      )}

      {showScheduleTaskDialog && (
        <ScheduleTaskDialog
          taskId={task.id}
          sectionId={sectionId}
          dayId={dayId}
          onRequestClose={() => setShowScheduleTaskDialog(false)}
        />
      )}

      {showRenameTaskModal && (
        <RenameTaskModal
          dayId={dayId}
          sectionId={sectionId}
          task={task}
          onRequestClose={() => setShowRenameTaskModal(false)}
        />
      )}

      {showRegisterTimeModal && (
        <RegisterTimeModal
          taskId={task.id}
          sectionId={sectionId}
          dayId={dayId}
          closeModal={() => setShowRegisterTimeModal(false)}
        />
      )}
    </>
  );
};
