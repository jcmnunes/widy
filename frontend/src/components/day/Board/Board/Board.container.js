import { connect } from 'react-redux';
import Board from './Board';
import { onDragEnd } from './Board.actions';

const mapStateToProps = state => ({
  sectionsOrder: state.sections.order,
  day: state.sections.day,
  sectionsLoading: state.sections.loading,
  sectionsById: state.sections.byId,
  dayId: state.days.selected,
  daysLoading: state.days.loading,
  activeTaskId: state.activeTask.taskId,
  daysOrder: state.days.order,
});

const mapDispatchToProps = {
  onDragEnd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
