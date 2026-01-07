import styled from 'styled-components/native';
import { Layout } from '../../../globals';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.95);
  justify-content: center;
  align-items: center;
`;

export const VideoContainer = styled.View`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.black};
  position: relative;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xl}px;
  right: ${({ theme }) => theme.spacing.lg}px;
  z-index: 10;
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

export const ControlsContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.lg}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PlayPauseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50px;
`;

export const PlayPauseText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${Layout.RFValue(32)}px;
  line-height: 32px;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${Layout.RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
`;
