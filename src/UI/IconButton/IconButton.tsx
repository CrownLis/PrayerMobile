import React, { FC, useState } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { getIcon } from '../../utils/getIcon';
import { mergeStyles } from '../../utils/mergeStyles';
import styles from './IconButton.module.scss';

type ButtonProps = {
  variant: 'add' | 'send' | 'pray' | 'back' | 'exit' | 'cancel';
  isLoading?: boolean;
} & TouchableOpacityProps;

const IconButton: FC<ButtonProps> = ({ variant, isLoading, disabled }) => {
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
      {isLoading ? <Text>'loading '</Text> : getIcon(variant, disabled)}
    </TouchableOpacity>
  );
};

export default IconButton;
