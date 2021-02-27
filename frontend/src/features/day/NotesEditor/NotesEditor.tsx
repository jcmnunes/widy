import React, { useCallback, useEffect, useState } from 'react';
import { Editor, EditorRef } from '@binarycapsule/editor';
import { Wrapper, WrapperProps } from '@binarycapsule/ui-capsules';
import debounce from 'lodash/debounce';
import { useParams } from 'react-router-dom';
import { EditorWrapper } from './NotesEditor.styles';
import MarkdownInstructions from './MarkdownInstructions/MarkdownInstructions';
import { useUpdateTask } from '../api/useUpdateTask';
import { DayRouteParams } from '../dayTypes';

interface NotesEditorProps extends WrapperProps {
  notes: string;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ notes, ...rest }) => {
  const { dayId, sectionId, taskId } = useParams<DayRouteParams>();

  const editorRef = React.useRef<EditorRef>(null);

  const [updateTask] = useUpdateTask();

  const [editorKey, setEditorKey] = useState(Date.now());

  const updateEditor = useCallback(() => {
    setEditorKey(Date.now());
  }, []);

  // Update value when changing the selected task
  useEffect(() => {
    updateEditor();
  }, [taskId, updateEditor]);

  const saveToDb = useCallback(() => {
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
  }, [dayId, sectionId, taskId, updateEditor, updateTask]);

  const handleChange = debounce(() => {
    saveToDb();
  }, 250);

  if (!sectionId || !taskId) {
    return null;
  }

  return (
    <Wrapper {...rest}>
      <EditorWrapper>
        <Editor key={editorKey} ref={editorRef} defaultValue={notes} onChange={handleChange} />
      </EditorWrapper>

      <MarkdownInstructions />
    </Wrapper>
  );
};
