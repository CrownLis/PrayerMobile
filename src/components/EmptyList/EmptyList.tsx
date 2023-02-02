import { colors } from '@/assets/styles/color';
import { EmptyColumn, Arrow } from '@/assets/svgs';
import React, { FC } from 'react';
import { View, Text } from 'react-native';

import styles from './EmptyList.module.scss';

const EmptyList: FC = () => {
  return (
    <View style={styles.emptyColumn}>
      <EmptyColumn />
      <Text>You haven't created any column.</Text>
      <Arrow fill={colors.color800} style={styles.arrow} />
    </View>
  );
};

export default EmptyList;
