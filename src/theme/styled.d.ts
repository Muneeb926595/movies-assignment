import 'styled-components/native';
import { Theme } from './styled-theme-config';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
