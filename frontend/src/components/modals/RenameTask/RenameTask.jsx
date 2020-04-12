import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalBody,
  ModalTitle,
  ModalFooter,
  Input,
  Button,
} from '@binarycapsule/ui-capsules';

const RenameTask = ({ isOpen, selectedTaskId, selectedTaskTitle, closeModal, updateTask }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(selectedTaskTitle);
  }, [selectedTaskTitle]);

  const handleOnChange = e => {
    const { value } = e.target;
    setTitle(value);
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      setError('You need to enter the new task name.');
    } else {
      updateTask(selectedTaskId, { title });
      closeModal();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modal - Rename a task">
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <ModalTitle>Rename the task</ModalTitle>
          <Input
            type="text"
            value={title}
            onChange={handleOnChange}
            inputSize="large"
            autoFocus
            error={error}
          />
        </ModalBody>
        <ModalFooter>
          <Button appearance="secondary" size="large" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary" size="large">
            Rename task
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

RenameTask.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedTaskId: PropTypes.string.isRequired,
  selectedTaskTitle: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default RenameTask;
