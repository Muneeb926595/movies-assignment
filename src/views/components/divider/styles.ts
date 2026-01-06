import styled from 'styled-components/native';
import { hp } from '../../../theme/styled-utils';

export const DividerContainer = styled.View`
  height: ${hp(0.1)}px;
  width: 100%;
  background-color: ${props => props.theme.colors.borders.DEFAULT};
`;
