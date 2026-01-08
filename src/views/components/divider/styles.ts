import styled from 'styled-components/native';
import { Layout } from '../../../theme';

export const DividerContainer = styled.View`
  height: ${Layout.heightPercentageToDP(0.1)}px;
  width: 100%;
  background-color: ${props => props.theme.colors.borders.DEFAULT};
`;
