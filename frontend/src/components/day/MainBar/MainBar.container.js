import { connect } from 'react-redux';
import MainBar from './MainBar';

const mapStateToProps = state => ({
  activeTask: state.activeTask,
});

export default connect(mapStateToProps)(MainBar);
