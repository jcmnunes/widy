import { connect } from 'react-redux';
import RenameTask from './RenameTask';
import * as types from '../types';
import { closeModal } from '../../../actions/modals';
import { updateTask } from '../../../actions/tasks';
import { selectedTaskTitleSelector } from '../../../selectors/tasks/tasksSelectors';

const mapStateToProps = state => ({
  isOpen: state.modals.modal === types.RENAME_TASK,
  selectedTaskId: state.tasks.selected,
  selectedTaskTitle: selectedTaskTitleSelector(state),
});

const mapDispatchToProps = {
  closeModal,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameTask);
