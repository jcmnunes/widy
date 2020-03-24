import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import DeleteTaskDialog from '../../../dialogs/DeleteTask/DeleteTask.container';
import ScheduleTaskDialog from '../../../dialogs/ScheduleTask/ScheduleTaskDialog';
import { StyledTaskMenu } from './TaskMenu.styles';

const TaskMenuComponent = ({
  taskId,
  sectionId,
  canRegisterTime,
  canScheduleTask,
  handleTaskRename,
  handleRegisterTimeClick,
}) => {
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);
  const [showScheduleTaskDialog, setShowScheduleTaskDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteTaskDialog(true);
  };

  const deleteTaskCancelAction = () => {
    setShowDeleteTaskDialog(false);
  };

  return (
    <>
      <StyledTaskMenu>
        <Dropdown trigger={<IconButton icon="dots_h" />} placement="right">
          {canRegisterTime && (
            <DropdownItem text="Register Time" icon="time" handleAction={handleRegisterTimeClick} />
          )}
          <DropdownItem text="Rename" icon="edit" handleAction={handleTaskRename} />
          {canScheduleTask && (
            <DropdownItem
              text="Schedule"
              icon="schedule"
              handleAction={() => setShowScheduleTaskDialog(true)}
            />
          )}
          <DropdownItem text="Delete" icon="trash" handleAction={handleDeleteClick} />
        </Dropdown>
      </StyledTaskMenu>

      <DeleteTaskDialog
        show={showDeleteTaskDialog}
        taskId={taskId}
        sectionId={sectionId}
        handleClose={deleteTaskCancelAction}
      />

      <ScheduleTaskDialog
        isOpen={showScheduleTaskDialog}
        taskId={taskId}
        sectionId={sectionId}
        onRequestClose={() => setShowScheduleTaskDialog(false)}
      />
    </>
  );
};

TaskMenuComponent.propTypes = {
  taskId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  canRegisterTime: PropTypes.bool.isRequired,
  canScheduleTask: PropTypes.bool.isRequired,
  handleTaskRename: PropTypes.func.isRequired,
  handleRegisterTimeClick: PropTypes.func.isRequired,
};

export default TaskMenuComponent;
