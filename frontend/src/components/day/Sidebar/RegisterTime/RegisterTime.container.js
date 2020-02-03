import { connect } from 'react-redux';
import RegisterTime from './RegisterTime';
import { openModal } from '../../../../actions/modals';
import { canRegisterTimeSelector } from '../../../../selectors/tasks/tasksSelectors';

const mapStateToProps = state => ({
  canRegisterTime: canRegisterTimeSelector(state),
});

export default connect(mapStateToProps, { openModal })(RegisterTime);
