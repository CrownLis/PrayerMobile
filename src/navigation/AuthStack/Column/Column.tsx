import React from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';

import styles from './Column.module.scss';

type ColumnScreenProps = NativeStackScreenProps<UserStackParamList, 'Column'>;

const Column = () => {
  const { params } = useRoute<ColumnScreenProps['route']>();
  return <SafeAreaView style={styles.container} />;
};

export default Column;
