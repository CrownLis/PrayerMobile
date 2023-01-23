import React, { FC, PropsWithChildren, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { mergeStyles } from '../../utils/mergeStyles';
import styles from './Button.module.scss';

type ButtonProps = PropsWithChildren<
  {
    variant: 'primary' | 'secondary' | 'text';
    isLoading?: boolean;
    isExit?: boolean;
    onPress: () => {};
  } & TouchableOpacityProps
>;

const Button: FC<ButtonProps> = ({
  children,
  variant,
  isLoading,
  disabled,
  isExit,
  onPress,
}) => {
  const [pressIn, setPressIn] = useState(false);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
      style={mergeStyles(
        { style: styles.button_wrapper, active: true },
        { style: styles[`button_wrapper_${variant}`], active: true },
        {
          style: styles[`button_wrapper_${variant}_disabled`],
          active: disabled ? true : false,
        },
        { style: styles[`button_wrapper_${variant}_press`], active: pressIn },
      )}
    >
      <Text
        style={mergeStyles(
          { style: styles.button_text, active: true },
          { style: styles[`button_text_${variant}`], active: true },
          { style: styles.button_text_exit, active: !!isExit },
          { style: styles[`button_text_${variant}_disabled`], active: !!disabled },
          { style: styles[`button_text_${variant}_press`], active: pressIn },
        )}
      >
        {isLoading ? <ActivityIndicator /> : children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
