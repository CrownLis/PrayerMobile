import React, { FC, PropsWithChildren, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { mergeStyles } from '../../utils/mergeStyles';
import styles from './IconButton.module.scss';

type ButtonProps = PropsWithChildren<{
  variant: 'circle' | 'square' | 'smallCircle1' | 'smallCircle2' | 'smallCircle3';
  isLoading?: boolean;
}> &
  TouchableOpacityProps;

const IconButton: FC<ButtonProps> = ({ variant, isLoading, disabled, children }) => {
  const [pressIn, setPressIn] = useState(false);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
      style={mergeStyles(
        {
          style: styles[`button_wrapper_${variant}`],
          active: true,
        },
        { style: styles[`button_wrapper_${variant}_disabled`], active: disabled ?? true },
        { style: styles[`button_wrapper_${variant}_pressed`], active: pressIn },
      )}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </TouchableOpacity>
  );
};

export default IconButton;
