import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalFooter, ModalTitle, Select } from '@binarycapsule/ui-capsules';
import { SUGGESTIONS } from './RegisterTime.constants';
import { H3, Inputs, Label, StyledInput, StyledModal } from './RegisterTime.styles';

const RegisterTime = ({ isOpen, selectedTaskId, updateTask, closeModal }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [suggestion, setSuggestion] = useState(null);

  const handleHoursChange = e => {
    const { value } = e.target;
    setHours(value);
  };

  const handleMinutesChange = e => {
    const { value } = e.target;
    setMinutes(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const time = hours * 3600 + minutes * 60;
    updateTask(selectedTaskId, { time });
    closeModal();
  };

  const handleSuggestionChange = opt => {
    const { h, min } = opt.value;
    setHours(h);
    setMinutes(min);
    setSuggestion(opt);
  };

  useEffect(() => {
    setHours(0);
    setMinutes(0);
    setSuggestion(null);
  }, [isOpen]);

  return (
    <StyledModal
      isOpen={isOpen}
      width="400px"
      onRequestClose={closeModal}
      contentLabel="Modal - Register task time"
      style={{ overflow: 'visible' }}
    >
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <ModalTitle>Insert new task time:</ModalTitle>
          <Inputs>
            <Label>
              <StyledInput
                type="number"
                value={hours}
                min={0}
                max={24}
                step={1}
                onChange={handleHoursChange}
              />
              <span>h</span>
            </Label>
            <Label>
              <StyledInput
                type="number"
                value={minutes}
                min={0}
                max={59}
                step={1}
                onChange={handleMinutesChange}
              />
              <span>min</span>
            </Label>
          </Inputs>
          <H3>Suggestions</H3>
          <Select onChange={handleSuggestionChange} options={SUGGESTIONS} value={suggestion} />
        </ModalBody>
        <ModalFooter>
          <Button appearance="secondary" size="large" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary" size="large">
            Register time
          </Button>
        </ModalFooter>
      </form>
    </StyledModal>
  );
};

RegisterTime.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedTaskId: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default RegisterTime;
