import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import DeleteTaskDialog from '../../../dialogs/DeleteTask/DeleteTask.container';
import { StyledTaskMenu } from './TaskMenu.styles';
import ScheduleTaskDialog from '../../../dialogs/ScheduleTask/ScheduleTaskDialog';

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
        <Dropdown trigger={<IconButton icon="DOTS_H" />} placement="right">
          {canRegisterTime ? (
            <DropdownItem text="Register Time" icon="TIME" handleAction={handleRegisterTimeClick} />
          ) : null}
          <DropdownItem text="Rename" icon="EDIT" handleAction={handleTaskRename} />
          {canScheduleTask && (
            <DropdownItem
              text={'Schedule for "tomorrow"'}
              icon="SCHEDULE"
              handleAction={() => setShowScheduleTaskDialog(true)}
            />
          )}
          <DropdownItem text="Delete" icon="TRASH" handleAction={handleDeleteClick} />
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
