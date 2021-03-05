import React, { useCallback, useEffect, useState } from 'react';
import { Editor, EditorRef } from '@binarycapsule/editor';
import { Wrapper, WrapperProps } from '@binarycapsule/ui-capsules';
import { useParams } from 'react-router-dom';
import { EditorWrapper } from './NotesEditor.styles';
import MarkdownInstructions from './MarkdownInstructions/MarkdownInstructions';
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation';
import { DayRouteParams } from '../dayTypes';
import useDebounce from 'react-use/lib/useDebounce';

interface NotesEditorProps extends WrapperProps {
  notes: string;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ notes, ...rest }) => {
  const { dayId, sectionId, taskId } = useParams<DayRouteParams>();

  const editorRef = React.useRef<EditorRef>(null);

  const { mutate: updateTask } = useUpdateTaskMutation();

  const [editorKey, setEditorKey] = useState(Date.now());

  const [value, setValue] = useState(notes);

  const updateEditor = useCallback(() => {
    setEditorKey(Date.now());
  }, []);

  // Update value when changing the selected task
  useEffect(() => {
    updateEditor();
  }, [taskId, updateEditor]);

  useDebounce(
    () => {
      if (!sectionId || !taskId) {
        return;
      }

      const notes = editorRef.current?.value;

      updateTask(
        {
          taskId,
          body: {
            dayId,
            sectionId,
            payload: {
              notes: notes || '',
            },
          },
        },
        {
          onError() {
            updateEditor();
          },
        },
      );
    },
    500,
    [value],
  );

  if (!sectionId || !taskId) {
    return null;
  }

  return (
    <Wrapper {...rest}>
      <EditorWrapper>
        <Editor
          key={editorKey}
          ref={editorRef}
          defaultValue={notes}
          onChange={val => setValue(val)}
        />
      </EditorWrapper>

      <MarkdownInstructions />
    </Wrapper>
  );
};
