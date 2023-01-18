import React, {FC, PropsWithChildren, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './StyledButton.module.scss';

type ButtonProps = PropsWithChildren<{
  type: 'primary' | 'secondary' | 'text';
  isLoading?: boolean;
  isDisabled?: boolean;
  isExit?: boolean;
}>;

type MergeStylesArg = {
  style: Record<string, any>;
  active: boolean;
}[];

const StyledButton: FC<ButtonProps> = ({
  children,
  type,
  isLoading,
  isDisabled,
  isExit,
}) => {
  const [pressIn, setPressIn] = useState(false);

  const mergeStyles = (...style: MergeStylesArg) => {
    return style.reduce((acc, styleItem) => {
      if (!styleItem.active) {
        return acc;
      }
      return {
        ...acc,
        ...styleItem.style,
      };
    }, {} as Record<string, any>);
  };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
      style={mergeStyles(
        {style: styles.button_wrapper, active: true},
        {style: styles[`button_wrapper_${type}`], active: true},
        {
          style: styles[`button_wrapper_${type}_disabled`],
          active: isDisabled ? true : false,
        },
        {style: styles.button_wrapper_press, active: pressIn},
      )}>
      <Text
        style={mergeStyles(
          {style: styles.button_text, active: true},
          {style: styles[`button_text_${type}`], active: true},
          {style: styles.button_text_exit, active: isExit},
          {style: styles[`button_text_${type}_disabled`], active: isDisabled},
          {style: styles[`button_text_${type}_press`], active: pressIn},
          )}>
        {isLoading ? 'Loading' : children}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
