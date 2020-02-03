import { connect } from 'react-redux';
import Day from './Day.component';
import { updateActiveTask } from '../../../actions/activeTask';

const mapStateToProps = state => ({
  activeTaskId: state.activeTask.taskId,
  activeTaskTitle: state.activeTask.title,
  activeTaskTime: state.activeTask.time,
  activeTaskStart: state.activeTask.start,
});

export default connect(mapStateToProps, { updateActiveTask })(Day);
