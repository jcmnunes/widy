import { connect } from 'react-redux';
import TaskMenuComponent from './TaskMenu.component';
import {
  canRegisterTimeSelector,
  canScheduleTaskSelector,
} from '../../../../selectors/tasks/tasksSelectors';
import { handleRegisterTimeClick, handleTaskRename } from './TaskMenu.actions';

const mapStateToProps = state => ({
  canRegisterTime: canRegisterTimeSelector(state),
  canScheduleTask: canScheduleTaskSelector(state),
});

const mapDispatchToProps = dispatch => ({
  handleTaskRename: handleTaskRename(dispatch),
  handleRegisterTimeClick: handleRegisterTimeClick(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskMenuComponent);
