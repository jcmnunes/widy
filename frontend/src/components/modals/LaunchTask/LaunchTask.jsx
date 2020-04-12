import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Radio,
} from '@binarycapsule/ui-capsules';
import { Error, Radios } from './LaunchTask.styles';

const LaunchTask = ({
  isOpen,
  sectionsRadios,
  planSectionId,
  removeTask,
  appendTask,
  selectedTaskIndex,
  selectedTaskId,
  taskTitle,
  closeModal,
  launchTask,
}) => {
  const [checkedId, setCheckedId] = useState('');
  const [error, setError] = useState('');

  const handleOnChange = e => {
    const { value } = e.target;
    setCheckedId(value);
    setError('');
  };

  useEffect(() => {
    setCheckedId('');
    setError('');
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!checkedId) {
      setError('You need to select a section.');
    } else {
      removeTask(planSectionId, selectedTaskIndex);
      appendTask(checkedId, selectedTaskId);
      closeModal();

      launchTask({
        taskId: selectedTaskId,
        taskTitle,
        taskTime: 0,
        fromSectionId: planSectionId,
        toSectionId: checkedId,
        fromIndex: selectedTaskIndex,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      width="500px"
      contentLabel="Modal - Add a new task"
    >
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <ModalTitle>Choose a section:</ModalTitle>
          <Radios>
            {sectionsRadios.map(({ id, label }) => (
              <Radio
                appearance="primary"
                key={id}
                value={id}
                onChange={handleOnChange}
                checked={id === checkedId}
                inputSize="large"
              >
                {label}
              </Radio>
            ))}
          </Radios>
          {!!error && <Error>{error}</Error>}
        </ModalBody>
        <ModalFooter>
          <Button appearance="secondary" size="large" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary" size="large">
            Launch task
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

LaunchTask.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  sectionsRadios: PropTypes.arrayOf(PropTypes.object).isRequired,
  planSectionId: PropTypes.string.isRequired,
  removeTask: PropTypes.func.isRequired,
  appendTask: PropTypes.func.isRequired,
  selectedTaskIndex: PropTypes.number.isRequired,
  selectedTaskId: PropTypes.string.isRequired,
  taskTitle: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  launchTask: PropTypes.func.isRequired,
};

export default LaunchTask;
