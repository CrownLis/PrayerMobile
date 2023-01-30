import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';

type ColumnProps = NativeStackScreenProps<UserStackParamList, 'Column'>;

const Column = (props: ColumnProps) => {
  console.log(props.route.params.id);
  return (
    <View>
      <Text>Column</Text>
    </View>
  );
};

export default Column;
