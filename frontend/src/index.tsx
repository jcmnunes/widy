import '@binarycapsule/ui-capsules/assets/global.css';
import 'focus-visible/dist/focus-visible';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ThemeProvider } from 'styled-components/macro';
import { WithToasts, setAppElement, theme } from '@binarycapsule/ui-capsules';
import App from './App';
import store, { runSaga } from './store/store';
import history from './router/history';
import { INIT_REQUEST } from './features/auth/Init/Init.types';
import { queryConfig } from './config/queryConfig';

// Run axios config
import './config/axios';

runSaga();

store.dispatch({ type: INIT_REQUEST });

setAppElement('#root');

ReactDOM.render(
  <>
    <ReactQueryConfigProvider config={queryConfig}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <WithToasts>
              <App />
            </WithToasts>
          </Router>
        </ThemeProvider>
      </Provider>
    </ReactQueryConfigProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </>,
  document.getElementById('root'),
);
