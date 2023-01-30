import React, { FC, PropsWithChildren } from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { mergeStyles } from '@/utils/mergeStyles';
import useButtonHandlers from '@/hooks/useButtonHandlers';

import styles from './IconButton.module.scss';

type ButtonProps = PropsWithChildren<{
  size: 'big' | 'middle' | 'small';
  variant: 'dark' | 'light' | 'lightest';
  isLoading?: boolean;
}> &
  TouchableOpacityProps;

const IconButton: FC<ButtonProps> = ({
  variant,
  size,
  isLoading,
  disabled,
  children,
  onPress,
  onPressIn,
  onPressOut,
  style,
  ...props
}) => {
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
      style={[
        mergeStyles(
          {
            style: styles.button,
            active: true,
          },
          {
            style: styles[`button_${size}`],
            active: true,
          },
          {
            style: styles[`button_${variant}`],
            active: true,
          },
          { style: styles[`button_${variant}_disabled`], active: !!disabled },
          { style: styles[`button_${variant}_pressed`], active: isPressed },
        ),
        style,
      ]}
      {...props}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </TouchableOpacity>
  );
};

export default IconButton;
