import '@binarycapsule/ui-capsules/assets/global.css';
import 'focus-visible/dist/focus-visible';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import { WithToasts, setAppElement, theme } from '@binarycapsule/ui-capsules';
import App from './App';
import store, { runSaga } from './store';
import history from './router/history';
import { INIT_REQUEST } from './components/auth/Init/Init.types';

// Run axios config
import './api/axios';

runSaga();

store.dispatch({ type: INIT_REQUEST });

setAppElement('#root');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <WithToasts>
          <App />
        </WithToasts>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
