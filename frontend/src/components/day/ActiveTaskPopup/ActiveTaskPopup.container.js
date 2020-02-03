import { connect } from 'react-redux';
import ActiveTaskPopup from './ActiveTaskPopup';
import { getDay, storeSelectedDay } from '../../../actions/days';
import { stopTask, updateTask } from '../../../actions/tasks';
import { activeTaskSelector, selectedDayIdSelector } from './ActiveTaskPopup.selectors';

const mapStateToProps = state => ({
  activeTask: activeTaskSelector(state),
  selectedDayId: selectedDayIdSelector(state),
});

const mapDispatchToProps = {
  storeSelectedDay,
  getDay,
  stopTask,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTaskPopup);
