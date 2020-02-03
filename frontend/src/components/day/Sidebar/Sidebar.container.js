import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import { isSelectedTaskInPlanSelector } from '../../../selectors/tasks/tasksSelectors';
import { openModal } from '../../../actions/modals';

const mapStateToProps = state => ({
  selectedTaskId: state.tasks.selected,
  isSelectedTaskInPlan: isSelectedTaskInPlanSelector(state),
});

export default connect(mapStateToProps, { openModal })(Sidebar);
