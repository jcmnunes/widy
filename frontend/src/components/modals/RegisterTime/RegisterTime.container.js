import { connect } from 'react-redux';
import RegisterTime from './RegisterTime';
import { closeModal } from '../../../actions/modals';
import { updateTask } from '../../../actions/tasks';
import * as types from '../types';

const mapStateToProps = state => ({
  isOpen: state.modals.modal === types.REGISTER_TIME,
  selectedTaskId: state.tasks.selected,
});

export default connect(mapStateToProps, { closeModal, updateTask })(RegisterTime);
