import React, { useState } from 'react';
import { Modal, StatusBar } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useTheme } from 'styled-components/native';
import { AppIcon } from '../icon';
import { AppIconName, AppIconSize } from '../icon/types';
import { ModalContainer, VideoContainer, CloseButton } from './styles';

interface VideoPlayerProps {
  videoKey: string;
  visible: boolean;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoKey,
  visible,
  onClose,
}) => {
  const theme = useTheme();
  const [playing, setPlaying] = useState(false);

  const handleClose = () => {
    setPlaying(false);
    onClose();
  };

  const onReady = () => {
    setPlaying(true);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <StatusBar hidden />
      <ModalContainer>
        <CloseButton onPress={handleClose}>
          <AppIcon
            name={AppIconName.cross}
            iconSize={AppIconSize.primary}
            color={theme.colors.white}
          />
        </CloseButton>

        <VideoContainer>
          <YoutubeIframe
            videoId={videoKey}
            height={300}
            play={playing}
            onReady={onReady}
            initialPlayerParams={{
              controls: true,
              modestbranding: true,
            }}
          />
        </VideoContainer>
      </ModalContainer>
    </Modal>
  );
};
