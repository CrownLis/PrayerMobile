import React, { FC } from 'react';
import { View } from 'react-native';

import { colors } from '@/assets/styles/color';
import { Trash } from '@/assets/svgs';

import styles from './DeleteButton.module.scss';

const DeleteButton: FC = () => {
  return (
    <View style={styles.button_wrapper}>
      <Trash fill={colors.$color100} />
    </View>
  );
};

export default DeleteButton;
