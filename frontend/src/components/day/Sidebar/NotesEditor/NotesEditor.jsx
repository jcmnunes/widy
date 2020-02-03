import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Editor from '@binarycapsule/editor';
import { Value } from 'slate';
import MarkdownInstructions from './MarkdownInstructions/MarkdownInstructions';
import initialValue from './value.json';

const Wrapper = styled.div`
  margin-bottom: 32px;
`;

const StyledNotesEditor = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.neutral300};
  background: white;
  color: ${props => props.theme.neutral700};
  margin-bottom: 2px;
  min-height: 250px;
`;

const StyledEditor = styled(Editor)`
  padding: 0;
  height: 200px;
  overflow-y: auto;
  color: ${props => props.theme.neutral700};

  h1,
  h2,
  h3 {
    color: ${props => props.theme.neutral700};
  }
`;

class NotesEditor extends React.Component {
  constructor(props) {
    super(props);
    const { notes, id } = props.selectedTask;
    const existingValue = notes ? JSON.parse(notes) : null;
    this.state = {
      prevSelectedTaskId: id,
      value: Value.fromJSON(existingValue || initialValue),
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.selectedTask) return null;

    if (props.selectedTask.id !== state.prevSelectedTaskId) {
      const { notes, id } = props.selectedTask;
      const existingValue = notes ? JSON.parse(notes) : null;
      return {
        prevSelectedTaskId: id,
        value: Value.fromJSON(existingValue || initialValue),
      };
    }
    return null;
  }

  onChange = value => {
    // Check to see if the document has changed before saving.
    if (value.document !== this.state.value.document) {
      const payload = { notes: JSON.stringify(value.toJSON()) };
      this.props.updateTask(this.props.selectedTask.id, payload);
    }
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Wrapper>
        <StyledNotesEditor>
          <StyledEditor
            placeholder="Enter some notes here..."
            value={value}
            onChange={this.onChange}
          />
        </StyledNotesEditor>
        <MarkdownInstructions />
      </Wrapper>
    );
  }
}

NotesEditor.propTypes = {
  updateTask: PropTypes.func.isRequired,
  selectedTask: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.string,
  }).isRequired,
};

export default NotesEditor;
