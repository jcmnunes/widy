import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Splash, theme } from '@binarycapsule/ui-capsules';
import NoInternet from './components/NoInternet/NoInternet';
import Routes from './router/routes';
import { version } from '../package.json';
import { IconWidyText } from './icons/widy';

class App extends Component {
  /**
   * Removes the static loading indicator (see public/index.html)
   */
  componentDidMount() {
    const item = document.getElementById('initial-loading');
    if (item) {
      item.parentNode.removeChild(item);
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <div data-version={version}>
        {loading ? (
          <Splash variant="splash">
            <IconWidyText size={125} textColor={theme.colors.blue['600']} />
          </Splash>
        ) : (
          <Routes />
        )}
        <NoInternet />
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  loading: state.auth.init.loading,
});

export default withRouter(connect(mapStateToProps)(App));
