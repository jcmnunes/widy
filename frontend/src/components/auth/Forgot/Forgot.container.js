import { connect } from 'react-redux';
import Forgot from './Forgot.component';
import { loadingSelector, messageSelector } from './Forgot.selectors';
import { forgotRequest, resetForgotMessage } from './Forgot.actions';

export const mapStateToProps = state => ({
  loading: loadingSelector(state),
  message: messageSelector(state),
});

const mapDispatchToProps = {
  forgotRequest,
  resetForgotMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
