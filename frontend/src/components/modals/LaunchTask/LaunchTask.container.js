import { connect } from 'react-redux';
import { launchTask } from '../../../actions/tasks';
import LaunchTask from './LaunchTask';
import { appendTask, removeTask } from '../../../actions/sections';
import { closeModal } from '../../../actions/modals';
import {
  normalSectionsRadiosSelector,
  selectedTaskIndexSelector,
} from '../../../selectors/sections/sectionsSelectors';
import * as types from '../types';

const mapStateToProps = state => ({
  isOpen: state.modals.modal === types.LAUNCH_TASK,
  sectionsRadios: normalSectionsRadiosSelector(state),
  selectedTaskId: state.tasks.selected,
  taskTitle: state.tasks.byId[state.tasks.selected]
    ? state.tasks.byId[state.tasks.selected].title
    : '',
  planSectionId: state.sections.order[0],
  selectedTaskIndex: selectedTaskIndexSelector(state),
});

export default connect(mapStateToProps, { removeTask, appendTask, closeModal, launchTask })(
  LaunchTask,
);
