import { connect } from 'react-redux';
import Reset from './Reset.component';
import { resetRequest, resetResetError } from './Reset.actions';

export const mapStateToProps = state => ({
  loading: state.auth.reset.loading,
  error: state.auth.reset.error,
});

const mapDispatchToProps = {
  resetRequest,
  resetResetError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
