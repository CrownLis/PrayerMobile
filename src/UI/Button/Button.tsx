import React, { FC, PropsWithChildren } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import useButtonHandlers from '@/hooks/useButtonHandlers';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './Button.module.scss';

type ButtonProps = PropsWithChildren<
  {
    variant: 'primary' | 'secondary' | 'text';
    isLoading?: boolean;
  } & TouchableOpacityProps
>;

const Button: FC<ButtonProps> = ({
  children,
  variant,
  disabled,
  isLoading,
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
          { style: styles.button_wrapper, active: true },
          { style: styles[`button_wrapper_${variant}`], active: true },
          {
            style: styles[`button_wrapper_${variant}_disabled`],
            active: disabled ? true : false,
          },
          { style: styles[`button_wrapper_${variant}_press`], active: isPressed },
        ),
        style,
      ]}
      {...props}
    >
      <Text
        style={mergeStyles(
          { style: styles.button_text, active: true },
          { style: styles[`button_text_${variant}`], active: true },
          { style: styles[`button_text_${variant}_disabled`], active: !!disabled },
          { style: styles[`button_text_${variant}_press`], active: isPressed },
        )}
      >
        {isLoading ? <ActivityIndicator /> : children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
