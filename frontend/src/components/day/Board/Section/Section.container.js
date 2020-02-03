import { connect } from 'react-redux';
import Section from './Section';
import { openCreateTaskModal } from './Section.actions';
import { noTasksSelector } from '../../../../selectors/tasks/tasksSelectors';

const mapStateToProps = (state, props) => ({
  section: state.sections.byId[props.sectionId],
  noTasks: noTasksSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openCreateTaskModal: openCreateTaskModal(dispatch, ownProps),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
