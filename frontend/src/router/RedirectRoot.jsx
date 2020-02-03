import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class RedirectRoot extends Component {
  componentDidMount() {
    this.props.history.push('/');
  }

  render() {
    return <div>Loading...</div>;
  }
}

RedirectRoot.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(RedirectRoot);
