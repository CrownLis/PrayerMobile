import React, { FC, PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { mergeStyles } from '@/utils/mergeStyles';
import { useButtonHandlers } from '@/hooks/useButtonHandlers';
import { colors } from '@/assets/styles/color';
import Loader from '../Loader';

import styles from './IconButton.module.scss';

type IconButtonProps = PropsWithChildren<{
  size: 'big' | 'middle' | 'small';
  variant: 'dark' | 'light' | 'lightest';
  isSquare?: boolean;
  isLoading?: boolean;
}> &
  TouchableOpacityProps;

const loaderColorsMap: Record<IconButtonProps['variant'], string> = {
  dark: colors.color100,
  light: colors.color800,
  lightest: colors.color800,
};

const IconButton: FC<IconButtonProps> = ({
  variant,
  size,
  isSquare,
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
          { style: styles.square, active: !!isSquare },
          { style: styles[`button_${variant}_disabled`], active: !!disabled },
          { style: styles[`button_${variant}_pressed`], active: isPressed },
        ),
        style,
      ]}
      {...props}
    >
      {isLoading ? <Loader color={loaderColorsMap[variant]} /> : children}
    </TouchableOpacity>
  );
};

export default IconButton;
