import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Value } from 'slate';
import useInterval from 'react-use/lib/useInterval';
import MarkdownInstructions from './MarkdownInstructions/MarkdownInstructions';
import initialValue from './value.json';
import { StyledEditor, StyledNotesEditor, Wrapper } from './NotesEditor.styles';
import { useUpdateTask } from '../api/useUpdateTask';

export const NotesEditor = ({ dayId, sectionId, task }) => {
  const [value, setValue] = useState(Value.fromJSON(initialValue));
  const [isSaved, setIsSaved] = useState(false);

  const [updateTask] = useUpdateTask();

  const saveToDb = () => {
    updateTask(
      {
        taskId: task.id,
        body: {
          dayId,
          sectionId,
          payload: {
            notes: JSON.stringify(value.toJSON()),
          },
        },
      },
      {
        onSuccess() {
          setIsSaved(true);
        },
      },
    );
  };

  const onChange = newValue => {
    // Check to see if the document has changed
    if (newValue.document !== value.document) {
      setIsSaved(false);
    }
    setValue(newValue);
  };

  useInterval(() => {
    if (!isSaved) saveToDb();
  }, 1000);

  // Update value when changing the selected task
  useEffect(() => {
    const existingValue = task.notes ? JSON.parse(task.notes) : null;
    setValue(Value.fromJSON(existingValue || initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.id]);

  return (
    <Wrapper>
      <StyledNotesEditor>
        <StyledEditor
          placeholder="Enter some notes here..."
          value={value}
          onChange={onChange}
          onBlur={saveToDb}
        />
      </StyledNotesEditor>
      <MarkdownInstructions />
    </Wrapper>
  );
};

NotesEditor.propTypes = {
  dayId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.string,
  }).isRequired,
};
