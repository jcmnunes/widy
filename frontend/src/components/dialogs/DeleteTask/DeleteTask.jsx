import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@binarycapsule/ui-capsules';

const DeleteTask = props => {
  const deleteAction = e => {
    e.stopPropagation();
    const { taskId, sectionId } = props;
    props.storeSelectedSectionId(sectionId);
    props.storeSelectedTaskId('');
    props.deleteTask(taskId);
  };

  const actions = [
    {
      name: 'Cancel',
      appearance: 'secondary',
      action: props.handleClose,
    },
    {
      name: 'Delete',
      appearance: 'error',
      action: deleteAction,
    },
  ];

  return (
    <Dialog
      isOpen={props.show}
      onRequestClose={props.handleClose}
      contentLabel="Example dialog"
      actions={actions}
      title="Delete task?"
      message="Are you sure you want to delete this task?"
    />
  );
};

DeleteTask.propTypes = {
  show: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  storeSelectedSectionId: PropTypes.func.isRequired,
  storeSelectedTaskId: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default DeleteTask;
