/* eslint-disable */
import '@binarycapsule/ui-capsules/assets/global.css';
import './custom.css';
import 'focus-visible/dist/focus-visible';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@binarycapsule/ui-capsules';

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <div className="widy-styleguide">{children}</div>
  </ThemeProvider>
);
