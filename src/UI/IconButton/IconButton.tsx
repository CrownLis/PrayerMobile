import React, { FC, PropsWithChildren } from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { mergeStyles } from '@/utils/mergeStyles';
import useButtonHandlers from '@/hooks/useButtonHandlers';

import styles from './IconButton.module.scss';

type ButtonProps = PropsWithChildren<{
  variant: 'circle' | 'square' | 'smallCircle1' | 'smallCircle2' | 'smallCircle3';
  isLoading?: boolean;
}> &
  TouchableOpacityProps;

const IconButton: FC<ButtonProps> = ({ variant, isLoading, disabled, children, onPress, onPressIn, onPressOut }) => {
  const { isPressed, pressHandler, pressInHandler, pressOutHandler } = useButtonHandlers(
    onPressIn,
    onPressOut,
    onPress,
    isLoading,
  );
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={pressHandler}
      onPressIn={pressInHandler}
      onPressOut={pressOutHandler}
      style={mergeStyles(
        {
          style: styles[`button_wrapper_${variant}`],
          active: true,
        },
        { style: styles[`button_wrapper_${variant}_disabled`], active: disabled ?? true },
        { style: styles[`button_wrapper_${variant}_pressed`], active: isPressed },
      )}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </TouchableOpacity>
  );
};

export default IconButton;
