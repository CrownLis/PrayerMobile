import React from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';

import styles from './Column.module.scss';
import { AuthRoutes } from '@/navigation/routes';

type ColumnScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Column>;

const Column = () => {
  const { params } = useRoute<ColumnScreenProps['route']>();
  return <SafeAreaView style={styles.container} />;
};

export default Column;
