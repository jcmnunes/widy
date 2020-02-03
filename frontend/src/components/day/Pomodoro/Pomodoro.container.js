import { connect } from 'react-redux';
import Pomodoro from './Pomodoro';

const mapStateToProps = state => ({
  taskId: state.tasks.selected,
  sectionId: state.sections.selected,
  isTaskActive: state.tasks.selected === state.activeTask.taskId,
  activeTask: state.activeTask,
  selectedTask: state.tasks.selected ? state.tasks.byId[state.tasks.selected] : {},
});

export default connect(mapStateToProps)(Pomodoro);
