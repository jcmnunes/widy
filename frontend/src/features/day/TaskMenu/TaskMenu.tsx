import React, { useState } from 'react';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import { StyledTaskMenu, StyledTrigger } from './TaskMenu.styles';
import { DeleteTaskDialog } from '../dialogs/DeleteTaskDialog';
import { ScheduleTaskDialog } from '../dialogs/ScheduleTaskDialog';
import { RenameTaskModal } from '../modals/RenameTaskModal/RenameTaskModal';
import { TaskDto } from '../api/useDay';
import { RegisterTimeModal } from '../modals/RegisterTimeModal/RegisterTimeModal';

const Trigger = (
  <StyledTrigger>
    <IconButton icon="dots_h" />
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
        <Dropdown trigger={Trigger} placement="right">
          {canRegisterTime ? (
            <DropdownItem
              text="Register Time"
              icon="time"
              handleAction={() => setShowRegisterTimeModal(true)}
            />
          ) : null}
          <DropdownItem
            text="Rename"
            icon="edit"
            handleAction={() => setShowRenameTaskModal(true)}
          />
          {canScheduleTask ? (
            <DropdownItem
              text="Schedule"
              icon="schedule"
              handleAction={() => setShowScheduleTaskDialog(true)}
            />
          ) : null}
          <DropdownItem
            text="Delete"
            icon="trash"
            handleAction={() => setShowDeleteTaskDialog(true)}
          />
        </Dropdown>
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
        <RegisterTimeModal closeModal={() => setShowRegisterTimeModal(false)} />
      )}
    </>
  );
};
