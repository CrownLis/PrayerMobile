import React, { FC } from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';

import { colors } from '@/assets/styles/color';

import styles from './Loader.module.scss';

type LoaderProps = ActivityIndicatorProps;

const Loader: FC<LoaderProps> = ({ color = colors.color800, ...props }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} {...props} />
    </View>
  );
};

export default Loader;
