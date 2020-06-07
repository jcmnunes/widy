import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Radio,
} from '@binarycapsule/ui-capsules';
import { Error, Radios } from './LaunchTaskModal.styles';
import { SelectOption } from '../../../../typings/types';
import { useDay, TaskDto } from '../../api/useDay';
import { useMoveTask } from '../../api/useMoveTask';

interface Props {
  sectionId: string;
  dayId: string;
  task: TaskDto;
  taskIndex: number;
  onRequestClose(): void;
}

export const LaunchTaskModal: React.FC<Props> = ({
  dayId,
  sectionId,
  task,
  taskIndex,
  onRequestClose,
}) => {
  const [checkedId, setCheckedId] = useState('');
  const [error, setError] = useState('');

  const { data: day } = useDay(dayId);
  const [moveTask, { status }] = useMoveTask();

  const sectionOptions = useMemo(() => {
    if (!day) return [];

    return day.sections.reduce((acc, section) => {
      if (section.isPlan) return acc;
      return [
        ...acc,
        {
          value: section.id,
          label: section.title,
        },
      ];
    }, [] as SelectOption<string>[]);
  }, [day]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCheckedId(value);
    setError('');
  };

  useEffect(() => {
    setCheckedId('');
    setError('');
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!checkedId) {
      setError('You need to select a section.');
    } else {
      moveTask({
        taskId: task.id,
        body: {
          dayId,
          fromIndex: taskIndex,
          fromSectionId: sectionId,
          toSectionId: checkedId,
          toIndex: null,
          start: moment.utc().toISOString(),
        },
      });
    }
  };

  return (
    <Modal isOpen onRequestClose={onRequestClose} width="500px" contentLabel="Modal - Launch task">
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <ModalTitle>Choose a section:</ModalTitle>
          <Radios>
            {sectionOptions.map(({ value, label }) => (
              <Radio
                appearance="primary"
                key={value}
                value={value}
                onChange={handleOnChange}
                checked={value === checkedId}
                inputSize="large"
              >
                {label}
              </Radio>
            ))}
          </Radios>
          {!!error && <Error>{error}</Error>}
        </ModalBody>
        <ModalFooter>
          <Button appearance="secondary" size="large" onClick={onRequestClose}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary" size="large" isLoading={status === 'loading'}>
            Launch task
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
