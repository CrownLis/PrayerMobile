import React, {FC, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {getIcon} from '../../utils/getIcon';
import {mergeStyles} from '../../utils/mergeStyles';
import styles from './IconButton.module.scss';

type ButtonProps = {
  type: 'add' | 'send' | 'pray' | 'back' | 'exit' | 'cancel';
  isLoading?: boolean;
  isDisabled?: boolean;
};

const IconButton: FC<ButtonProps> = ({type, isLoading, isDisabled}) => {
  const [pressIn, setPressIn] = useState(false);

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
      style={mergeStyles(
        {
          style: styles[`button_wrapper_${type}`],
          active: true,
        },
        {style: styles[`button_wrapper_${type}_disabled`], active: isDisabled},
        {style: styles[`button_wrapper_${type}_pressed`], active: pressIn},
      )}>
      {isLoading ? <Text>'loading '</Text> : getIcon(type, isDisabled)}
    </TouchableOpacity>
  );
};

export default IconButton;
