import React, {ButtonHTMLAttributes, FC, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {getIcon} from '../../utils/getIcon';
import {mergeStyles} from '../../utils/mergeStyles';
import styles from './IconButton.module.scss';

type ButtonProps = {
  variant: 'add' | 'send' | 'pray' | 'back' | 'exit' | 'cancel';
  isLoading?: boolean;
  isDisabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: FC<ButtonProps> = ({variant, isLoading, isDisabled}) => {
  const [pressIn, setPressIn] = useState(false);

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
      style={mergeStyles(
        {
          style: styles[`button_wrapper_${variant}`],
          active: true,
        },
        {style: styles[`button_wrapper_${variant}_disabled`], active: isDisabled},
        {style: styles[`button_wrapper_${variant}_pressed`], active: pressIn},
      )}>
      {isLoading ? <Text>'loading '</Text> : getIcon(variant, isDisabled)}
    </TouchableOpacity>
  );
};

export default IconButton;
