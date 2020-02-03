import { connect } from 'react-redux';
import ActionsTop from './ActionsTop';
import { selectedDayIdSelector } from '../../../selectors/days/daysSelectors';

const mapStateToProps = state => ({
  selectedDayId: selectedDayIdSelector(state),
});

export default connect(mapStateToProps)(ActionsTop);
