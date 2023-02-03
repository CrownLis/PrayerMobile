import { colors } from '@/assets/styles/color';
import { EmptyColumn, Arrow } from '@/assets/svgs';
import React, { FC } from 'react';
import { View, Text } from 'react-native';

import styles from './EmptyList.module.scss';

type EmptyListProps = {
  text: string;
  isUser?: boolean;
};

const EmptyList: FC<EmptyListProps> = ({ text, isUser }) => {
  return (
    <View style={styles.emptyColumn}>
      <EmptyColumn />
      <Text>{text}</Text>
      {isUser ? <Arrow fill={colors.color800} style={styles.arrow} /> : null}
    </View>
  );
};

export default EmptyList;
