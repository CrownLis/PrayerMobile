import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';
import { useNavigation } from '@react-navigation/native';

type FollowedScreenProps = NativeStackScreenProps<UserStackParamList, 'Root'>;

const Followed = () => {
  const navigation = useNavigation<FollowedScreenProps['navigation']>();
  return (
    <SafeAreaView>
      <ScrollView />
    </SafeAreaView>
  );
};

export default Followed;
