import { connect } from 'react-redux';
import Login from './Login.component';
import { loginRequest, resetLoginError } from './Login.actions';
import { loadingSelector, loginErrorSelector } from './Login.selectors';

export const mapStateToProps = state => ({
  loading: loadingSelector(state),
  loginError: loginErrorSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loginRequest: params => dispatch(loginRequest(params)),
  resetLoginError: () => dispatch(resetLoginError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
