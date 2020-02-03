import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// TODO ➜ Fix the linter error below
// eslint-disable-next-line react/prop-types
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!authenticated) return <Component {...props} />;
      return <Redirect to="/" />;
    }}
  />
);

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
