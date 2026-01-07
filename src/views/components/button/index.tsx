import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Props } from './types';
import { StyledButton, ButtonLabel } from './styles';

export const Button = (props: Props) => {
  const {
    onPress,
    buttonLable,
    buttonContainer,
    btnLabelStyles,
    loading,
    disabled,
    disableBgColor,
    leftIcon,
    loaderColor,
    rightIcon,
  } = props;

  const renderButtonContent = () => {
    if (loading) {
      return <ActivityIndicator color={loaderColor} />;
    }

    return (
      <>
        {leftIcon ? leftIcon : null}
        <ButtonLabel style={btnLabelStyles}>{buttonLable}</ButtonLabel>
        {rightIcon ? rightIcon : null}
      </>
    );
  };

  return (
    <StyledButton
      onPress={async () => {
        onPress();
      }}
      style={buttonContainer}
      disabled={disabled || loading}
      disableBgColor={disableBgColor}
    >
      {renderButtonContent()}
    </StyledButton>
  );
};
