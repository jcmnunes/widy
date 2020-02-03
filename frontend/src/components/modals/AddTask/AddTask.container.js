import { connect } from 'react-redux';
import AddTask from './AddTask';
import * as types from '../types';
import { closeModal } from '../../../actions/modals';
import { startCreateTaskRequest } from '../../../actions/tasks';

const mapStateToProps = state => ({
  isOpen: state.modals.modal === types.ADD_TASK,
  isLoading: state.tasks.createTask.loading,
});

const mapDispatchToProps = {
  closeModal,
  startCreateTaskRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
