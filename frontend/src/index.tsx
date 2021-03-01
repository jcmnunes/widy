import '@binarycapsule/ui-capsules/assets/global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { setAppElement, theme, ThemeProvider, ToastProvider } from '@binarycapsule/ui-capsules';
import App from './App';
import store, { runSaga } from './store/store';
import { INIT_REQUEST } from './features/auth/Init/Init.types';
import { queryClient } from './config/queryClient';

// Run axios config
import './config/axios';

runSaga();

store.dispatch({ type: INIT_REQUEST });

setAppElement('#root');

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <ToastProvider>
            <App />
          </ToastProvider>
        </Router>
      </ThemeProvider>
    </Provider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root'),
);
