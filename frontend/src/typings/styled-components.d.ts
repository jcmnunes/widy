import { theme } from '@binarycapsule/ui-capsules';

type Theme = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
