import { connect } from 'react-redux';
import NotesEditor from './NotesEditor';
import { selectedTaskSelector } from '../../../../selectors/tasks/tasksSelectors';
import { selectedDaySelector } from '../../../../selectors/days/daysSelectors';
import { updateTask } from '../../../../actions/tasks';

const mapStateToProps = state => ({
  selectedTask: selectedTaskSelector(state),
  selectedDay: selectedDaySelector(state),
});

export default connect(mapStateToProps, { updateTask })(NotesEditor);
