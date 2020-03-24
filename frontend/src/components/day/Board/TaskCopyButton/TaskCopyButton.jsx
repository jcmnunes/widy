import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toaster, IconButton } from '@binarycapsule/ui-capsules';

const TaskCopyButton = ({ taskTitle, shouldStopPropagation, ...other }) => {
  return (
    <CopyToClipboard
      text={taskTitle}
      onCopy={() =>
        Toaster.success({
          title: 'Done!',
          message: 'Task title copied',
        })
      }
      data-test="copy-button"
      {...other}
    >
      <IconButton icon="copy" onClick={event => shouldStopPropagation && event.stopPropagation()} />
    </CopyToClipboard>
  );
};

TaskCopyButton.defaultProps = {
  shouldStopPropagation: true,
};

TaskCopyButton.propTypes = {
  taskTitle: PropTypes.string.isRequired,
  shouldStopPropagation: PropTypes.bool,
};

export default TaskCopyButton;
