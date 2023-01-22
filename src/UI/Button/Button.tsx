import React, { ButtonHTMLAttributes, FC, PropsWithChildren, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { mergeStyles } from '../../utils/mergeStyles';
import styles from './Button.module.scss';

type ButtonProps = PropsWithChildren<
  {
    variant: 'primary' | 'secondary' | 'text';
    isLoading?: boolean;
    isDisabled?: boolean;
    isExit?: boolean;
    onPress: () => {};
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;

const Button: FC<ButtonProps> = ({
  children,
  variant,
  isLoading,
  isDisabled,
  isExit,
  onPress,
}) => {
  const [pressIn, setPressIn] = useState(false);

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
      style={mergeStyles(
        { style: styles.button_wrapper, active: true },
        { style: styles[`button_wrapper_${variant}`], active: true },
        {
          style: styles[`button_wrapper_${variant}_disabled`],
          active: isDisabled ? true : false,
        },
        { style: styles[`button_wrapper_${variant}_press`], active: pressIn },
      )}
    >
      <Text
        style={mergeStyles(
          { style: styles.button_text, active: true },
          { style: styles[`button_text_${variant}`], active: true },
          { style: styles.button_text_exit, active: !!isExit },
          { style: styles[`button_text_${variant}_disabled`], active: !!isDisabled },
          { style: styles[`button_text_${variant}_press`], active: pressIn },
        )}
      >
        {isLoading ? <Text>loading</Text> : children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
