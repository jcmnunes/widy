import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import DeleteTaskDialog from '../../../dialogs/DeleteTask/DeleteTask.container';
import { StyledTaskMenu } from './TaskMenu.styles';

const TaskMenuComponent = ({
  taskId,
  sectionId,
  canRegisterTime,
  handleTaskRename,
  handleRegisterTimeClick,
}) => {
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);

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
          <DropdownItem text="Delete" icon="TRASH" handleAction={handleDeleteClick} />
        </Dropdown>
      </StyledTaskMenu>
      <DeleteTaskDialog
        show={showDeleteTaskDialog}
        taskId={taskId}
        sectionId={sectionId}
        handleClose={deleteTaskCancelAction}
      />
    </>
  );
};

TaskMenuComponent.propTypes = {
  taskId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  canRegisterTime: PropTypes.bool.isRequired,
  handleTaskRename: PropTypes.func.isRequired,
  handleRegisterTimeClick: PropTypes.func.isRequired,
};

export default TaskMenuComponent;
