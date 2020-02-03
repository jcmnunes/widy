import { connect } from 'react-redux';
import Timer from './Timer';
import { startTask, stopTask } from '../../../actions/tasks';

const mapStateToProps = (state, ownProps) => ({
  activeTask: state.activeTask,
  taskTitle: state.tasks.byId[ownProps.taskId].title,
  taskTime: state.tasks.byId[ownProps.taskId].time,
});

export default connect(mapStateToProps, { startTask, stopTask })(Timer);
