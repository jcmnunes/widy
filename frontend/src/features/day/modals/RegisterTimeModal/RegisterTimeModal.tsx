import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, ModalBody, ModalTitle, Select } from '@binarycapsule/ui-capsules';
import { suggestionsOptions, SuggestionOption } from './RegisterTimeModal.constants';
import {
  H3,
  Inputs,
  Label,
  StyledInput,
  StyledModal,
  StyledModalFooter,
} from './RegisterTimeModal.styles';
import { useUpdateTask } from '../../api/useUpdateTask';

interface Props {
  closeModal(): void;
}

export const RegisterTimeModal: React.FC<Props> = ({ closeModal }) => {
  const { taskId, sectionId, dayId } = useParams();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [suggestion, setSuggestion] = useState<SuggestionOption | null>(null);

  const [updateTask] = useUpdateTask();

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHours(parseInt(value, 10));
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMinutes(parseInt(value, 10));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!taskId || !sectionId || !dayId) return;

    const time = hours * 3600 + minutes * 60;

    updateTask({
      taskId,
      body: {
        sectionId,
        dayId,
        payload: {
          time,
        },
      },
    });

    closeModal();
  };

  const handleSuggestionChange = (opt: SuggestionOption) => {
    const { h, min } = opt.value;
    setHours(h);
    setMinutes(min);
    setSuggestion(opt);
  };

  useEffect(() => {
    setHours(0);
    setMinutes(0);
    setSuggestion(null);
  }, []);

  return (
    <StyledModal
      isOpen
      width="400px"
      onRequestClose={closeModal}
      contentLabel="Modal - Register task time"
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
          <Select
            onChange={opt => handleSuggestionChange(opt as SuggestionOption)}
            options={suggestionsOptions}
            value={suggestion}
          />
        </ModalBody>
        <StyledModalFooter>
          <Button appearance="secondary" size="large" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary" size="large">
            Register time
          </Button>
        </StyledModalFooter>
      </form>
    </StyledModal>
  );
};
