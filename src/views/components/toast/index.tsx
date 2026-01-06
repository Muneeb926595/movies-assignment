import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  ToastContainer,
  ToastMessage,
  ActionButton,
  ActionLabel,
} from './styles';

export interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onHide?: () => void;
  actionLabel?: string;
  onActionPress?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  duration = 5000,
  onHide,
  actionLabel,
  onActionPress,
}) => {
  const translateY = useRef(new Animated.Value(100)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();

      // Auto hide after duration
      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          hideToast();
        }, duration);
      }
    } else {
      hideToast();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible]);

  const hideToast = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onHide?.();
    });
  };

  const handleActionPress = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onActionPress?.();
    hideToast();
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
      }}
    >
      <ToastContainer>
        <ToastMessage>{message}</ToastMessage>
        {actionLabel && onActionPress && (
          <ActionButton onPress={handleActionPress}>
            <ActionLabel>{actionLabel}</ActionLabel>
          </ActionButton>
        )}
      </ToastContainer>
    </Animated.View>
  );
};
