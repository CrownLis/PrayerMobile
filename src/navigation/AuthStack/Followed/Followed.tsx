import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';

type FollowedProps = NativeStackScreenProps<UserStackParamList, 'Root'>;

const Followed = (props: FollowedProps) => {
  return (
    <SafeAreaView>
      <ScrollView />
    </SafeAreaView>
  );
};

export default Followed;
